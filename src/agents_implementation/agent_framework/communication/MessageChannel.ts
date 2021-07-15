/* eslint-disable import/no-duplicates */
import agentManager from "../management/AgentManagement";
import Message from "./Message";
import { DeviceEventEmitter } from "react-native";
import AgentManagement from "../management/AgentManagement";

/**
 * Class representing the message channel
 */
class MessageChannel {
  private messageQueue: Message[];

  private system: typeof AgentManagement;

  /**
   * Constructor for the Message Channle or Message transport system
   */
  constructor() {
    this.messageQueue = [];
    this.system = agentManager;
  }

  /**
   * Add message to the queue and send message
   * @param {Message} message - message(ACL) to be sent
   */
  // eslint-disable-next-line class-methods-use-this
  addMessage(message: Message) {
    DeviceEventEmitter.emit(message.getReceiver(), message);
  }

  /**
   * Send message to the appropriate recipents
   */
  sendMessage(): void {
    const message = this.messageQueue.shift();
    if (message) {
      DeviceEventEmitter.emit(message.getReceiver(), message);
    }
  }
}

const messageChannel = new MessageChannel();

export default messageChannel;
