import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition,
  setRetryLaterTimeout
} from "rc_agents/framework";
import {
  ProcedureConst,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "rc_agents/AgentEnums";
import { Storage } from "rc_agents/storage";
import { Role, getClinicianInfo } from "aws";
import agentAPI from "rc_agents/framework/AgentAPI";
import { setFetchingPatients } from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";

/**
 * Class to represent an activity for retrieving role of user for retrieving patients.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RetrieveRole extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.RETRIEVE_ROLE);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    let role: string | null = null;
    try {
      const roles: string[] = Object.values(Role);
      // Get locally stored clinician info
      const localClinician = await Storage.getClinician();
      // Get online status from facts
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];
      if (localClinician) {
        // Device is online
        if (isOnline) {
          const query = await getClinicianInfo({
            clinicianID: localClinician.clinicianID
          });
          if (query.data) {
            const clinician = query.data.getClinicianInfo;
            if (clinician && clinician.role) {
              // Save retrieved data locally
              await Storage.setClinician(clinician);
              if (roles.includes(clinician.role)) {
                role = clinician.role;
              }
            }
          }
        }
        // Device is offline: Retrieve locally stored data (if any)
        else if (localClinician.role && roles.includes(localClinician.role)) {
          role = localClinician.role;
        }

        if (role) {
          // Update Facts
          // Store item
          agentAPI.addFact(
            new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ROLE, role),
            false
          );
          // Trigger request to Communicate to USXA
          agent.addBelief(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.ROLE_RETRIEVED,
              true
            )
          );
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Set to retry later
      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.RETRIEVE_ROLE,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.HF_OTP_I,
            ProcedureConst.ACTIVE
          )
        );
      });

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_I,
          ProcedureConst.INACTIVE
        )
      );
      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingPatients(false));
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ROLE,
  true
);

// Actionframe
export const af_RetrieveRole = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.RETRIEVE_ROLE}`,
  [rule1],
  new RetrieveRole()
);
