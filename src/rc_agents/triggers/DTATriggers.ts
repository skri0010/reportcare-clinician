import { PatientInfo } from "aws/API";
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
  PatientAssignmentResolution,
  TodoInput,
  TodoStatus
} from "rc_agents/model";

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
export const triggerConfigurePatient = (input: PatientInfo): void => {
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PATIENT,
      PatientAttributes.PATIENT_TO_CONFIGURE,
      input
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
