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
  ALA = "ALA"
}

export const ActionFrameIDs = {
  APS: {
    ASSOCIATE_DATA: "AssociateData",
    REQUEST_ENTRY_DATA: "RequestEntryData"
  },
  DTA: {
    RETRIEVE_ENTRY_DATA: "RetrieveEntryData",
    STORE_ENTRY_DATA: "StoreEntryData",
    RETRIEVE_ROLE_PATIENTS: "RetrieveRolePatients",
    RETRIEVE_PATIENT_DETAILS: "RetrievePatientDetails",
    REQUEST_DETAILS_DISPLAY: "RequestDetailsDisplay",
    RESOLVE_PATIENT_ASSIGNMENT: "ResolvePatientAssignment"
  },
  UXSA: {
    RETRIEVE_ROLE: "RetrieveRole",
    REQUEST_RETRIEVE_ALL: "RequestRetrieveAll",
    VISUALIZE_PARAMETERS: "VisualizeParameters"
  },
  NWA: {
    SYNC_PROTECTED_INFO: "SyncProtectedInfo",
    SYNC_PATIENT_ASSIGNMENT: "SyncPatientAssignment"
  }
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
  PENDING_PATIENT_ASSIGNMENT = "PendingPatientAssignmentSync"
}

// Attributes for PROCEDURE key
export enum ProcedureAttributes {
  ADC = "ADC",
  HF_OTP_I = "HF-OTP-I",
  HF_OTP_II = "HF-OTP-II",
  SRD = "SRD"
}

// Attributes for CLINICIAN key
export enum ClinicianAttributes {
  USERNAME = "Username",
  HAS_ENTRY = "HasEntry",
  ENTRY_DATA = "EntryData",
  CONFIGURED = "Configured",
  RETRIEVE_ENTRY = "RetrieveEntry",
  ROLE = "Role",
  RETRIEVE_ROLE = "RetrieveRole"
}

// Attributes for PATIENT key
export enum PatientAttributes {
  RETRIEVE_ALL = "RetrieveAll",
  ALL = "All",
  RETRIEVE_DETAILS = "RetrieveDetails",
  DETAILS_RETRIEVED = "DetailsRetrieved",
  VIEW_DETAILS = "ViewDetails",
  DETAILS = "Details",
  RESOLVE_PATIENT_ASSIGNMENT = "ResolvePatientAssignment",
  PENDING_RESOLVE_PATIENT_ASSIGNMENT = "PendingResolvePatientAssignment",
  UPDATE_SUCCESSFUL = "UpdateSuccessful"
}

// Keys for locally storing data in AsyncStorage
export enum AsyncStorageKeys {
  CLINICIAN_ID = "ClinicianID",
  SIGN_UP_DETAILS = "SignUpDetails",
  USERNAME = "Username",
  CLINICIAN = "Clinician",
  PATIENTS = "Patients",
  PATIENT_ASSIGNMENT_RESOLUTIONS = "PatientAssignmentResolutions"
}
