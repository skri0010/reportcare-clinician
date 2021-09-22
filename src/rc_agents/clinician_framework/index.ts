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

    // AT-CP-I: AlertInfo[]
    RETRIEVE_ALERTS: "RetrieveAlerts",
    REQUEST_DISPLAY_ALERTS: "RequestDisplayAlerts",

    // AT-CP-II: Detailed AlertInfo
    RETRIEVE_DETAILED_ALERT_INFO: "RetrieveDetailedAlertInfo",
    REQUEST_DISPLAY_DETAILED_ALERT_INFO: "RequestDisplayDetailedAlertInfo",
    UPDATE_ALERT: "UpdateAlert",

    // HF-OTP-I: ClinicianInfo and all patients (PatientInfo)
    REQUEST_RETRIEVE_ROLE: "RequestRetrieveRole",
    RETRIEVE_PATIENTS_BY_ROLE: "RetrievePatientsByRole",
    REQUEST_DISPLAY_PATIENTS: "RequestDisplayPatients",
    CONFIGURE_PATIENT: "ConfigurePatient",

    // HF-OTP-II: Single patient's details
    RETRIEVE_PATIENT_DETAILS: "RetrievePatientDetails",
    REQUEST_DISPLAY_PATIENT_DETAILS: "RequestDisplayPatientDetails",

    RETRIEVE_ALERT_HISTORY: "RetrieveAlertHistory",
    REQUEST_DISPLAY_ALERT_HISTORY: "RequestDisplayAlertHistory",

    // SRD-I: Patient Assignments
    RETRIEVE_PENDING_PATIENT_ASSIGNMENTS: "RetrievePendingPatientAssignments",
    REQUEST_DISPLAY_PENDING_PATIENT_ASSIGNMENTS:
      "RequestDisplayPendingPatientAssignments",
    RESOLVE_PATIENT_ASSIGNMENT: "ResolvePatientAssignment",
    REQUEST_SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS:
      "RequestSyncPatientAssignmentResolutions",
    PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTION:
      "ProcessPatientAssignmentSubscription",

    // SRD-II: Todos
    RETRIEVE_TODOS: "RetrieveTodos",
    CREATE_TODO: "CreateTodo",
    UPDATE_TODO: "UpdateTodo",
    REQUEST_DISPLAY_TODOS: "RequestDisplayTodos",

    // SRD-III: Todo Details
    RETRIEVE_TODO_DETAILS: "RetrieveTodoDetails",
    REQUEST_DISPLAY_TODO_DETAILS: "RequestDisplayTodoDetails",
    // SRD-IV: Clinician Contacts
    RETRIEVE_CLINICIAN_CONTACTS: "RetrieveClinicianContacts",
    REQUEST_DISPLAY_CLINICIAN_CONTACTS: "RequestDisplayClinicianContacts"
  },
  UXSA: {
    // AT-CP-I: AlertInfo[]
    DISPLAY_ALERTS: "DisplayAlerts",

    // AT-CP-II: Detailed AlertInfo
    DISPLAY_DETAILED_ALERT_INFO: "DisplayDetailedAlertInfo",

    // AT-CP-III: Alert Notifications and refreshed AlertInfo[]
    DISPLAY_REFRESHED_ALERTS: "DisplayRefreshedAlerts",

    // HF-OTP-I: ClinicianInfo and all patients (PatientInfo)
    RETRIEVE_ROLE: "RetrieveRole",
    REQUEST_RETRIEVE_PATIENTS: "RequestRetrievePatients",
    DISPLAY_PATIENTS_BY_FILTER: "DisplayPatientsByFilter",

    // HF-OTP-II: Single patient's details
    VISUALIZE_PARAMETERS: "VisualizeParameters",
    DISPLAY_ALERT_HISTORY: "DisplayAlertHistory",

    // SRD-I: Patient Assignments
    DISPLAY_PENDING_PATIENT_ASSIGNMENTS: "DisplayPendingPatientAssignments",

    // SRD-II: Todos
    DISPLAY_TODOS: "DisplayTodos",

    // SRD -III : Todo Details
    DISPLAY_TODO_DETAILS: "DisplayTodoDetails",

    // SRD-IV Clinician Contacts
    DISPLAY_CLINICIAN_CONTACTS: "DisplayClinicianContacts"
  },
  NWA: {
    SYNC_PROTECTED_INFO: "SyncProtectedInfo",

    // HF-OTP-II: Patient Configuration
    SYNC_CONFIGURE_PATIENTS: "SyncConfigurePatients",

    // SRD-I: Patient Assignments
    SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS: "SyncPatientAssignmentResolutions",
    SYNC_PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTIONS:
      "SyncProcessPatientAssignmentSubscriptions",

    // SRD-II: Todos
    SYNC_CREATE_TODOS: "SyncCreateTodos",
    SYNC_UPDATE_TODOS: "SyncUpdateTodos",

    // AT-CP-II: Detailed AlertInfo
    SYNC_UPDATE_ALERTS: "SyncUpdateAlerts",

    // AT_CP_III: Alert Notifications and refreshed AlertInfo[]
    SYNC_PROCESS_ALERT_NOTIFICATIONS: "SyncProcessAlertNotifications"
  },
  MHA: {},
  ALA: {
    // AT_CP_III: Alert Notifications and refreshed AlertInfo[]
    PROCESS_ALERT_NOTIFICATION: "ProcessAlertNotification",
    REQUEST_DISPLAY_REFRESHED_ALERTS: "RequestDisplayRefreshedAlerts"
  }
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
  SYNC_CONFIGURE_PATIENTS = "SyncConfigurePatients",
  SYNC_CREATE_TODOS = "SyncCreateTodos",
  SYNC_UPDATE_TODOS = "SyncUpdateTodos",
  SYNC_UPDATE_ALERTS = "SyncUpdateAlerts",
  SYNC_PROCESS_ALERT_NOTIFICATIONS = "SyncProcessAlertNotifications",
  SYNC_PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTIONS = "SyncProcessPatientAssignmentSubscriptions"
}

