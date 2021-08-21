import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import {
  ProcedureConst,
  Performative,
  CommonAttributes
} from "agents-framework/Enums";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

/**
 * Class to represent the activity for requesting display of retrieved patients' info.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RequestDisplayPatients extends Communicate {
  constructor() {
    // Triggers DisplayPatients of UXSA agent
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_PATIENTS,
      Performative.REQUEST,
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.PATIENTS_RETRIEVED,
        true
      ),
      [AgentIDs.UXSA]
    );
  }

  /**
   * Perform the activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      // Reset preconditions
      await super.doActivity(agent, [rule3]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_PATIENTS_BY_ROLE
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PATIENTS_RETRIEVED,
  true
);

// Actionframe
export const af_RequestDisplayPatients = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_PATIENTS}`,
  [rule1, rule2, rule3],
  new RequestDisplayPatients()
);
