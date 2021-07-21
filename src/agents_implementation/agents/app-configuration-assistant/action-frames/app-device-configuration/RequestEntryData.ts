import Actionframe from "../../../../agent_framework/base/Actionframe";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Communicate from "../../../../agent_framework/base/Communicate";
import Precondition from "../../../../agent_framework/base/Precondition";
import Performative from "../../../../agent_framework/const/Performative";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";

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
      "RequestEntryData",
      Performative.REQUEST,
      new Belief("Clinician", "retrieveEntry", true),
      ["DTA"]
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
      agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the RequestEntryData class
const rule1 = new Precondition("APS", "lastActivity", "AssociateData");
const rule2 = new Precondition("Procedure", "ADC", ProcedureConst.ACTIVE);

// Actionframe of the RequestEntryData class
const af_RequestEntryData = new Actionframe(
  "AF_RequestEntryData",
  [rule1, rule2],
  new RequestEntryData()
);

export default af_RequestEntryData;
