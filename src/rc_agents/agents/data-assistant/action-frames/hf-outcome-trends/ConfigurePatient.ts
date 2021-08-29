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
  setRetryLaterTimeout,
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { getPatientInfo, updatePatientInfo } from "aws";
import { PatientInfo, UpdatePatientInfoInput } from "aws/API";
import { Storage } from "rc_agents/storage";
import {
  setConfigurationSuccessful,
  setConfiguringPatient
} from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";
import { agentNWA } from "rc_agents/agents";

/**
 * Class to represent an activity for configuring a patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class ConfigurePatient extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.CONFIGURE_PATIENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    // Dispatch to store to indicate ongoing configuration
    store.dispatch(setConfiguringPatient(true));

    try {
      // Get patient configuration from facts
      const configuration: PatientInfo =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.PATIENT_TO_CONFIGURE
        ];
      // Get online status from facts
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (configuration) {
        // Indicator of whether configuration is successful
        let configurationSuccessful = false;

        // Device is online
        if (isOnline) {
          // Updates patient info using configuration
          configurationSuccessful = await updatePatientConfiguration(
            configuration
          );
        }
        // Device is offline: store patient configuration locally and update local patient details
        else if (!isOnline) {
          // Update local patient details
          await Storage.setPatient(configuration);

          // Store patient configuration to be synced later on
          await Storage.setPatientConfigurations([configuration]);
          configurationSuccessful = true;

          // Notifies NWA of the configuration to sync
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.SYNC_CONFIGURE_PATIENTS,
              true
            )
          );
        }

        if (configurationSuccessful) {
          // Add configuration to facts to be used for retrieving details
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_TO_VIEW_DETAILS,
              configuration
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

          // Dispatch to front end that configuration is successful
          store.dispatch(setConfigurationSuccessful(true));
        }
      }
      // Dispatch to front end that configuration has been completed
      store.dispatch(setConfiguringPatient(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Set to retry later
      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.CONFIGURE_PATIENT,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.HF_OTP_II,
            ProcedureConst.ACTIVE
          )
        );
      });

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_II,
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
 * Updates patient info using input configuration.
 * @param configuration patient configuration
 * @returns true if patient info is successfully updated, false otherwise.
 */
export const updatePatientConfiguration = async (
  configuration: PatientInfo
): Promise<boolean> => {
  // Indicator of whether patient info is successfully updated
  let updateSuccessful = false;

  // Extracts information to be updated
  const patientInfoToUpdate = {
    deviceNo: configuration.deviceNo,
    diagnosisInfo: configuration.diagnosisInfo,
    hospitalName: configuration.hospitalName,
    NHYAclass: configuration.NHYAclass,
    targetActivity: configuration.targetActivity,
    targetWeight: configuration.targetWeight,
    fluidIntakeGoal: configuration.fluidIntakeGoal,
    configured: configuration.configured
  };

  // Indicator of whether to update configuration
  let updateConfiguration = true;

  // Gets latest patient info
  const patientInfoQuery = await getPatientInfo({
    patientID: configuration.patientID
  });

  if (patientInfoQuery.data.getPatientInfo) {
    // Compares version of patient infos
    const latestPatientInfo = patientInfoQuery.data.getPatientInfo;
    // Latest patient info has higher version
    if (latestPatientInfo._version > configuration._version) {
      // Patient has been configured: replace configuration with retrieved patient
      if (latestPatientInfo.configured) {
        configuration = latestPatientInfo;
        updateConfiguration = false;
      } else {
        // Patient hasn't been configured: update configuration's remaining information
        configuration = {
          ...latestPatientInfo,
          ...patientInfoToUpdate
        };
      }
    }
  }

  if (updateConfiguration) {
    // Creates update input
    const updateInput: UpdatePatientInfoInput = {
      id: configuration.id,
      patientID: configuration.patientID,
      _version: configuration._version,
      ...patientInfoToUpdate
    };
    const updateResponse = await updatePatientInfo(updateInput);

    if (updateResponse.data.updatePatientInfo) {
      // Updates version of patient info
      configuration._version = updateResponse.data.updatePatientInfo._version;
      updateSuccessful = true;
    }
  }

  // Updates locally stored patient details
  await Storage.setPatient(configuration);

  return updateSuccessful;
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.CONFIGURE_PATIENT,
  true
);

// Actionframe
export const af_ConfigurePatient = new Actionframe(
  `AF_${ActionFrameIDs.DTA.CONFIGURE_PATIENT}`,
  [rule1, rule2],
  new ConfigurePatient()
);
