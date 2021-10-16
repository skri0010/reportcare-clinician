import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import {
  getPatientInfo,
  updatePatientInfo,
  createMedicationInfo,
  updateMedicationInfo,
  getMedicationInfo
} from "aws";
import {
  PatientInfo,
  UpdatePatientInfoInput,
  CreateMedicationInfoInput,
  MedicationInfo,
  UpdateMedicationInfoInput
} from "aws/API";
import { LocalStorage } from "rc_agents/storage";
import {
  setConfigurationSuccessful,
  setConfiguringPatient
} from "ic-redux/actions/agents/configurationActionCreator";
import { store } from "util/useRedux";
import { agentNWA } from "rc_agents/agents";
import { MedInput } from "rc_agents/model";
import { setPatients } from "ic-redux/actions/agents/patientActionCreator";

/**
 * Represents the activity for storing patient record baseline data.
 * This happens in Procedure App-Medical Records Device Configuration (MRDC) - P-RB.
 * Happens when patient is configured for the first time or when details are updated in U-CPRB subprocedure.
 */
class StoreBaseline extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.STORE_BASELINE);
  }

  /**
   * Perform the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    try {
      // Get patient baseline data from facts
      const baseline: PatientInfo =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.PATIENT_TO_CONFIGURE
        ];

      // Get medication configuration from facts
      // If the clinician did not add any medication info, medConfiguration would just be an empty list
      const medConfiguration: MedInput[] =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.MEDICATION_TO_CONFIGURE
        ];

      // Get online status from facts
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (baseline && medConfiguration) {
        let configurationSuccessful = false; // Indicator of patient configuration is successful
        let medConfigurationSuccessful = false; // Indicator of medication configuration is successful
        const medInfosCreated: MedicationInfo[] = []; // Stores all med infos using API call
        // Device is online
        if (isOnline) {
          // Updates patient info using configuration
          configurationSuccessful = await updatePatientBaseline(baseline);

          // Creates med info for each of the med config
          const allMedInfoCreation = await Promise.all(
            medConfiguration.map(async (medInfo) => {
              const createMedInfoResponse =
                createMedicationConfiguration(medInfo);
              if (createMedInfoResponse) {
                return createMedInfoResponse;
              }
            })
          );

          // Check for each of the med info response returned after calling createMedicationConfiguration
          // Only insert med info that is not null or undefined
          if (allMedInfoCreation) {
            allMedInfoCreation.forEach((medInfo) => {
              if (medInfo) {
                medInfosCreated.push(medInfo);
              }
            });
          }

          // All the med configs have been added into the DB successfully
          if (medInfosCreated.length === medConfiguration.length) {
            medConfigurationSuccessful = true;
            // Stores the med info into patient details
            const localMedInputs: MedInput[] = [];
            medInfosCreated.forEach((medication: MedicationInfo) => {
              if (medication) {
                const localMed: MedInput = {
                  id: medication.id,
                  name: medication.name,
                  dosage: `${medication.dosage}`,
                  frequency: `${medication.frequency}`,
                  patientID: medication.patientID,
                  records: medication.records
                };
                localMedInputs.push(localMed);
              }
            });
            await LocalStorage.setPatientMedInfo(
              localMedInputs,
              baseline.patientID
            );
          }
        }
        // Device is offline: store patient baseline locally and update local patient details
        else if (!isOnline) {
          // Update local patient details
          await LocalStorage.setPatient(baseline);

          //  Update local medication info for the patient
          await LocalStorage.setPatientMedInfo(
            medConfiguration,
            baseline.patientID
          );

          // Store patient configuration to be synced later on
          await LocalStorage.setPatientBaselines([baseline]);

          // Stores med configs to be synced later on
          await LocalStorage.setPatientMedicationConfigurations(
            medConfiguration
          );

          configurationSuccessful = true;
          medConfigurationSuccessful = true;

          // Notifies NWA of the baselines to sync
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.SYNC_PATIENT_BASELINES,
              true
            )
          );
        }

        if (configurationSuccessful && medConfigurationSuccessful) {
          // Update local storage and to reflect changes in frontend
          await updateLocalPatientList(baseline);

          // End the current procedure then trigger display of updated patient details
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PROCEDURE,
              ProcedureAttributes.MRDC,
              ProcedureConst.INACTIVE
            )
          );

          // Add baseline to facts to be used for retrieving details
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_TO_VIEW_DETAILS,
              baseline
            ),
            false
          );

          // Triggers the RetrievePatientDetails action frame
          agent.addBelief(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.RETRIEVE_PATIENT_DETAILS,
              true
            )
          );

          // Start the procedure
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PROCEDURE,
              ProcedureAttributes.HF_OTP_II,
              ProcedureConst.ACTIVE
            )
          );

          // Dispatch to front end that configuration is successful
          store.dispatch(setConfigurationSuccessful(true));
        }
      }
      // Dispatch to front end that configuration has been completed
      store.dispatch(setConfiguringPatient(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.MRDC,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
      // Dispatch to front end that configuration has been completed
      store.dispatch(setConfiguringPatient(false));
    }
  }
}

/**
 * Update local storage and redux's patients list to reflect newly configured patient in frontend
 * @param baseline patient baseline data
 */
