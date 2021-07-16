import Message from "../communication/Message";
import messageChannel from "../communication/MessageChannel";
import agentManager from "../management/AgentManagement";
import Activity from "./Activity";
import Agent from "./Agent";
import Belief from "./Belief";

/**
 * Class representing the broadcast activity
 */
class Broadcast extends Activity {
  private performative: string;

  private content: Belief;

  /**
   * Constructor for the Broadcast Class
   * @param {string} id - identifier of the broadcast activity
   * @param {string} performative - Performative of the message
   * @param {Belief} content - content(belief) of the message
   */
  constructor(id: string, performative: string, content: Belief) {
    super(id);
    this.performative = performative;
    this.content = content;
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing this activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent);
    const sender = agent.getID();
    const receivers = agentManager.getAgents();
    for (let i = 0; i < receivers.length; i += 1) {
      if (sender !== receivers[i].getID()) {
        messageChannel.addMessage(
          new Message(
            this.performative,
            sender,
            receivers[i].getID(),
            this.content
          )
        );
      }
    }
  }

  /**
   * Get the content of the message
   */
  getContent(): Belief {
    return this.content;
  }
}

export default Broadcast;
