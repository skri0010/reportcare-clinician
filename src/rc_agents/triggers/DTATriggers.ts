import { PatientInfo } from "aws/API";
import {
  BeliefKeys,
  ClinicianAttributes,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentALA, agentDTA } from "rc_agents/agents";
import { Belief } from "agents-framework";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  AlertInfo,
  AlertStatus,
  PatientAssignmentResolution,
  TodoInput,
  TodoStatus,
  MedInput
} from "rc_agents/model";
import {
  AlertNotification,
  PatientAssignmentSubscription
} from "aws/TypedAPI/subscriptions";

// HF-OTP-I
// Triggers RetrievePatientsByRole of DTA
export const triggerRetrievePatientsByRole = (): void => {
  agentDTA.addBelief(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_ROLE, true)
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.HF_OTP_I,
      ProcedureConst.ACTIVE
    )
  );
};

// HF-OTP-II
// Triggers RetrievePatientDetails of DTA
export const triggerRetrievePatientDetails = (patient: PatientInfo): void => {
  // Add patient as fact, no broadcast
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.PATIENT_TO_VIEW_DETAILS,
      patient
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
  patientAssignmentSubscription: PatientAssignmentSubscription
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

// HF-OTP-II: Triggers ConfigurePatient of DTA
export const triggerConfigurePatient = (
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
    new Belief(BeliefKeys.PATIENT, PatientAttributes.CONFIGURE_PATIENT, true)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.HF_OTP_II,
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

// AT-CP-I: Trigger RetriveAlerts of DTA
export const triggerRetrieveAlerts = (alertStatus: AlertStatus): void => {
  agentAPI.addFact(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.ALERT_STATUS,
      alertStatus
    ),
    false
  );

  // Trigger DTA to retrieve alerts
  agentDTA.addBelief(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_ALERTS, true)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.AT_CP_I,
      ProcedureConst.ACTIVE
    )
  );
};

// AT-CP-II Triggers RetrieveAlertInfo of DTA
export const triggerRetrieveAlertInfo = (input: AlertInfo): void => {
  // Add alert as facts
  agentAPI.addFact(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERT, input),
    false
  );

  agentDTA.addBelief(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.RETRIEVE_ALERT_INFO,
      true
    )
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.AT_CP_II,
      ProcedureConst.ACTIVE
    )
  );
};

// AT-CP-III: Triggers ProcessAlertNotification of ALA
export const triggerProcessAlertNotification = (
  alertNotification: AlertNotification
): void => {
  // Adds alert notification to facts
  agentAPI.addFact(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.ALERT_NOTIFICATION,
      alertNotification
    ),
    false
  );

  // Triggers ALA to process AlertNotification
  agentALA.addBelief(
    new Belief(
      BeliefKeys.CLINICIAN,
      ClinicianAttributes.PROCESS_ALERT_NOTIFICATION,
      true
    )
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.AT_CP_III,
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
