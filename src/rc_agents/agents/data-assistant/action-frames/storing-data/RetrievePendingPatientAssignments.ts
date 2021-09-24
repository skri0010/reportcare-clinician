import {
  Actionframe,
  Agent,
  Belief,
  Activity,
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
import { Storage } from "rc_agents/storage";
import { PatientAssignmentStatus } from "rc_agents/model";
import { listPendingPatientAssignments } from "aws";
import { PatientAssignment } from "aws/API";
import { setFetchingPendingPatientAssignments } from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";

/**
 * Class to represent an activity for retrieving pending patient assignments.
 * This happens in Procedure Storing Data (SRD-I).
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
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    // Dispatch to store to indicate fetching
    store.dispatch(setFetchingPendingPatientAssignments(true));

    let pendingPatientAssignments: PatientAssignment[] | null | undefined;
    try {
      // Get locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();
      // Get online status from facts
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (clinicianId) {
        // Device is online
        if (isOnline) {
          // Retrieve pending patient assignments
          const query = await listPendingPatientAssignments({
            clinicianID: clinicianId,
            pending: { eq: PatientAssignmentStatus.PENDING.toString() }
          });

          if (query.data.listPendingPatientAssignments?.items) {
            pendingPatientAssignments = query.data.listPendingPatientAssignments
              .items as PatientAssignment[];
            // Save retrieved data locally
            await Storage.setPendingPatientAssignments(
              pendingPatientAssignments
            );
          }
        }
        // Device is offline: Retrieve locally stored data (if any)
        else {
          pendingPatientAssignments =
            await Storage.getPendingPatientAssignments();
        }
      }

      if (pendingPatientAssignments) {
        // Update Facts
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
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Set to retry later
      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.SRD_I,
            ProcedureConst.ACTIVE
          )
        );
      });

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.SRD_I,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingPendingPatientAssignments(false));
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
  true
);

// Actionframe
export const af_RetrievePendingPatientAssignments = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS}`,
  [rule1, rule2],
  new RetrievePendingPatientAssignments()
);
