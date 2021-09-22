import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
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
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

/**
 * Class to represent the activity for requesting display of clinician contacts
 * This happens in Procedure Storing Data (SRD-IV) Clinician Procedure
 */
class RequestClinicianContactsDisplay extends Communicate {
  /**
   * Constructor for the RequestAlertInfoDisplay class
   */
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_CLINICIAN_CONTACTS,
      Performative.REQUEST,
      // Triggers Display Clinician contacts action frame of UXSA
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.CLINICIAN_CONTACTS_RETRIEVED,
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
  ProcedureAttributes.SRD_IV,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_CLINICIAN_CONTACTS
);

const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.CLINICIAN_CONTACTS_RETRIEVED,
  true
);

// Actionframe
export const af_RequestClinicianContactDisplay = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_CLINICIAN_CONTACTS}`,
  [rule1, rule2, rule3],
  new RequestClinicianContactsDisplay()
);
