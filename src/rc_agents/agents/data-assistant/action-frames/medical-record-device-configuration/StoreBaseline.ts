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
import { getPatientInfo, updatePatientInfo } from "aws";
import { PatientInfo, UpdatePatientInfoInput } from "aws/API";
import { LocalStorage } from "rc_agents/storage";
import {
  setConfigurationSuccessful,
  setConfiguringPatient
} from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";
import { agentNWA } from "rc_agents/agents";

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
      // Get online status from facts
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (baseline) {
        // Indicator of whether configuration is successful
        let configurationSuccessful = false;

        // Device is online
        if (isOnline) {
          // Updates patient info using baseline
          configurationSuccessful = await updatePatientBaseline(baseline);
        }
        // Device is offline: store patient baseline locally and update local patient details
        else if (!isOnline) {
          // Update local patient details
          await LocalStorage.setPatient(baseline);

          // Store patient baseline to be synced later on
          await LocalStorage.setPatientBaselines([baseline]);
          configurationSuccessful = true;

          // Notifies NWA of the baselines to sync
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.SYNC_PATIENT_BASELINES,
              true
            )
          );
        }

        if (configurationSuccessful) {
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
