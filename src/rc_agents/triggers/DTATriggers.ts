import { ClinicianRecord, PatientAssignment, PatientInfo } from "aws/API";
import {
  BeliefKeys,
  ClinicianAttributes,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentDTA } from "rc_agents/agents";
import { Belief } from "agents-framework";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  AlertInfo,
  FetchAlertsMode,
  PatientAssignmentResolution,
  TodoInput,
  TodoStatus,
  MedInput,
  ClinicianRecordInput
} from "rc_agents/model";

// HF-OTP-II
// Triggers RetrievePatientDetails of DTA
export const triggerRetrievePatientDetails = (
  patient: PatientInfo,
  retrieveLocally = false
): void => {
  // Add patient as fact, no broadcast
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.PATIENT_TO_VIEW_DETAILS,
      patient
    ),
    false
  );

  // Add belief to retrieve locally
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.RETRIEVE_PATIENT_DETAILS_LOCALLY,
      retrieveLocally
    ),
    false
  );

  // Set preconditions
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.RETRIEVE_PATIENT_DETAILS,
      true
    )
  );

  // Broadcast active procedure
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.HF_OTP_II,
      ProcedureConst.ACTIVE
    )
  );
};

// SRD-I
// Triggers RetrievePendingAssignments of DTA
export const triggerRetrievePendingAssignments = (): void => {
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
      true
    )
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.SRD_I,
      ProcedureConst.ACTIVE
    )
  );
};

// SRD-V: Triggers ProcessPatientAssignmentSubscription of DTA
export const triggerProcessPatientAssignmentSubscription = (
  patientAssignmentSubscription: PatientAssignment
): void => {
  // Adds input to facts
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.PATIENT_ASSIGNMENT_SUBSCRIPTION,
      patientAssignmentSubscription
    ),
    false
  );
  // Triggers DTA to process subscription
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTION,
      true
    )
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.SRD_V,
      ProcedureConst.ACTIVE
    )
  );
};

// Triggers ResolvePendingAssignments of DTA
export const triggerResolvePendingAssignments = (
  patientAssignmentResolution: PatientAssignmentResolution
): void => {
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.RESOLVE_PATIENT_ASSIGNMENT,
      true
    )
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.PATIENT_ASSIGNMENT_RESOLUTION,
      patientAssignmentResolution
    ),
    false
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.SRD_I,
      ProcedureConst.ACTIVE
    )
  );
};

// MRDC: Triggers StoreBaseline of DTA
export const triggerStorePatientBaseline = (
  patientInput: PatientInfo,
  medInput: MedInput[]
): void => {
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.PATIENT_TO_CONFIGURE,
      patientInput
    ),
    false
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.MEDICATION_TO_CONFIGURE,
      medInput
    ),
    false
  );

  agentDTA.addBelief(
    new Belief(BeliefKeys.PATIENT, PatientAttributes.STORE_BASELINE, true)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.MRDC,
      ProcedureConst.ACTIVE
    )
  );
};

// SRD-II: Triggers RetrieveTodos of DTA
export const triggerRetrieveTodos = (status: TodoStatus): void => {
  agentAPI.addFact(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODO_STATUS, status),
    false
  );
  agentDTA.addBelief(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_TODOS, true)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.SRD_II,
      ProcedureConst.ACTIVE
    )
  );
};

// SRD-II: Triggers CreateTodo of DTA
export const triggerCreateTodo = (input: TodoInput): void => {
  agentAPI.addFact(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODO, input),
    false
  );
  agentDTA.addBelief(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.CREATE_TODO, true)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.SRD_III,
      ProcedureConst.ACTIVE
    )
  );
};

// SRD-II: Triggers UpdateTodo of DTA
export const triggerUpdateTodo = (input: TodoInput): void => {
  agentAPI.addFact(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODO, input),
    false
  );
  agentDTA.addBelief(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.UPDATE_TODO, true)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.SRD_III,
      ProcedureConst.ACTIVE
    )
  );
};

// P-USOR-I: Trigger RetriveAlerts of DTA
export const triggerRetrieveAlerts = (
  fetchAlertsMode: FetchAlertsMode,
  retrieveAlertsLocally = false
): void => {
  agentAPI.addFact(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.FETCH_ALERTS_MODE,
      fetchAlertsMode
    ),
    false
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.RETRIEVE_ALERTS_LOCALLY,
      retrieveAlertsLocally
    ),
    false
  );

  // P-USOR: Trigger DTA to retrieve alerts
  agentDTA.addBelief(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_ALERTS, true)
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.P_USOR_I,
      ProcedureConst.ACTIVE
    )
  );
};