// Attributes for PROCEDURE key
export enum ProcedureAttributes {
  ADC = "ADC",
  HF_OTP_I = "HF-OTP-I",
  HF_OTP_II = "HF-OTP-II",
  SRD_I = "SRD-I",
  SRD_II = "SRD-II",
  SRD_III = "SRD-III",
  SRD_IV = "SRD-IV",
  SRD_V = "SRD-V",
  AT_CP_I = "AT-CP-I",
  AT_CP_II = "AT-CP-II",
  AT_CP_III = "AT-CP-III"
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

  // SRD-III - Todo Details
  RETRIEVE_TODO_DETAILS = "RetrieveTodoDetails",
  TODO_DETAILS = "TodoDetails",
  DISPLAY_TODO_DETAILS = "DisplayTodoDetails",
  TODO_DETAILS_RETRIEVED = "TodoDetailsRetrieved",
  TODO_ID = "TodoId",

  // AT-CP-I: AlertInfo[]
  FETCH_ALERTS_MODE = "FetchAlertsMode",
  ALERT_RISK_LEVEL = "AlertRiskLevel",

  RETRIEVE_ALERTS = "RetrieveAlerts",
  RETRIEVE_ALERTS_LOCALLY = " RetrieveAlertsLocally",
  ALERTS = "Alerts",
  PENDING_ALERTS = "PendingAlerts",
  PENDING_ALERTS_COUNT = "PendingAlertsCount",
  COMPLETED_ALERTS = "CompletedAlerts",
  ALERTS_RETRIEVED = "AlertsRetrieved",

  // AT-CP-II: Detailed AlertInfo
  ALERT_INFO = "AlertInfo",
  DETAILED_ALERT_INFO = "DetailedAlertInfo",
  RETRIEVE_DETAILED_ALERT_INFO = "RetrieveDetailedAlertInfo",
  DETAILED_ALERT_INFO_RETRIEVED = "DetailedAlertInfoRetrieved",
  UPDATE_ALERT = "UpdateAlert",
  ALERTS_UPDATED = "AlertsUpdated",

  // AT_CP_III: Alert Notifications and refreshed AlertInfo[]
  ALERT_NOTIFICATION = "AlertNotification",
  PROCESS_ALERT_NOTIFICATION = "ProcessAlertNotification",
  REFRESHED_PENDING_ALERTS = "RefreshedPendingAlerts",
  REFRESHED_COMPLETED_ALERTS = "RefreshedCompletedAlerts",
  REFRESHED_ALERTS_RETRIEVED = "RefreshedAlertsRetrieved",

  // SRD-II - Todos
  RETRIEVE_TODOS = "RetrieveTodos",
  TODOS = "Todos",
  TODO_STATUS = "TodoStatus",
  CREATE_TODO = "CreateTodo",
  UPDATE_TODO = "UpdateTodo",
  TODO = "Todo",
  TODOS_UPDATED = "TodosUpdated",
  DISPLAY_TODOS = "DisplayTodos",
  ALERT_TODO = "AlertTodo",

  //SRD-IV - Clinician Contacts
  RETRIEVE_CLINICIAN_CONTACTS = "RetrieveClinicianContacts",
  CLINICIAN_CONTACTS_RETRIEVED = "ClinicianContactsRetrieved",
  CLINICIAN_CONTACTS = "ClinicianContacts"
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
  PATIENT_ALERT_HISTORY_RETRIEVED = "PatientAlertHistoryRetrieved",
  PATIENT_TO_CONFIGURE = "PatientToConfigure",
  CONFIGURE_PATIENT = "ConfigurePatient",

  // SRD-I: Patient Assignments
  PENDING_PATIENT_ASSIGNMENTS = "PendingPatientAssignments",
  RETRIEVE_PENDING_PATIENT_ASSIGNMENTS = "RetrievePendingPatientAssignments",
  PENDING_PATIENT_ASSIGNMENTS_RETRIEVED = "PendingPatientAssignmentsRetrieved",
  PATIENT_ASSIGNMENT_RESOLUTION = "PatientAssignmentResolution",
  PATIENT_ASSIGNMENT_RESOLVED = "PatientAssignmentResolved",
  RESOLVE_PATIENT_ASSIGNMENT = "ResolvePatientAssignment",
  PATIENT_ASSIGNMENT_SUBSCRIPTION = "PatientAssignmentSubscription",
  PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTION = "ProcessPatientAssignmentSubscription",

  // AT-CP: Alerts
  ALERT_PATIENT_ID = "AlertPatientId",
  RETRIEVE_ALERT_HISTORY = "RetrieveAlertHistory",
  ALERT_HISTORY = "AlertHistory"
}
