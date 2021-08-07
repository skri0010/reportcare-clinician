import Message from "../communication/Message";
import messageChannel from "../communication/MessageChannel";
import Activity from "./Activity";
import Agent from "./Agent";
import Belief from "./Belief";

/**
 * Class representing communication
 */
class Communicate extends Activity {
  private performative: string;

  private content: Belief;

  private receivers: string[];

  /**
   * Constructor for the Communicate Class
   * @param {string} id - identifier of the actiivy
   * @param {string} performative - performative of the message
   * @param {Belief} content - content(beleif) of the message
   * @param {string[]} receivers - array containing the receivers
   */
  constructor(
    id: string,
    performative: string,
    content: Belief,
    receivers: string[]
  ) {
    super(id);
    this.performative = performative;
    this.content = content;
    this.receivers = receivers;
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing this activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent);
    const sender = agent.getID();
    for (let i = 0; i < this.receivers.length; i += 1) {
      messageChannel.addMessage(
        new Message(this.performative, sender, this.receivers[i], this.content)
      );
    }
  }

  /**
   * Get the content of the message
   */
  getContent(): Belief {
    return this.content;
  }
}

export default Communicate;
