import ActivityNode from "./Rete/ActivityNode";
import AlphaNode from "./Rete/AlphaNode";
import BetaNode from "./Rete/BetaNode";
import Node from "./Rete/Node";
import ObjNode from "./Rete/ObjNode";
import Actionframe from "../Actionframe";
import Precondition from "../Precondition";
import Agent from "../Agent";
import { Fact } from "../../model";

/**
 * Class representing the engine for inference
 */
class Engine {
  private root: Node;

  /**
   * Constructor of the inference engine
   * @param {Actionframe[]} actionFrames - array containing Actionframe
   */
  constructor(actionFrames: Actionframe[]) {
    this.root = new Node("Root");
    this.setup(actionFrames);
  }

  /**
   * Get the root node or the network
   */
  getNetwork(): Node {
    return this.root;
  }

  /**
   * Set up Rete Network of an engine
   * @param {Actionframe[]} actionFrames - array containing Actionframe
   */
  setup(actionFrames: Actionframe[]): void {
    const rootNode = this.root;

    actionFrames.forEach((actionFrame) => {
      // Initialisation
      const visitedObjNodes: ObjNode[] = [];
      const visitedAlphaNodes: AlphaNode[] = [];
      const isolatedAlphaNodes: AlphaNode[] = [];
      const visitedBetaNodes: BetaNode[] = [];
      const isolatedBetaNodes: BetaNode[] = [];
      const preconditions: Precondition[] = actionFrame.getPreconditions();

      // Construction of Object Nodes
      preconditions.forEach((precondition) => {
        let nodeExists = false;
        let matchedNode: ObjNode | null = null;

        const objNodes = rootNode.getChildren();
        for (let i = 0; i < objNodes.length; i += 1) {
          const childNode = objNodes[i];
          if (
            childNode instanceof ObjNode &&
            precondition.getKey() === childNode.getObject()
          ) {
            nodeExists = true;
            matchedNode = childNode;
            break;
          }
        }

        if (!nodeExists) {
          const objNode = new ObjNode(precondition.getKey());
          rootNode.setChildNode(objNode);
          visitedObjNodes.push(objNode);
        } else {
          let index = -1;
          for (let i = 0; i < visitedObjNodes.length; i += 1) {
            if (
              matchedNode &&
              matchedNode.getID() === visitedObjNodes[i].getID()
            ) {
              index = i;
              break;
            }
          }
          if (index < 0 && matchedNode) {
            visitedObjNodes.push(matchedNode);
          }
        }
      });

      // Construction of Alpha Nodes
      while (visitedObjNodes.length > 0) {
        const currObjNode = visitedObjNodes.shift();
        preconditions.forEach((precondition) => {
          let nodeExists = false;
          let matchedNode: AlphaNode | null = null;

          if (
            currObjNode &&
            currObjNode.getObject() === precondition.getKey()
          ) {
            const alphaNodes = currObjNode.getChildren();
            for (let i = 0; i < alphaNodes.length; i += 1) {
              const childNode = alphaNodes[i];
              if (
                childNode instanceof AlphaNode &&
                childNode.matchRule(precondition)
              ) {
                nodeExists = true;
                matchedNode = childNode;
                break;
              }
            }
            if (!nodeExists) {
              // Object Node does not have matching child node yet
              const alphaNode = new AlphaNode(precondition, currObjNode);
              currObjNode.setChildNode(alphaNode);
              visitedAlphaNodes.push(alphaNode);
            } else {
              // Object Node has matching child node
              let index = -1;
              for (let i = 0; i < visitedAlphaNodes.length; i += 1) {
                if (
                  matchedNode &&
                  matchedNode.getID() === visitedAlphaNodes[i].getID()
                ) {
                  index = i;
                  break;
                }
              }
              // Child node is not visited yet
              if (index < 0 && matchedNode) {
                visitedAlphaNodes.push(matchedNode);
              }
            }
          }
        });
      }

      // Initial Beta Nodes Construction
      if (visitedAlphaNodes.length > 1) {
        const alphaIndices: number[] = [];
        for (let i = 0; i < visitedAlphaNodes.length; i += 1) {
          // Check for isolated Alpha Nodes
          if (visitedAlphaNodes[i].getChildren().length < 1) {
            isolatedAlphaNodes.push(visitedAlphaNodes[i]);
          } else {
            alphaIndices.push(i);
          }
        }

        // Check for (initial) Beta Nodes
        while (alphaIndices.length > 0) {
          const currIndex = alphaIndices.shift()!;
          let betaFound = false;
          let betaVisited = false;

          // Check if the current Alpha Node still need to add
          for (let i = 0; i < visitedBetaNodes.length; i += 1) {
            const alphaNodeId = visitedAlphaNodes[currIndex].getID();
            if (
              visitedBetaNodes[i].getLeftParent().getID() === alphaNodeId ||
              visitedBetaNodes[i].getRightParent().getID() === alphaNodeId
            ) {
              betaVisited = true;
              break;
            }
          }

          // If the Beta Node corresponding to Alpha Node is not found yet
          visitedAlphaNodes[currIndex].getChildren().forEach((childNode) => {
            for (let counter = 0; counter < alphaIndices.length; counter += 1) {
              const alphaNodeId =
                visitedAlphaNodes[alphaIndices[counter]].getID();
              if (childNode instanceof BetaNode) {
                if (
                  childNode.getLeftParent().getID() === alphaNodeId ||
                  childNode.getRightParent().getID() === alphaNodeId
                ) {
                  betaFound = true;
                  visitedBetaNodes.push(childNode);
                }
              }
            }
          });

          if (!betaFound && !betaVisited) {
            isolatedAlphaNodes.push(visitedAlphaNodes[currIndex]);
          }

          if (
            visitedBetaNodes.length > 0 &&
            visitedBetaNodes.length + isolatedAlphaNodes.length >=
              preconditions.length - 1
          ) {
            break;
          }
        }
      } else if (visitedAlphaNodes.length === 1) {
        // Add Activity or terminal Node to Alpha Node
        const alphaNode = visitedAlphaNodes.shift()!;
        alphaNode.addActivity(
          new ActivityNode(actionFrame.getActivity(), alphaNode)
        );
      }

      // Check for remaining Beta Nodes
      if (visitedBetaNodes.length > 0) {
        for (let i = 0; i < visitedBetaNodes.length; i += 1) {
          isolatedBetaNodes.push(visitedBetaNodes[i]);
        }
      }

      // Join Remaining Alpha Nodes
      while (isolatedAlphaNodes.length > 1) {
        const leftParent = isolatedAlphaNodes.shift()!;
        const rightParent = isolatedAlphaNodes.shift()!;

        // Create a new Beta node
        const betaNode = new BetaNode(leftParent, rightParent);
        leftParent.setChildNode(betaNode);
        rightParent.setChildNode(betaNode);
        visitedBetaNodes.push(betaNode);
        isolatedBetaNodes.push(betaNode);
      }

      // Transverse through remaining Beta Nodes
      while (
        visitedBetaNodes.length > 0 &&
        visitedBetaNodes.length + isolatedAlphaNodes.length <
          preconditions.length - 1
      ) {
        // Get the Beta Node for checking
        const leftBetaNode = isolatedBetaNodes.shift()!;
        let betaVisited = false;

        // Check parent Beta Node already exists
        for (let i = 0; i < isolatedBetaNodes.length; i += 1) {
          const leftBetaNodeId = leftBetaNode.getID();
          if (
            isolatedBetaNodes[i].getLeftParent().getID() === leftBetaNodeId ||
            isolatedBetaNodes[i].getRightParent().getID() === leftBetaNodeId
          ) {
            betaVisited = true;
            break;
          }
        }

        if (!betaVisited) {
          if (leftBetaNode.getChildren().length > 0) {
            let betaFound = false;

            leftBetaNode.getChildren().forEach((childNode) => {
              for (
                let counter = 0;
                counter < isolatedBetaNodes.length;
                counter += 1
              ) {
                if (childNode instanceof BetaNode) {
                  const parentBetaNodeId = isolatedBetaNodes[counter].getID();
                  if (
                    childNode.getLeftParent().getID() === parentBetaNodeId ||
                    childNode.getRightParent().getID() === parentBetaNodeId
                  ) {
                    betaFound = true;
                    visitedBetaNodes.push(childNode);
                    isolatedBetaNodes.push(childNode);
                  }
                }
              }
            });

            if (!betaFound) {
              for (
                let index = 0;
                index < isolatedBetaNodes.length;
                index += 1
              ) {
                if (isolatedBetaNodes[index].getChildren().length < 1) {
                  // Create a new Beta node
                  const betaNode = new BetaNode(
                    leftBetaNode,
                    isolatedBetaNodes[index]
                  );
                  leftBetaNode.setChildNode(betaNode);
                  isolatedBetaNodes[index].setChildNode(betaNode);
                  visitedBetaNodes.push(betaNode);
                  isolatedBetaNodes.push(betaNode);
                  break;
                } else {
                  let skip = false;
                  for (
                    let j = index + 1;
                    j < isolatedBetaNodes.length;
                    j += 1
                  ) {
                    const isolatedBetaChildren =
                      isolatedBetaNodes[index].getChildren();
                    for (let k = 0; k < isolatedBetaChildren.length; k += 1) {
                      const childNode = isolatedBetaChildren[k];
                      if (childNode instanceof BetaNode) {
                        const betaNodeId = isolatedBetaNodes[j].getID();
                        if (
                          childNode.getLeftParent().getID() === betaNodeId ||
                          childNode.getRightParent().getID() === betaNodeId
                        ) {
                          skip = true;
                          break;
                        }
                      }
                    }
                    if (!skip) {
                      // Create a new Beta node
                      const betaNode = new BetaNode(
                        leftBetaNode,
                        isolatedBetaNodes[j]
                      );
                      leftBetaNode.setChildNode(betaNode);
                      isolatedBetaNodes[j].setChildNode(betaNode);
                      visitedBetaNodes.push(betaNode);
                      isolatedBetaNodes.push(betaNode);
                      break;
                    }
                  }
                }
              }
            }
          } else {
            for (let index = 0; index < isolatedBetaNodes.length; index += 1) {
              if (isolatedBetaNodes[index].getChildren().length < 1) {
                // Create a new Beta node
                const betaNode = new BetaNode(
                  leftBetaNode,
                  isolatedBetaNodes[index]
                );
                leftBetaNode.setChildNode(betaNode);
                isolatedBetaNodes[index].setChildNode(betaNode);
                visitedBetaNodes.push(betaNode);
                isolatedBetaNodes.push(betaNode);
                break;
              } else {
                let skip = false;
                for (let j = index + 1; j < isolatedBetaNodes.length; j += 1) {
                  const isolatedBetaChildren =
                    isolatedBetaNodes[index].getChildren();
                  for (let k = 0; k < isolatedBetaChildren.length; k += 1) {
                    const childNode = isolatedBetaChildren[k];
                    if (childNode instanceof BetaNode) {
                      if (
                        childNode.getLeftParent().getID() ===
                          isolatedBetaNodes[j].getID() ||
                        childNode.getRightParent().getID() ===
                          isolatedBetaNodes[j].getID()
                      ) {
                        skip = true;
                        break;
                      }
                    }
                  }
                  if (!skip) {
                    // Create a new Beta node
                    const betaNode = new BetaNode(
                      leftBetaNode,
                      isolatedBetaNodes[j]
                    );
                    leftBetaNode.setChildNode(betaNode);
                    isolatedBetaNodes[j].setChildNode(betaNode);
                    visitedBetaNodes.push(betaNode);
                    isolatedBetaNodes.push(betaNode);
                    break;
                  }
                }
              }
            }
          }
        }
      }

      // Combine Alpha Node with Final Beta Nodes
      if (isolatedAlphaNodes.length > 0) {
        const lastAlpha = isolatedAlphaNodes.shift()!;
        if (isolatedBetaNodes.length > 0) {
          const lastBeta = isolatedBetaNodes.shift()!;
          // Create a new Beta node
          const betaNode = new BetaNode(lastAlpha, lastBeta);
          lastAlpha.setChildNode(betaNode);
          lastBeta.setChildNode(betaNode);
          visitedBetaNodes.push(betaNode);
          isolatedBetaNodes.push(betaNode);
        }
      }

      // Join Two Remaining Beta Nodes if any
      if (isolatedBetaNodes.length > 1) {
        const firstBeta = isolatedBetaNodes.shift()!;
        const secondBeta = isolatedBetaNodes.shift()!;
        // Create a new Beta node
        const betaNode = new BetaNode(firstBeta, secondBeta);
        firstBeta.setChildNode(betaNode);
        secondBeta.setChildNode(betaNode);
        visitedBetaNodes.push(betaNode);
        isolatedBetaNodes.push(betaNode);
      } else if (isolatedBetaNodes.length === 1) {
        // Add Terminal Node
        const finalBeta = isolatedBetaNodes.shift()!;
        finalBeta.addActivity(
          new ActivityNode(actionFrame.getActivity(), finalBeta)
        );
      }
    });
  }