// P-USOR-II Triggers RetrieveDetailedAlertInfo of DTA
export const triggerRetrieveDetailedAlertInfo = (
  alertInfo: AlertInfo
): void => {
  // Add alert as facts
  agentAPI.addFact(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERT_INFO, alertInfo),
    false
  );

  agentDTA.addBelief(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.RETRIEVE_DETAILED_ALERT_INFO,
      true
    )
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.P_USOR_II,
      ProcedureConst.ACTIVE
    )
  );
};

// HF-OTP-II Triggers retrieval of historical alerts according to patient ID
export const triggerGetHistoricalAlerts = (patientId: string): void => {
  // Add patient ID as fact
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.ALERT_PATIENT_ID,
      patientId
    ),
    false
  );
  // Set preconditions
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.RETRIEVE_ALERT_HISTORY,
      true
    )
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.HF_OTP_II,
      ProcedureConst.ACTIVE
    )
  );
};
// SRD-IV: Triggers RetrieveClinicianContacts of DTA
export const triggerRetrieveClinicianContacts = (): void => {
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.RETRIEVE_CLINICIAN_CONTACTS,
      true
    )
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.SRD_IV,
      ProcedureConst.ACTIVE
    )
  );
};

// SRD-III: Triggers RetrieveTodoDetails of DTA
export const triggerRetrieveTodoDetails = (input: string): void => {
  agentAPI.addFact(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODO_ID, input),
    false
  );
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.RETRIEVE_TODO_DETAILS,
      true
    )
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.SRD_III,
      ProcedureConst.ACTIVE
    )
  );
};

// MRDC: Triggers CreateMedicalRecord of DTA
export const triggerCreateMedicalRecord = (
  input: ClinicianRecordInput
): void => {
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.MEDICAL_RECORD_TO_CREATE,
      input
    ),
    false
  );
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.CREATE_MEDICAL_RECORD,
      true
    )
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.MRDC,
      ProcedureConst.ACTIVE
    )
  );
};

// HF-OTP-III: Triggers RetrieveMedicalRecordContent of DTA
export const triggerRetrieveMedicalRecordContent = (
  input: ClinicianRecord
): void => {
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.MEDICAL_RECORD_TO_VIEW,
      input
    ),
    false
  );
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.RETRIEVE_MEDICAL_RECORD_CONTENT,
      true
    )
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.HF_OTP_III,
      ProcedureConst.ACTIVE
    )
  );
};

// MRDC: Triggers CreateIcdCrtRecord of DTA
export const triggerCreateIcdCrtRecord = (
  input: ClinicianRecordInput
): void => {
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.ICDCRT_RECORD_TO_CREATE,
      input
    ),
    false
  );
  agentDTA.addBelief(
    new Belief(BeliefKeys.PATIENT, PatientAttributes.CREATE_ICDCRT_RECORD, true)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.MRDC,
      ProcedureConst.ACTIVE
    )
  );
};

// HF-OTP-IV: Triggers RetrieveIcdCrtRecordContent of DTA
export const triggerRetrieveIcdCrtRecordContent = (
  input: ClinicianRecord
): void => {
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.ICDCRT_RECORD_TO_VIEW,
      input
    ),
    false
  );
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.RETRIEVE_ICDCRT_RECORD_CONTENT,
      true
    )
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.HF_OTP_IV,
      ProcedureConst.ACTIVE
    )
  );
};

// HF-EUA: Triggers RetrieveMonitoringRecords of DTA
export const triggerRetrieveMonitoringRecords = (input: AlertInfo): void => {
  agentAPI.addFact(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.REAL_TIME_ALERT,
      input
    ),
    false
  );
  agentDTA.addBelief(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.RETRIEVE_MONITORING_RECORDS,
      true
    )
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.HF_EUA,
      ProcedureConst.ACTIVE
    )
  );
};

// MRDC: Triggers DeleteRecord of DTA
export const triggerDeleteRecord = (input: ClinicianRecord): void => {
  agentAPI.addFact(
    new Belief(BeliefKeys.PATIENT, PatientAttributes.RECORD_TO_DELETE, input),
    false
  );
  agentDTA.addBelief(
    new Belief(BeliefKeys.PATIENT, PatientAttributes.DELETE_RECORD, true)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.MRDC,
      ProcedureConst.ACTIVE
    )
  );
};
