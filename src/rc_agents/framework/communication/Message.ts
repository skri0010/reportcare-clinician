import Belief from "../base/Belief";

/**
 * Class representing the message
 */
class Message {
  private performative: string;

  private sender: string;

  private receiver: string;

  private content: Belief;

  /**
   * Constructor of the Message class
   * @param {string} performative - performative of the message
   * @param {string} sender - sender or owner of the message
   * @param {string} receiver - receiver for the message
   * @param {Belief} content - message content in belief form
   */
  constructor(
    performative: string,
    sender: string,
    receiver: string,
    content: Belief
  ) {
    this.performative = performative;
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
  }

  /**
   * Get the performative of the message
   */
  getPerformative(): string {
    return this.performative;
  }

  /**
   * Get the sender of the message
   */
  getSender(): string {
    return this.sender;
  }

  /**
   * Get the receivers of the message
   */
  getReceiver(): string {
    return this.receiver;
  }

  /**
   * Get the message content
   */
  getContent(): Belief {
    return this.content;
  }
}

export default Message;