  /**
   * Traverse through the network for available actions
   * @param {Agent} agent - agent where this engine is belong to
   * @return {ActivityNode[]} activities available to perform
   */
  async traverseNetwork(agent: Agent): Promise<ActivityNode[]> {
    // Initialisation
    const availableActions: ActivityNode[] = [];
    const availableNodes: Node[] = [];
    const rootNode: Node = this.getNetwork();
    const beliefSet: Fact = agent.getBeliefs();

    const objects: string[] = Object.keys(beliefSet);
    for (let i = 0; i < objects.length; i += 1) {
      const innerMap = beliefSet[objects[i]];
      const attributes: string[] = Object.keys(innerMap);
      for (let j = 0; j < attributes.length; j += 1) {
        const token: [string, string, any] = [
          objects[i],
          attributes[j],
          innerMap[attributes[j]]
        ];

        // Object Nodes
        let objectNode: ObjNode | null = null;
        for (let k = 0; k < rootNode.getChildren().length; k += 1) {
          const objNode = rootNode.getChildren()[k];
          if (objNode instanceof ObjNode) {
            if (objNode.getObject() === token[0]) {
              objectNode = objNode;
              objectNode.setActive(true);
            }
          }
        }
        if (objectNode === null) {
          break;
        }

        // Alpha Nodes
        const tempAlphaNodes: AlphaNode[] = [];
        for (let k = 0; k < objectNode.getChildren().length; k += 1) {
          const alphaNode = objectNode.getChildren()[k];
          if (alphaNode instanceof AlphaNode) {
            if (alphaNode.getRule().getAttribute() === token[1]) {
              if (alphaNode.getRule().compare(token[0], token[1], token[2])) {
                tempAlphaNodes.push(alphaNode);
              } else {
                alphaNode.setActive(false);
              }
            }
          }
        }
        if (tempAlphaNodes.length < 1) {
          // eslint-disable-next-line no-continue
          continue;
        } else {
          for (let k = 0; k < tempAlphaNodes.length; k += 1) {
            availableNodes.push(tempAlphaNodes[k]);
          }
        }

        while (availableNodes.length > 0) {
          const currNode = availableNodes.shift();

          if (currNode instanceof AlphaNode) {
            const rule = currNode.getRule();
            if (rule.compare(token[0], token[1], token[2])) {
              if (!currNode.isActive()) {
                currNode.setActive(true);
                for (let k = 0; k < currNode.getActivities().length; k += 1) {
                  let activityExists = false;
                  for (let m = 0; m < availableActions.length; m += 1) {
                    if (
                      currNode.getActivities()[k].getID() ===
                      availableActions[m].getID()
                    ) {
                      activityExists = true;
                      break;
                    }
                  }
                  if (!activityExists) {
                    availableActions.push(currNode.getActivities()[k]);
                  }
                }
              }
            } else {
              currNode.setActive(false);
            }
            for (let k = 0; k < currNode.getChildren().length; k += 1) {
              availableNodes.push(currNode.getChildren()[k]);
            }
          }

          if (currNode instanceof BetaNode) {
            if (currNode.isActive()) {
              for (let k = 0; k < currNode.getActivities().length; k += 1) {
                let activityExists = false;
                for (let m = 0; m < availableActions.length; m += 1) {
                  if (
                    currNode.getActivities()[k].getID() ===
                    availableActions[m].getID()
                  ) {
                    activityExists = true;
                    break;
                  }
                }
                if (!activityExists) {
                  availableActions.push(currNode.getActivities()[k]);
                }
              }
              for (let k = 0; k < currNode.getChildren().length; k += 1) {
                availableNodes.push(currNode.getChildren()[k]);
              }
            } else {
              for (let outer = 0; outer < availableActions.length; outer += 1) {
                for (
                  let inner = 0;
                  inner < currNode.getActivities().length;
                  inner += 1
                ) {
                  if (
                    availableActions[outer].getID() ===
                    currNode.getActivities()[inner].getID()
                  ) {
                    availableActions.splice(outer, 1);
                  }
                }
              }
            }
          }
        }
      }
    }
    return this.validateAvailableActions(availableActions);
  }

  /**
   * Filters valid action in which the parent of the activity node is still active.
   * @param availableActions List of available actions from network traversal
   * @returns list of valid available actions
   */
  // eslint-disable-next-line class-methods-use-this
  async validateAvailableActions(
    availableActions: ActivityNode[]
  ): Promise<ActivityNode[]> {
    let validActivity: number[] = [];
    return Promise.all(
      (validActivity = availableActions.map((action, index) => {
        const parentNode = action.getParent();
        if (parentNode.isActive()) {
          return index;
        }
        return -1;
      }))
    ).then(() => {
      return availableActions.filter((_, index) =>
        validActivity.includes(index)
      );
    });
  }
}

export default Engine;
