export const actionNames = {
  SET_COLOUR_SCHEME: "SET_COLOUR_SCHEME",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_FONT_SCHEME: "SET_FONT_SCHEME",

  // Agents
  SET_PROCEDURE_ONGOING: "SET_PROCEDURE_ONGOING",
  SET_PROCEDURE_SUCCESSFUL: "SET_PROCEDURE_SUCCESSFUL",
  SET_PATIENTS: "SET_PATIENTS",
  SET_PATIENT_DETAILS: "SET_PATIENT_DETAILS",
  SET_PATIENT_ASSIGNMENTS_SYNCED: "SET_PATIENT_ASSIGNMENTS_SYNCED",
  SET_PATIENT_REQUESTS_SYNCED: "SET_PATIENT_REQUESTS_SYNCED",
  SET_NEW_HIGH_RISK_ALERTS: "SET_NEW_HIGH_RISK_ALERTS",
  SET_NEW_MEDIUM_RISK_ALERTS: "SET_NEW_MEDIUM_RISK_ALERTS",
  SET_NEW_LOW_RISK_ALERTS: "SET_NEW_LOW_RISK_ALERTS",
  SET_NEW_UNASSIGNED_RISK_ALERTS: "SET_NEW_UNASSIGNED_RISK_ALERTS"
} as const;

// DO NOT REMOVE "as const", this is necessary for TypeScript checking
