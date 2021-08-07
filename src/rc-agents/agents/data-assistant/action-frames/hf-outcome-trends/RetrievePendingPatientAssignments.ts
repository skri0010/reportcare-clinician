import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition,
  agentAPI,
  setRetryLaterTimeout
} from "rc-agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst,
  AsyncStorageKeys
} from "rc-agents/framework/AgentEnums";
import { PatientAssignmentStatus } from "rc-agents/model";
import { listPendingPatientAssignments } from "aws";
import { PatientAssignment } from "aws/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFetchNewPatientAssignments } from "ic-redux/actions/agents/actionCreator";
import { store } from "ic-redux/store";

/**
 * Class to represent an activity for retrieving pending patient assignments.
 * This happens in Procedure Storing Data (SRD).
 */
class RetrievePendingPatientAssignments extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);
    let pendingPatientAssignments: PatientAssignment[] | null | undefined;

    try {
      // Get locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];
      // Device is online
      if (clinicianId && isOnline) {
        // Retrieve pending patient assignments
        const query = await listPendingPatientAssignments({
          clinicianID: clinicianId,
          pending: { eq: PatientAssignmentStatus.PENDING.toString() }
        });

        if (query.data.listPendingPatientAssignments?.items) {
          pendingPatientAssignments = query.data.listPendingPatientAssignments
            .items as PatientAssignment[];
          // Save retrieved data locally
          await AsyncStorage.setItem(
            AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS,
            JSON.stringify(pendingPatientAssignments)
          );
        }
      }
      // Device is offline: Retrieve locally stored data (if any)
      else if (clinicianId && !isOnline) {
        const localData = await AsyncStorage.getItem(
          AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS
        );
        if (localData) {
          pendingPatientAssignments = JSON.parse(
            localData
          ) as PatientAssignment[];
        }
      }

      if (pendingPatientAssignments) {
        // Update Facts and Beliefs
        // Store items
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.PENDING_PATIENT_ASSIGNMENTS,
            pendingPatientAssignments
          ),
          false
        );
        // Trigger request to Communicate to USXA
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.PENDING_PATIENT_ASSIGNMENTS_RETRIEVED,
            true
          )
        );
      } else {
        // Dispatch to store boolean to fetch updated patient assignments later
        setRetryLaterTimeout(() =>
          store.dispatch(setFetchNewPatientAssignments(true))
        );
      }

      // Update Beliefs
      // Reset precondition
      agent.addBelief(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
          false
        )
      );
      // Set last activity
      agent.addBelief(
        new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions for activating the RetrievePendingPatientAssignments class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
  true
);

// Action Frame for RetrievePendingPatientAssignments class
export const af_RetrievePendingPatientAssignments = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS}`,
  [rule1, rule2],
  new RetrievePendingPatientAssignments()
);
