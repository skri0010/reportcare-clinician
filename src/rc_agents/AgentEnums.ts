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

// IDs of agents
export enum AgentIDs {
  APS = "APS",
  DTA = "DTA",
  UXSA = "UXSA",
  NWA = "NWA",
  ALA = "ALA",
  MHA = "MHA"
}

export const ActionFrameIDs = {
  APS: {
    ASSOCIATE_DATA: "AssociateData",
    REQUEST_ENTRY_DATA: "RequestEntryData"
  },
  DTA: {
    // ADC
    RETRIEVE_ENTRY_DATA: "RetrieveEntryData",
    STORE_ENTRY_DATA: "StoreEntryData",

    // HF-OTP
    RETRIEVE_ROLE_PATIENTS: "RetrieveRolePatients",
    RETRIEVE_PATIENT_DETAILS: "RetrievePatientDetails",
    REQUEST_DETAILS_DISPLAY: "RequestDetailsDisplay",
    RETRIEVE_ALERT_HISTORY: "RetrieveAlertHistory",

    // AT-CP
    RETRIEVE_PENDING_ALERT_COUNT: "RetrievePendingAlertCount",
    REQUEST_PENDING_ALERT_COUNT_DISPLAY: "RequestPendingAlertCountDisplay",
    RETRIEVE_ALERTS: "RetrieveAlerts",
    REQUEST_ALERTS_DISPLAY: "RequestAlertsDisplay",
    RETRIEVE_ALERT_INFO: "RetrieveAlertInfo",
    REQUEST_ALERT_INFO_DISPLAY: "RequestAlertInfoDisplay",

    // SRD: Patient Assignments
    RETRIEVE_PENDING_PATIENT_ASSIGNMENTS: "RetrievePendingPatientAssignments",
    REQUEST_DISPLAY_PENDING_PATIENT_ASSIGNMENTS:
      "RequestDisplayPendingPatientAssignments",
    RESOLVE_PATIENT_ASSIGNMENT: "ResolvePatientAssignment",
    REQUEST_SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS:
      "RequestSyncPatientAssignmentResolutions",

    // SRD: Todos
    CREATE_TODO: "CreateTodo",
    UPDATE_TODO: "UpdateTodo"
  },
  UXSA: {
    // HF-OTP
    RETRIEVE_ROLE: "RetrieveRole",
    DISPLAY_PENDING_PATIENT_ASSIGNMENTS: "DisplayPendingPatientAssignments",
    REQUEST_RETRIEVE_ALL: "RequestRetrieveAll",
    VISUALIZE_PARAMETERS: "VisualizeParameters",

    // AT-CP
    DISPLAY_PENDING_ALERT_COUNT: "DisplayPendingAlertCount",
    DISPLAY_ALERTS: "DisplayAlerts",
    DISPLAY_ALERT_INFO: "DisplayAlertInfo"
  },
  NWA: {
    SYNC_PROTECTED_INFO: "SyncProtectedInfo",
    SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS: "SyncPatientAssignmentResolutions",

    SYNC_NEW_TODOS: "SyncNewTodos",
    SYNC_UDPATED_TODOS: "SyncUpdatedTodos"
  },
  MHA: {},
  ALA: {}
};

// Keys for agents' belief / precondition / fact
export enum BeliefKeys {
  APP = "App",
  PROCEDURE = "Procedure",
  CLINICIAN = "Clinician",
  PATIENT = "Patient"
}

// Attributes commonly shared by agents
export enum CommonAttributes {
  LAST_ACTIVITY = "LastActivity"
}

// Attributes for APP key
export enum AppAttributes {
  CONFIGURED = "Configured",
  ONLINE = "Online",
  PENDING_PROTECTED_INFO_SYNC = "PendingProtectedInfoSync",
  SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS = "SyncPatientAssignmentResolutions",

  PENDING_TODO_INSERT_SYNC = "PendingTodoInsertSync",
  PENDING_TODO_UPDATE_SYNC = "PendingTodoUpdateSync"
}

// Attributes for PROCEDURE key
export enum ProcedureAttributes {
  ADC = "ADC",
  HF_OTP_I = "HF-OTP-I",
  HF_OTP_II = "HF-OTP-II",
  HF_OTP_III = "HF-OTP-III",
  SRD = "SRD",
  AT_CP = "AT-CP"
}

// Attributes for CLINICIAN key
export enum ClinicianAttributes {
  USERNAME = "Username",
  HAS_ENTRY = "HasEntry",
  ENTRY_DATA = "EntryData",
  CONFIGURED = "Configured",
  RETRIEVE_ENTRY = "RetrieveEntry",
  ROLE = "Role",
  RETRIEVE_ROLE = "RetrieveRole",

  // SRD - Alerts
  RETRIEVE_PENDING_ALERT_COUNT = "RetrievePendingAlertCount",
  PENDING_ALERT_COUNT_RETRIEVED = "PendingAlertCountRetrieved",
  ALERT_STATUS = "AlertStatus",
  ALERT_RISK_LEVEL = "AlertRiskLevel",
  RETRIEVE_ALERTS = "RetrieveAlerts",
  ALERTS = "Alerts",
  ALERTS_RETRIEVED = "AlertsRetrieved",
  ALERT = "Alert",
  RETRIEVE_ALERT_INFO = "RetrieveAlertInfo",
  ALERT_INFO = "AlertInfo",
  ALERT_INFO_RETRIEVED = "AlertInfoRetrieved",

  // SRD - Todos
  NEW_TODO = "NewTodo",
  EDIT_TODO = "EditTodo",
  TODO = "Todo"
}

// Attributes for PATIENT key
export enum PatientAttributes {
  RETRIEVE_ALL = "RetrieveAll",
  ALL = "All",
  RETRIEVE_DETAILS = "RetrieveDetails",
  DETAILS_RETRIEVED = "DetailsRetrieved",
  VIEW_DETAILS = "ViewDetails",
  DETAILS = "Details",

  // SRD - Patient Assignments
  PENDING_PATIENT_ASSIGNMENTS = "PendingPatientAssignments",
  RETRIEVE_PENDING_PATIENT_ASSIGNMENTS = "RetrievePendingPatientAssignments",
  PENDING_PATIENT_ASSIGNMENTS_RETRIEVED = "PendingPatientAssignmentsRetrieved",
  DISPLAY_PENDING_ASSIGNMENTS_REQUESTED = "DisplayPendingAssignmentsRequested",
  PATIENT_ASSIGNMENT_RESOLUTION = "PatientAssignmentResolution",
  PATIENT_ASSIGNMENT_RESOLVED = "PatientAssignmentResolved",
  RESOLVE_PATIENT_ASSIGNMENT = "ResolvePatientAssignment",

  // SRD - Alerts
  ALERT_PATIENT_ID = "AlertPatientId",
  RETRIEVE_ALERT_HISTORY = "RetrieveAlertHistory",
  ALERT_HISTORY = "AlertHistory"
}
