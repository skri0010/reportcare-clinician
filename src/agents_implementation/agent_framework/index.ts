export { default as Actionframe } from "./base/Actionframe";
export { default as Activity } from "./base/Activity";
export { default as Agent } from "./base/Agent";
export { default as Belief } from "./base/Belief";
export { default as Broadcast } from "./base/Broadcast";
export { default as Communicate } from "./base/Communicate";
export { default as Precondition } from "./base/Precondition";
export { default as agentAPI } from "./AgentAPI";

export const setRetryLaterTimeout = (func: () => void): void => {
  const delay = 15;
  setTimeout(func, delay);
};
