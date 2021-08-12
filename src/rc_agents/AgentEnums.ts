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

    // HF-OTP-I: ClinicianInfo and all PatientInfo
    RETRIEVE_ALL_PATIENT_INFO_BY_ROLE: "RetrieveAllPatientInfoByRole",
    REQUEST_DISPLAY_ALL_PATIENT_INFO: "RequestDisplayAllPatientInfo",

    // HF-OTP-II: Single patient's details
    RETRIEVE_PATIENT_DETAILS: "RetrievePatientDetails",
    REQUEST_DISPLAY_PATIENT_DETAILS: "RequestDisplayPatientDetails",

    RETRIEVE_ALERT_HISTORY: "RetrieveAlertHistory",

    // AT-CP: Alerts
    RETRIEVE_PENDING_ALERT_COUNT: "RetrievePendingAlertCount",
    REQUEST_PENDING_ALERT_COUNT_DISPLAY: "RequestPendingAlertCountDisplay",
    RETRIEVE_ALERTS: "RetrieveAlerts",
    REQUEST_ALERTS_DISPLAY: "RequestAlertsDisplay",
    RETRIEVE_ALERT_INFO: "RetrieveAlertInfo",
    REQUEST_ALERT_INFO_DISPLAY: "RequestAlertInfoDisplay",

    // SRD-I: Patient Assignments
    RETRIEVE_PENDING_PATIENT_ASSIGNMENTS: "RetrievePendingPatientAssignments",
    REQUEST_DISPLAY_PENDING_PATIENT_ASSIGNMENTS:
      "RequestDisplayPendingPatientAssignments",
    RESOLVE_PATIENT_ASSIGNMENT: "ResolvePatientAssignment",
    REQUEST_SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS:
      "RequestSyncPatientAssignmentResolutions",

    // SRD-II: Todos
    CREATE_TODO: "CreateTodo",
    UPDATE_TODO: "UpdateTodo"
  },
  UXSA: {
    // HF-OTP-I: ClinicianInfo and all PatientInfo
    RETRIEVE_ROLE: "RetrieveRole",
    REQUEST_RETRIEVE_ALL_PATIENT_INFO: "RequestRetrieveAllPatientInfo",

    // HF-OTP-II: Single patient's details
    VISUALIZE_PARAMETERS: "VisualizeParameters",

    // SRD-I: Patient Assignments
    DISPLAY_PENDING_PATIENT_ASSIGNMENTS: "DisplayPendingPatientAssignments",

    // AT-CP
    DISPLAY_PENDING_ALERT_COUNT: "DisplayPendingAlertCount",
    DISPLAY_ALERTS: "DisplayAlerts",
    DISPLAY_ALERT_INFO: "DisplayAlertInfo"
  },
  NWA: {
    SYNC_PROTECTED_INFO: "SyncProtectedInfo",

    // SRD-I - Patient Assignments
    SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS: "SyncPatientAssignmentResolutions",

    // SRD-II - Todos
    SYNC_TODOS_CREATE: "SyncTodosCreate",
    SYNC_TODOS_UPDATE: "SyncTodosUpdate",
    SYNC_ALERTS_UPDATE: "SyncAlertsUpdate"
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
  SYNC_PROTECTED_INFO = "SyncProtectedInfo",
  SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS = "SyncPatientAssignmentResolutions",
  SYNC_TODOS_CREATE = "SyncTodosCreate",
  SYNC_TODOS_UPDATE = "SyncTodosUpdate",
  SYNC_ALERTS_UPDATE = "SyncAlertsUpdate"
}

// Attributes for PROCEDURE key
export enum ProcedureAttributes {
  ADC = "ADC",
  HF_OTP_I = "HF-OTP-I",
  HF_OTP_II = "HF-OTP-II",
  SRD_I = "SRD-I",
  SRD_II = "SRD-II",
  AT_CP = "AT-CP"
}

// Attributes for CLINICIAN key
export enum ClinicianAttributes {
  USERNAME = "Username",
  HAS_ENTRY = "HasEntry",
  ENTRY_DATA = "EntryData",
  CONFIGURED = "Configured",
  RETRIEVE_ENTRY = "RetrieveEntry",

  // HF-OTP-I: ClinicianInfo and all PatientInfo
  ROLE = "Role",
  RETRIEVE_ROLE = "RetrieveRole",
  ROLE_RETRIEVED = "RoleRetrieved",

  // AT-CP: Alerts
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

  // SRD-II - Todos
  CREATE_TODO = "CreateTodo",
  UPDATE_TODO = "UpdateTodo",
  TODO = "Todo"
}

// Attributes for PATIENT key
export enum PatientAttributes {
  // HF-OTP-I: ClinicianInfo and all PatientInfo
  RETRIEVE_ALL_PATIENT_INFO = "RetrieveAllPatientInfo",
  ALL_PATIENT_INFO = "AllPatientInfo",
  ALL_PATIENT_INFO_RETRIEVED = "AllPatientInfoRetrieved",

  // HF-OTP-II: Single patient's details
  PATIENT_TO_VIEW_DETAILS = "ViewPatientDetailsWithPatientId",
  RETRIEVE_PATIENT_DETAILS = "RetrievePatientDetails",
  PATIENT_DETAILS_RETRIEVED = "PatientDetailsRetrieved",
  DISPLAY_PATIENT_DETAILS_REQUESTED = "DisplayPatientDetailsRequested",
  PATIENT_DETAILS = "PatientDetails",

  // SRD-I: Patient Assignments
  PENDING_PATIENT_ASSIGNMENTS = "PendingPatientAssignments",
  RETRIEVE_PENDING_PATIENT_ASSIGNMENTS = "RetrievePendingPatientAssignments",
  PENDING_PATIENT_ASSIGNMENTS_RETRIEVED = "PendingPatientAssignmentsRetrieved",
  PATIENT_ASSIGNMENT_RESOLUTION = "PatientAssignmentResolution",
  PATIENT_ASSIGNMENT_RESOLVED = "PatientAssignmentResolved",
  RESOLVE_PATIENT_ASSIGNMENT = "ResolvePatientAssignment",

  // AT-CP: Alerts
  ALERT_PATIENT_ID = "AlertPatientId",
  RETRIEVE_ALERT_HISTORY = "RetrieveAlertHistory",
  ALERT_HISTORY = "AlertHistory"
}
