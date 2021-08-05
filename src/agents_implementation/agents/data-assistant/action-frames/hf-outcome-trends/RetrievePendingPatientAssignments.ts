import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition,
  agentAPI
} from "agents_implementation/agent_framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst,
  AsyncStorageKeys
} from "agents_implementation/agent_framework/AgentEnums";
import { PatientAssignmentStatus } from "agents_implementation/agent_framework/model";
import { listPendingPatientAssignments } from "aws";
import { PatientAssignment } from "aws/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Class to represent an activity for retrieving pending patient assignments.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
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

    // Update Beliefs
    agent.addBelief(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
        false
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

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

      // Update Facts
      if (pendingPatientAssignments) {
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.PENDING_PATIENT_ASSIGNMENTS,
            pendingPatientAssignments
          ),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions for activating the RetrievePendingPatientAssignments class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
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
