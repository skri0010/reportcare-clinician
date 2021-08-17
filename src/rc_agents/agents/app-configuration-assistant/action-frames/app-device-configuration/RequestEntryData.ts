import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";

/**
 * Class to represent the activity for requesting clinician's entry data.
 * This happens in Procedure App Device Configuration (ADC).
 */
class RequestEntryData extends Communicate {
  /**
   * Constructor for the RequestEntryData class
   */
  constructor() {
    super(
      ActionFrameIDs.APS.REQUEST_ENTRY_DATA,
      Performative.REQUEST,
      // Triggers RetrieveEntryData or StoreEntryData action frame of DTA
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.RETRIEVE_ENTRY,
        true
      ),
      [AgentIDs.DTA]
    );
  }

  /**
   * Perform the activity
   * @param {Agent} agent - agent executing the activity
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
  ProcedureAttributes.ADC,
  ProcedureConst.ACTIVE
);

// Actionframe
export const af_RequestEntryData = new Actionframe(
  `AF_${ActionFrameIDs.APS.REQUEST_ENTRY_DATA}`,
  [rule1, rule2],
  new RequestEntryData()
);
