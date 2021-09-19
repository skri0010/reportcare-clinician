export const actionNames = {
  SET_COLOUR_SCHEME: "SET_COLOUR_SCHEME",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_FONT_SCHEME: "SET_FONT_SCHEME",

  // Agents
  SET_PROCEDURE_ONGOING: "SET_PROCEDURE_ONGOING",
  SET_PROCEDURE_SUCCESSFUL: "SET_PROCEDURE_SUCCESSFUL",

  // Patients and patient details
  SET_PATIENTS: "SET_PATIENTS",
  SET_PATIENT_DETAILS: "SET_PATIENT_DETAILS",
  SET_FETCHING_PATIENTS: "SET_FETCHING_PATIENTS",
  SET_FETCHING_PATIENT_DETAILS: "SET_FETCHING_PATIENT_DETAILS",
  SET_FETCHING_PATIENT_ALERT_HISTORY: "SET_FETCHING_PATIENT_ALERT_HISTORY",
  SET_ALERT_HISTORY: "SET_ALERT_HISTORY",
  SET_CREATING_MEDICAL_RECORD: "SET_CREATING_MEDICAL_RECORD",
  SET_CREATE_MEDICAL_RECORD_SUCCESSFUL: "SET_CREATE_MEDICAL_RECORD_SUCCESSFUL",

  // Clinicians
  SET_CLINICIAN_CONTACTS: "SET_CLINICIAN_CONTACTS",
  SET_FETCHING_CLINICIAN_CONTACTS: "SET_FETCHING_CLINICIAN_CONTACTS",
  SET_CLINICIAN_SELECTED: "SET_CLINICIAN_SELECTED",

  // Patient Configuration
  SET_CONFIGURING_PATIENT: "SET_CONFIGURING_PATIENT",
  SET_CONFIGURATION_SUCCESSFUL: "SET_CONFIGURATION_SUCCESSFUL",

  // Patient Assignments
  SET_FETCHING_PENDING_PATIENT_ASSIGNMENTS:
    "SET_FETCHING_PENDING_PATIENT_ASSIGNMENTS",
  SET_PENDING_PATIENT_ASSIGNMENTS: "SET_PENDING_PATIENT_ASSIGNMENTS",
  SET_PATIENT_ASSIGNMENTS_SYNCED: "SET_PATIENT_ASSIGNMENTS_SYNCED",
  SET_PATIENT_REQUESTS_SYNCED: "SET_PATIENT_REQUESTS_SYNCED",

  // Alerts
  SET_PENDING_ALERT_COUNT: "SET_PENDING_ALERT_COUNT",
  SET_ALERTS: "SET_ALERTS",
  SET_FETCHING_ALERT_INFO: "SET_FETCHING_ALERT_INFO",
  SET_ALERT_INFO: "SET_ALERT_INFO",
  SET_FETCHING_ALERTS: "SET_FETCHING_ALERTS",
  SET_FETCHING_PENDING_ALERTS: "SET_FETCHING_PENDING_ALERTS",
  SET_FETCHING_COMPLETED_ALERTS: "SET_FETCHING_COMPLETED_ALERTS",
  SET_UPDATING_ALERT_INDICATORS: "SET_UPDATING_ALERT_INDICATORS",
  SET_PENDING_ALERTS: "SET_PENDING_ALERTS",
  SET_COMPLETED_ALERTS: "SET_COMPLETED_ALERTS",

  // Todo
  SET_FETCHING_TODOS: "SET_FETCHING_TODOS",
  SET_PENDING_TODOS: "SET_PENDING_TODOS",
  SET_COMPLETED_TODOS: "SET_COMPLETED_TODOS",
  SET_SUBMITTING_TODO: "SET_SUBMITTING_TODO",
  SET_UPDATED_TODO: "SET_UPDATED_TODO",
  SET_TODO_DETAILS: "SET_TODO_DETAILS",
  SET_FETCHING_TODO_DETAILS: "SET_FETCHING_TODO_DETAILS",

  // Others
  SET_PATIENT_RISK_FILTERS: "SET_PATIENT_RISK_FILTERS",
  SET_ALERT_RISK_FILTERS: "SET_ALERT_RISK_FILTERS"
} as const;

// DO NOT REMOVE "as const", this is necessary for TypeScript checking
