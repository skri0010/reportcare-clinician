import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition
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
 * Represents the activity for requesting clinician's entry data.
 * This happens in Procedure App-Medical Records Device Configuration (MRDC) - CP-PSB.
 * Only being triggered when a clinician signs in.
 */
class RequestEntryData extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.APS.REQUEST_ENTRY_DATA,
      Performative.REQUEST,
      // Triggers DTA to retrieve or store entry data
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.RETRIEVE_ENTRY,
        true
      ),
      [AgentIDs.DTA]
    );
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      super.doActivity(agent);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  AgentIDs.APS,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.APS.ASSOCIATE_DATA
);
const rule2 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.MRDC,
  ProcedureConst.ACTIVE
);

// Actionframe
export const af_RequestEntryData = new Actionframe(
  `AF_${ActionFrameIDs.APS.REQUEST_ENTRY_DATA}`,
  [rule1, rule2],
  new RequestEntryData()
);