export const updateLocalPatientList = async (
  baseline: PatientInfo
): Promise<void> => {
  // update current patient list where patient id is set to configured
  const patients = await LocalStorage.getPatients();
  if (patients) {
    patients.forEach((patient) => {
      patient.patientID === baseline.patientID
        ? (patient.configured = true)
        : null;
    });
    // Update LocalStorage
    await LocalStorage.setPatients([...patients]);
    // Update redux state
    store.dispatch(setPatients([...patients]));
  }
};

/**
 * Updates patient info using input baseline.
 * @param baseline patient baseline data
 * @returns true if patient info is successfully updated, false otherwise.
 */
export const updatePatientBaseline = async (
  baseline: PatientInfo
): Promise<boolean> => {
  // Indicator of whether patient info is successfully updated
  let updateSuccessful = false;

  // Extracts information to be updated
  const patientInfoToUpdate = {
    deviceNo: baseline.deviceNo,
    diagnosisInfo: baseline.diagnosisInfo,
    hospitalName: baseline.hospitalName,
    NHYAclass: baseline.NHYAclass,
    targetActivity: baseline.targetActivity,
    targetWeight: baseline.targetWeight,
    fluidIntakeGoal: baseline.fluidIntakeGoal,
    configured: baseline.configured
  };

  // Indicator of whether to update baseline
  let updateBaseline = true;

  // Gets latest patient info
  const patientInfoQuery = await getPatientInfo({
    patientID: baseline.patientID
  });

  if (patientInfoQuery.data.getPatientInfo) {
    // Compares version of patient infos
    const latestPatientInfo = patientInfoQuery.data.getPatientInfo;
    // Latest patient info has higher version
    if (latestPatientInfo._version > baseline._version) {
      // Patient has been configured: replace baseline with retrieved patient
      if (latestPatientInfo.configured) {
        baseline = latestPatientInfo;
        updateBaseline = false;
      } else {
        // Patient hasn't been configured: update baseline's remaining information
        baseline = {
          ...latestPatientInfo,
          ...patientInfoToUpdate
        };
      }
    }
  }

  if (updateBaseline) {
    // Creates update input
    const updateInput: UpdatePatientInfoInput = {
      id: baseline.id,
      patientID: baseline.patientID,
      _version: baseline._version,
      ...patientInfoToUpdate
    };
    const updateResponse = await updatePatientInfo(updateInput);

    if (updateResponse.data.updatePatientInfo) {
      // Updates version of patient info
      baseline._version = updateResponse.data.updatePatientInfo._version;
      updateSuccessful = true;
    }
  }

  // Updates locally stored patient details
  await LocalStorage.setPatient(baseline);

  return updateSuccessful;
};

/**
 * Creates medication infos for the patient
 * @param medicationInfo single medication input entered by clinician
 * @returns medication info created after API call
 */
export const createMedicationConfiguration = async (
  medicationInfo: MedInput
): Promise<MedicationInfo | null> => {
  // Creates medication info to be inserted into DB\
  if (!medicationInfo.id) {
    const medInfoToInsert: CreateMedicationInfoInput = {
      name: medicationInfo.name,
      dosage: parseFloat(medicationInfo.dosage),
      frequency: parseFloat(medicationInfo.frequency),
      records: JSON.stringify({}),
      patientID: medicationInfo.patientID,
      active: true
    };

    // Make API call to create med info and insert into DB
    const createMedInfoResponse = await createMedicationInfo(medInfoToInsert);

    if (createMedInfoResponse.data.createMedicationInfo) {
      return createMedInfoResponse.data.createMedicationInfo;
    }
  } else {
    const medInfoResponse = await getMedicationInfo({ id: medicationInfo.id });

    const medInfo = medInfoResponse.data.getMedicationInfo;

    if (medInfo) {
      const medInfoToUpdate: UpdateMedicationInfoInput = {
        id: medicationInfo.id,
        dosage: parseFloat(medicationInfo.dosage),
        frequency: parseFloat(medicationInfo.frequency),
        name: medInfo.name,
        patientID: medInfo.patientID,
        active: true,
        _version: medInfo._version
      };

      const updateMedInfoResponse = await updateMedicationInfo(medInfoToUpdate);
      if (updateMedInfoResponse.data.updateMedicationInfo) {
        return updateMedInfoResponse.data.updateMedicationInfo;
      }
    }
  }
  return null;
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.MRDC,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.STORE_BASELINE,
  true
);

// Actionframe
export const af_StoreBaseline = new Actionframe(
  `AF_${ActionFrameIDs.DTA.STORE_BASELINE}`,
  [rule1, rule2],
  new StoreBaseline()
);
