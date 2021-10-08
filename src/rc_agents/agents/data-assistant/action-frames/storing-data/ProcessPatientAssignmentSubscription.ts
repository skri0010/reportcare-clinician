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
import { LocalStorage } from "rc_agents/storage";
import { getPatientAssignment } from "aws";
import { store } from "util/useRedux";
import { agentNWA } from "rc_agents/agents";
import { PatientAssignment } from "aws/API";
import { setPendingPatientAssignments } from "ic-redux/actions/agents/patientAssignmentActionCreator";

/**
 * Class to represent an activity for processing patient assignment subscription.
 * This happens in Procedure Storing Data (SRD-I).
 */
class ProcessPatientAssignmentSubscription extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTION);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);
    try {
      const facts = agentAPI.getFacts();
      // Get patient assignment subscription from facts
      const patientAssignmentSubscription: PatientAssignment =
        facts[BeliefKeys.PATIENT]?.[
          PatientAttributes.PATIENT_ASSIGNMENT_SUBSCRIPTION
        ];

      // Get clinician Id
      const clinicianId = await LocalStorage.getClinicianID();

      if (
        patientAssignmentSubscription &&
        clinicianId &&
        patientAssignmentSubscription.clinicianID === clinicianId
      ) {
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Device is online: retrieves patient assignment
          const query = await getPatientAssignment({
            clinicianID: patientAssignmentSubscription.clinicianID,
            patientID: patientAssignmentSubscription.patientID
          });

          if (query.data.getPatientAssignment) {
            const patientAssignmentToDispatch = query.data.getPatientAssignment;
            // Saves patient assignment locally
            await LocalStorage.setPendingPatientAssignment(
              patientAssignmentToDispatch
            );

            // Adds to the front of current list of pending patient assignments
            let patientAssignmentExists: PatientAssignment | undefined;
            let { pendingPatientAssignments } =
              store.getState().patientAssignments;
            if (pendingPatientAssignments) {
              // Check if patient assignment already exists
              patientAssignmentExists = pendingPatientAssignments.find(
                (item) =>
                  item.patientID === patientAssignmentSubscription.patientID
              );
            } else {
              pendingPatientAssignments = [];
            }

            if (!patientAssignmentExists) {
              pendingPatientAssignments.unshift(patientAssignmentToDispatch);
              // Dispatch updated list of pending patient assignments
              store.dispatch(
                setPendingPatientAssignments(pendingPatientAssignments)
              );
            }
          }
        } else {
          // Device is offline: Store patient assignment subscription locally
          await LocalStorage.setPatientAssignmentSubscription(
            patientAssignmentSubscription
          );
          // Notifies NWA
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.SYNC_PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTIONS,
              true
            )
          );
        }
        // Removes patient assignment subscription from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.PATIENT_ASSIGNMENT_SUBSCRIPTION,
            null
          ),
          false
        );
      }
      // Stops the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.SRD_V,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Set to retry later
      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTION,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.SRD_V,
            ProcedureConst.ACTIVE
          )
        );
      });

      // Update Facts
      // Stops the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.SRD_V,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_V,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTION,
  true
);

// Actionframe
export const af_ProcessPatientAssignmentSubscription = new Actionframe(
  `AF_${ActionFrameIDs.DTA.PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTION}`,
  [rule1, rule2],
  new ProcessPatientAssignmentSubscription()
);
