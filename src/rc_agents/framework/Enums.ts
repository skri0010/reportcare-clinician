// Constant values for the state of activity
export enum ActivityStatus {
  INACTIVE = "inactive",
  RUNNING = "running",
  COMPLETE = "complete"
}

// Constant values for the state of action frames
export enum AframeStatus {
  INACTIVE = "inactive",
  RUNNING = "running",
  COMPLETE = "complete"
}

// Constant values for the comparison operators
export enum CompOperator {
  EQUAL = "equal",
  NOT_EQUAL = "not-equal",
  LESS_THAN = "less-than",
  GREATER_THAN = "greater-than",
  LESS_THAN_EQUAL = "less-than-equal",
  GREATER_THAN_EQUAL = "greater-than-equal"
}

// Constant values for the performative of the message
export enum Performative {
  REQUEST = "request",
  INFORM = "inform"
}

// Constant values for the procedure
export enum ProcedureConst {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

// Attributes commonly shared by agents
export enum CommonAttributes {
  LAST_ACTIVITY = "LastActivity"
}
