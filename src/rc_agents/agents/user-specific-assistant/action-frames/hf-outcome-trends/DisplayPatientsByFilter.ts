import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { store } from "util/useRedux";
import {
  setFetchingPatients,
  setPatients
} from "ic-redux/actions/agents/actionCreator";
import { PatientInfo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";

/**
 * Class to represent an activity for displaying patients (filter if necessary).
 * This happens in Procedure Storing Data (HTF-OP-I).
 */
class DisplayPatientsByFilter extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_PATIENTS_BY_FILTER);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    const patients: PatientInfo[] =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[PatientAttributes.PATIENTS];

    if (patients) {
      // Filter patients based on risk filters
      const filteredPatients: PatientInfo[] = [];
      const { riskFilters } = store.getState().agents;
      let shouldFilter = false;

      // If one of the risk filters is true, we must proceed to filter
      Object.values(riskFilters).forEach((value) => {
        if (value) {
          shouldFilter = true;
        }
      });

      // Filter patients if needed
      if (shouldFilter) {
        patients.forEach((patient) => {
          // We can assert RiskLevel in this condition
          if (riskFilters[patient.riskLevel as RiskLevel]) {
            filteredPatients.push(patient);
          }
        });
      }

      // Dispatch to store retrieved patients
      store.dispatch(setPatients(shouldFilter ? filteredPatients : patients));

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.PATIENTS, null),
        false
      );
    }

    // Update Facts
    // End the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.HF_OTP_I,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    // Dispatch to store to indicate fetching has ended
    store.dispatch(setFetchingPatients(false));
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PATIENTS_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayPatientsByFilter = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_PATIENTS_BY_FILTER}`,
  [rule1, rule2],
  new DisplayPatientsByFilter()
);
