import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition
} from "rc-agents/framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc-agents/framework/AgentEnums";

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

      // Update Beliefs
      agent.addBelief(
        new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the RequestEntryData class
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

// Actionframe of the RequestEntryData class
const af_RequestEntryData = new Actionframe(
  `AF_${ActionFrameIDs.APS.REQUEST_ENTRY_DATA}`,
  [rule1, rule2],
  new RequestEntryData()
);

export default af_RequestEntryData;
