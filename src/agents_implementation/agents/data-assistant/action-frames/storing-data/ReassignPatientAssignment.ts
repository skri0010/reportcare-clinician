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
  createPatientAssignment,
  updatePatientAssignment,
  Reassignment
} from "aws";
import { store } from "ic-redux/store";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import agentNWA from "agents_implementation/agents/network-assistant/NWA";

/**
 * JH-TODO: To be updated
 * Currently unable to get PatientInfo of the new patient
 * Add front end trigger to start this activity
 */

/**
 * Class to represent an activity for reassigning a patient's clinician.
 * This happens in Procedure Storing Data (SRD) when a clinician reassigns a patient's assignment.
 */
class ReassignPatientAssignment extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.REASSIGN_PATIENT_ASSIGNMENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.REASSIGNMENT_UPDATED,
        true
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Get reassignment data
      const reassignment: Reassignment =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.REASSIGN_CLINICIAN
        ];

      // Get locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (
        reassignment &&
        reassignment.patientID &&
        reassignment.clinicianID &&
        clinicianId
      ) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Insert PatientAssignment for another clinician and update PatientAssignment status
          await createPatientAssignment({
            patientID: reassignment.patientID,
            clinicianID: reassignment.clinicianID,
            status: PatientAssignmentStatus.PENDING
          });
          await updatePatientAssignment({
            patientID: reassignment.patientID,
            clinicianID: clinicianId,
            status: PatientAssignmentStatus.REASSIGNED
          });
        }
        // Device is offline: Save locally in PatientReassignments
        else {
          // Append current reassignment into list of other pending reassignments
          const localData = await AsyncStorage.getItem(
            AsyncStorageKeys.PATIENT_REASSIGNMENTS
          );
          // Key exists in AsyncStorage
          if (localData) {
            // Insert and store if this reassignment does not exist (ie same patientID)
            const pendingReassignments: Reassignment[] = JSON.parse(localData);
            const reassignmentExists = pendingReassignments.find(
              (storedReassignment) =>
                storedReassignment.patientID === reassignment.patientID
            );

            if (!reassignmentExists) {
              pendingReassignments.push(reassignment);
              await AsyncStorage.setItem(
                AsyncStorageKeys.PATIENT_REASSIGNMENTS,
                JSON.stringify(pendingReassignments)
              );
            }
          }
          // Key does not exist in AsyncStorage
          else {
            // Insert this new reassignment
            await AsyncStorage.setItem(
              AsyncStorageKeys.PATIENT_REASSIGNMENTS,
              JSON.stringify([reassignment])
            );
          }

          // Notify NWA
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.PENDING_PATIENT_REASSIGNMENT_SYNC,
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
    // Remove reassignment from facts
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.REASSIGN_CLINICIAN,
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

// Preconditions for activating the ReassignPatientAssignment class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.REASSIGNMENT_UPDATED,
  false
);

// Action Frame for ApprovePatientAssignment class
const af_ReassignPatientAssignment = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REASSIGN_PATIENT_ASSIGNMENT}`,
  [rule1, rule2],
  new ReassignPatientAssignment()
);

export default af_ReassignPatientAssignment;
