/* eslint-disable no-console */
import { DeviceEventEmitter } from "react-native";
import Belief from "./Belief";
import Actionframe from "./Actionframe";
import Message from "../communication/Message";
import agentAPI from "../AgentAPI";
import Engine from "./Engine/Engine";
import ActivityNode from "./Engine/Rete/ActivityNode";
import ObjNode from "./Engine/Rete/ObjNode";
import AlphaNode from "./Engine/Rete/AlphaNode";
import Node from "./Engine/Rete/Node";
import BetaNode from "./Engine/Rete/BetaNode";
import { DataStore } from "@aws-amplify/datastore";
import { ClinicianInfo } from "../../../aws/models";
import { Fact } from "../model";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Class representing the Agent
 */
class Agent {
  private id: string;

  private beliefs: Fact;

  private actionFrames: Actionframe[];

  private messageQueue: Message[];

  private availableActions: ActivityNode[] = [];

  private working: boolean;

  private engine!: Engine;

  /**
   * Constructor of the Agent
   * @param {string} id - identifier of the Agent
   * @param {Actionframe[]} actionFrames - action frames of the Agent
   * @param {Belief[]} beliefs - initial beliefs of the Agent
   */
  constructor(id: string, actionFrames: Actionframe[], beliefs: Belief[]) {
    this.id = id;
    this.beliefs = {};
    this.actionFrames = actionFrames;
    this.messageQueue = [];
    this.availableActions = [];
    this.working = false;

    DeviceEventEmitter.addListener(this.id, (message: Message) =>
      this.onMessage(message)
    );
    DeviceEventEmitter.addListener("env", (fact: Belief) => this.onEvent(fact));
    this.initAgent(beliefs, this.actionFrames);
  }

  /**
   * Called to trigger the initialization of agent.
   */
  // eslint-disable-next-line class-methods-use-this
  start(): void {
    // Do nothing
  }

  /**
   * Get the beliefs of the agent
   */
  getBeliefs(): Fact {
    return this.beliefs;
  }

  /**
   * Get the identifier of the agent
   */
  getID(): string {
    return this.id;
  }

  /**
   * Get action frames
   */
  getActionFrames(): Actionframe[] {
    return this.actionFrames;
  }

  /**
   * Get available actions
   */
  getAvailableActions(): unknown {
    return this.availableActions;
  }

  /**
   * Check if it is working
   */
  isWorking(): boolean {
    return this.working;
  }

