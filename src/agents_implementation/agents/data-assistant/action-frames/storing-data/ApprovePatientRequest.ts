import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ProcedureConst,
  AsyncStorageKeys,
  CommonAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "../../../../agent_framework/AgentEnums";
import agentAPI from "../../../../agent_framework/AgentAPI";
import {
  listPatientInfos,
  updatePatientInfo,
  createClinicianPatientMap
} from "aws";
import { store } from "ic-redux/store";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import agentNWA from "agents_implementation/agents/network-assistant/NWA";

/**
 * LS-TODO: To be updated
 * Currently unable to get PatientInfo of the new patient
 * Add front end trigger to start this activity
 */

/**
 * Class to represent an activity for updating patient's clinician.
 * This happens in Procedure Storing Data (SRD) when a clinician accepts a patient's request.
 */
class ApprovePatientRequest extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.APPROVE_PATIENT_REQUEST);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.CLINICIAN_UPDATED, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Gets patientId to be updated
      const patientId =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.UPDATE_CLINICIAN
        ];

      // Gets locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (patientId && clinicianId) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Inserts into ClinicianPatientMap
          await createClinicianPatientMap({
            clinicianID: clinicianId,
            patientID: patientId,
            owner: clinicianId
          });

          // Updates patient
          const query: any = await listPatientInfos({
            filter: { patientID: { eq: patientId } }
          });

          if (query.data) {
            const results = query.data.listPatientInfos?.items;
            if (results && results.length > 0) {
              const patient = results.pop();
              if (patient) {
                // Updates patient's cardiologist
                // LS-TODO: Whether to update cardiologist using ClinicianID or name
                // JH-TODO: Note, we must check the version from the DB. If this version is not
                //          the latest, then it auto merge might ignore it!
                const updatePatient = await updatePatientInfo({
                  patientID: patient.patientID,
                  cardiologist: clinicianId,
                  _version: patient._version
                });

                // Saves patient locally with patientId as key
                if (updatePatient.data) {
                  await AsyncStorage.setItem(
                    patientId,
                    JSON.stringify(updatePatient.data.updatePatientInfo)
                  );
                }
              }
            }
          }
        }
        // Device is offline: saves patientId locally with PatientRequest as key
        else {
          const pendingRequests = await AsyncStorage.getItem(
            AsyncStorageKeys.PATIENT_REQUESTS
          );
          // Other pending requests exist: append current patientId into the list
          if (pendingRequests) {
            const pendingPatientIds: string[] = JSON.parse(pendingRequests);

            // Checks if patientId already exists in the list
            if (!(patientId in pendingPatientIds)) {
              pendingPatientIds.push(patientId);
              await AsyncStorage.setItem(
                AsyncStorageKeys.PATIENT_REQUESTS,
                JSON.stringify(pendingPatientIds)
              );
            }
          } else {
            // No other pending requests: create a new list
            await AsyncStorage.setItem(
              AsyncStorageKeys.PATIENT_REQUESTS,
              JSON.stringify([patientId])
            );
          }

          // Notifies NWA
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.PENDING_PATIENT_REQUEST_SYNC,
              true
            )
          );
        }

        // Dispatch to front end to indicate that procedure is successful
        store.dispatch(setProcedureSuccessful(true));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    // Removes patientId to be updated from facts
    agentAPI.addFact(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.UPDATE_CLINICIAN, null),
      false
    );
    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions for activating the ApprovePatientRequest class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.CLINICIAN_UPDATED,
  true
);

// Action Frame for ApprovePatientRequest class
const af_ApprovePatientRequest = new Actionframe(
  `AF_${ActionFrameIDs.DTA.APPROVE_PATIENT_REQUEST}`,
  [rule1, rule2],
  new ApprovePatientRequest()
);

export default af_ApprovePatientRequest;
