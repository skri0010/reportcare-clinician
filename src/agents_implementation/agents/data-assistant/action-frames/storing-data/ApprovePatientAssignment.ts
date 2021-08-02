import Actionframe from "agents_implementation/agent_framework/base/Actionframe";
import Activity from "agents_implementation/agent_framework/base/Activity";
import Agent from "agents_implementation/agent_framework/base/Agent";
import Belief from "agents_implementation/agent_framework/base/Belief";
import Precondition from "agents_implementation/agent_framework/base/Precondition";
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
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import {
  PatientAssignmentStatus,
  getPatientInfo,
  createClinicianPatientMap,
  updatePatientInfo,
  updatePatientAssignment
} from "aws";
import { store } from "ic-redux/store";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import agentNWA from "agents_implementation/agents/network-assistant/NWA";
import Auth from "@aws-amplify/auth";

/**
 * LS-TODO: To be updated
 * Currently unable to get PatientInfo of the new patient
 * Add front end trigger to start this activity
 */

/**
 * Class to represent an activity for assigning self as patient's clinician.
 * This happens in Procedure Storing Data (SRD) when a clinician approves a patient's assignment.
 */
class ApprovePatientAssignment extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.APPROVE_PATIENT_ASSIGNMENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.ASSIGNMENT_UPDATED, true)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Gets patientId to be updated
      const patientId =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.APPROVE_ASSIGNMENT
        ];

      // Gets locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (patientId && clinicianId) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Insert ClinicianPatientMap, update PatientAssignment status, update access token
          await createClinicianPatientMap({
            clinicianID: clinicianId,
            patientID: patientId,
            owner: clinicianId
          });
          await updatePatientAssignment({
            patientID: patientId,
            clinicianID: clinicianId,
            status: PatientAssignmentStatus.APPROVED
          });
          await Auth.currentAuthenticatedUser({ bypassCache: true }); // pre token generation Lambda is triggered

          // JH-TODO: May need to remove.
          // Update patient
          const query = await getPatientInfo(patientId);

          // JH-TODO: cardiologist attribute seem irrelevant. Needs checking
          if (query.data.getPatientInfo) {
            const patient = query.data.getPatientInfo;
            if (patient) {
              // Updates patient's cardiologist
              // LS-TODO: Whether to update cardiologist using ClinicianID or name
              // JH-TODO: Note, we must check the version from the DB. If this version is not
              //          the latest, then it auto merge might ignore it!

              const updatePatient = await updatePatientInfo({
                patientID: patient.id,
                cardiologist: clinicianId,
                _version: patient._version
              });

              // Save patient locally with patientId as key
              if (updatePatient.data) {
                await AsyncStorage.setItem(
                  patientId,
                  JSON.stringify(updatePatient.data.updatePatientInfo)
                );
              }
            }
          }
        }
        // Device is offline: Save locally in PatientAssignments
        else {
          // Append current patientID into list of other pending assignments
          const pendingAssignments = await AsyncStorage.getItem(
            AsyncStorageKeys.PATIENT_ASSIGNMENTS
          );
          // Key exists in AsyncStorage
          if (pendingAssignments) {
            const pendingPatientIds: string[] = JSON.parse(pendingAssignments);

            // Checks if patientId already exists in the list
            if (!(patientId in pendingPatientIds)) {
              pendingPatientIds.push(patientId);
              await AsyncStorage.setItem(
                AsyncStorageKeys.PATIENT_ASSIGNMENTS,
                JSON.stringify(pendingPatientIds)
              );
            }
          }
          // Key does not exist in AsyncStorage
          else {
            // No other pending requests: create a new list
            await AsyncStorage.setItem(
              AsyncStorageKeys.PATIENT_ASSIGNMENTS,
              JSON.stringify([patientId])
            );
          }

          // Notify NWA
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.PENDING_PATIENT_ASSIGNMENT_SYNC,
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
    // Remove patientId to be updated from facts
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.APPROVE_ASSIGNMENT,
        null
      ),
      false
    );
    // Stop the procedure
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

// Preconditions for activating the ApprovePatientAssignment class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.ASSIGNMENT_UPDATED,
  false
);

// Action Frame for ApprovePatientAssignment class
const af_ApprovePatientAssignment = new Actionframe(
  `AF_${ActionFrameIDs.DTA.APPROVE_PATIENT_ASSIGNMENT}`,
  [rule1, rule2],
  new ApprovePatientAssignment()
);

export default af_ApprovePatientAssignment;