  /**
   * Add belief into agent's belief pool
   * @param {Belief} belief - belief to be inserted
   */
  addBelief(belief: Belief): boolean | undefined {
    try {
      if (!(belief.getKey() in this.beliefs)) {
        this.beliefs[belief.getKey()] = {};
      }
      this.beliefs[belief.getKey()][belief.getAttribute()] = belief.getValue();
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Initiate the agent
   * @param {Belief[]} beliefs - beliefs of the agents
   * @param {Actionframe[]} actionFrames - actionframes of the agents
   */
  async initAgent(
    beliefs: Belief[],
    actionFrames: Actionframe[]
  ): Promise<void> {
    // Set Inference Engine
    this.engine = new Engine(actionFrames);

    // Register Agent in the system
    // Note: agentManager might be undefined on first attempt, set to retry every 0.5s
    const timer = setInterval(() => {
      try {
        agentAPI.registerAgent(this);
        clearInterval(timer);
      } catch (e) {
        console.log(`${this.id} ${e}`);
      }
    }, 500);

    // Set Beliefs
    await this.setBeliefs(beliefs);

    await this.inference();
  }

  /**
   * Set beliefs of the agent
   * @param {Belief[]} beliefs - Initial beliefs of the agent
   */
  async setBeliefs(beliefs: Belief[]): Promise<void> {
    try {
      const userId = await AsyncStorage.getItem("UserId");
      if (userId) {
        const clinician = await DataStore.query(ClinicianInfo, userId);
        if (clinician && this.id in clinician) {
          const beliefJSON = clinician[this.id as keyof typeof clinician];
          if (beliefJSON && Object.entries(JSON.parse(beliefJSON)).length > 0) {
            this.beliefs = JSON.parse(beliefJSON);
          } else {
            for (let i = 0; i < beliefs.length; i += 1) {
              this.addBelief(beliefs[i]);
            }
          }
        }
      }
    } catch (e) {
      console.log(this.id + e);
    }
  }

  /**
   * Check message if the message is received
   * @param {Message} message - message received
   */
  async onMessage(message: Message): Promise<void> {
    if (this.working) {
      this.messageQueue.push(message);
    } else {
      const updated = this.addBelief(message.getContent());
      if (updated) {
        await this.inference();
      }
    }
  }

  /**
   * Add fact to the belief pool
   * @param {Belief} fact - fact sent from the agent management
   */
  async onEvent(fact: Belief): Promise<void> {
    const updated = this.addBelief(fact);
    if (updated) {
      await this.inference();
    }
  }

  /**
   * Make an inference which actions are avaialble
   */
  async inference(): Promise<void> {
    const result = await this.engine.traverseNetwork(this);

    for (let i = 0; i < result.length; i += 1) {
      let activityExists = false;
      for (let j = 0; j < this.availableActions.length; j += 1) {
        if (this.availableActions[j].getID() === result[i].getID()) {
          activityExists = true;
          break;
        }
      }
      if (!activityExists) {
        this.availableActions.push(result[i]);
      }
    }

    if (this.availableActions.length > 0) {
      await this.startActivity();
    }
  }

  /**
   * Work on available activities
   */
  async startActivity(): Promise<void> {
    if (this.availableActions.length > 0) {
      this.working = true;
      const activityNode = this.availableActions.shift()!;
      await activityNode.getActivity().doActivity(this);
    }
    this.working = false;

    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()!;
      this.addBelief(message.getContent());
    }

    // Do Inference
    await this.inference();
  }

  displayState(): void {
    console.log(`Agent ${this.getID()}`);
    console.log("Beliefs ...............................................");
    console.log(this.beliefs);
    console.log(".......................................................");
  }

  displayEngine(): void {
    // Root Node
    const currNode = this.engine.getNetwork();
    console.log("Root Node");
    console.log("--------------------------------------------------");
    console.log(currNode.getID());
    console.log(currNode.getChildren().length);
    console.log("--------------------------------------------------");

    // Object Node
    if (currNode.getChildren().length > 0) {
      currNode.getChildren().forEach((objNode) => {
        if (objNode instanceof ObjNode) {
          console.log("Object Node");
          console.log("--------------------------------------------------");
          console.log(objNode.getID());
          console.log(objNode.getObject());
          console.log(objNode.isActive());
          console.log(objNode.getChildren().length);
          console.log("--------------------------------------------------");
        }
        objNode.getChildren().forEach((alphaNode) => {
          if (alphaNode instanceof AlphaNode) {
            console.log("Alpha Node");
            console.log("--------------------------------------------------");
            console.log(alphaNode.getID());
            console.log(alphaNode.getRule());
            console.log(alphaNode.isActive());
            console.log(alphaNode.getChildren().length);
            for (let i = 0; i < alphaNode.getActivities().length; i += 1) {
              console.log("Activity: ", alphaNode.getActivities()[i].getID());
            }
          }
          console.log("--------------------------------------------------");

          // Initialisation
          const tempQueue = [];
          tempQueue.push(alphaNode);

          // Get all Beta Nodes
          while (tempQueue.length > 0) {
            const parentBetaNode: Node = tempQueue.shift()!;
            const childNodes: Node[] = parentBetaNode.getChildren()!;
            for (let i = 0; i < childNodes.length; i += 1) {
              const betaNode = childNodes[i];
              if (betaNode instanceof BetaNode) {
                console.log("Beta Node");
                console.log(
                  "--------------------------------------------------"
                );
                console.log(betaNode.getID());
                console.log(betaNode.isActive());
                console.log(betaNode.getChildren().length);
                for (let j = 0; j < betaNode.getActivities().length; j += 1) {
                  console.log(
                    "Activity: ",
                    betaNode.getActivities()[j].getID()
                  );
                }
                console.log(
                  "--------------------------------------------------"
                );
                if (betaNode.getChildren().length > 0) {
                  tempQueue.push(betaNode);
                }
              }
            }
          }
        });
      });
    }
  }
}

export default Agent;
