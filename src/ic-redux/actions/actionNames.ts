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

  // Patient Assignments
  SET_FETCHING_PENDING_PATIENT_ASSIGNMENTS:
    "SET_FETCHING_PENDING_PATIENT_ASSIGNMENTS",
  SET_PENDING_PATIENT_ASSIGNMENTS: "SET_PENDING_PATIENT_ASSIGNMENTS",
  SET_PATIENT_ASSIGNMENTS_SYNCED: "SET_PATIENT_ASSIGNMENTS_SYNCED",
  SET_PATIENT_REQUESTS_SYNCED: "SET_PATIENT_REQUESTS_SYNCED",

  // Alerts
  SET_PENDING_ALERT_COUNT: "SET_PENDING_ALERT_COUNT",
  SET_ALERTS: "SET_ALERTS",
  SET_ALERT_INFO: "SET_ALERT_INFO",
  SET_FETCHING_PENDING_ALERTS: "SET_FETCHING_PENDING_ALERTS",
  SET_FETCHING_COMPLETED_ALERTS: "SET_FETCHING_COMPLETED_ALERTS",
  SET_PENDING_ALERTS: "SET_PENDING_ALERTS",
  SET_COMPLETED_ALERTS: "SET_COMPLETED_ALERTS",

  // Todo
  SET_FETCHING_TODOS: "SET_FETCHING_TODOS",
  SET_PENDING_TODOS: "SET_PENDING_TODOS",
  SET_COMPLETED_TODOS: "SET_COMPLETED_TODOS",
  SET_SUBMITTING_TODO: "SET_SUBMITTING_TODO",
  SET_UPDATED_TODO: "SET_UPDATED_TODO",

  // Others
  SET_PATIENT_RISK_FILTERS: "SET_PATIENT_RISK_FILTERS",
  SET_ALERT_RISK_FILTERS: "SET_ALERT_RISK_FILTERS"
} as const;

// DO NOT REMOVE "as const", this is necessary for TypeScript checking
