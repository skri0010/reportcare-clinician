export const setRetryLaterTimeout = (func: () => void): void => {
  const delay = 15000;
  setTimeout(func, delay);
};

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

    // HF-OTP-I: ClinicianInfo and all patients (PatientInfo)
    REQUEST_RETRIEVE_ROLE: "RequestRetrieveRole",
    RETRIEVE_PATIENTS_BY_ROLE: "RetrievePatientsByRole",
    REQUEST_DISPLAY_PATIENTS: "RequestDisplayPatients",

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
    RETRIEVE_TODOS: "RetrieveTodos",
    CREATE_TODO: "CreateTodo",
    UPDATE_TODO: "UpdateTodo",
    REQUEST_DISPLAY_TODOS: "RequestDisplayTodos"
  },
  UXSA: {
    // HF-OTP-I: ClinicianInfo and all patients (PatientInfo)
    RETRIEVE_ROLE: "RetrieveRole",
    REQUEST_RETRIEVE_PATIENTS: "RequestRetrievePatients",
    DISPLAY_PATIENTS_BY_FILTER: "DisplayPatientsByFilter",

    // HF-OTP-II: Single patient's details
    VISUALIZE_PARAMETERS: "VisualizeParameters",

    // SRD-I: Patient Assignments
    DISPLAY_PENDING_PATIENT_ASSIGNMENTS: "DisplayPendingPatientAssignments",

    // SRD-II: Todos
    DISPLAY_TODOS: "DisplayTodos",

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

  // HF-OTP-I: ClinicianInfo and all patients (PatientInfo)
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
  RETRIEVE_TODOS = "RetrieveTodos",
  TODOS = "Todos",
  TODO_STATUS = "TodoStatus",
  CREATE_TODO = "CreateTodo",
  UPDATE_TODO = "UpdateTodo",
  TODO = "Todo",
  TODOS_UPDATED = "TodosUpdated",
  DISPLAY_TODOS = "DisplayTodos"
}

// Attributes for PATIENT key
export enum PatientAttributes {
  // HF-OTP-I: ClinicianInfo and all patients (PatientInfo)
  RETRIEVE_PATIENTS = "RetrievePatients",
  PATIENTS = "Patients",
  PATIENTS_RETRIEVED = "PatientsRetrieved",

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
