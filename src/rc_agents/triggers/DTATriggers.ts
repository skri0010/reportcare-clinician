import { PatientInfo } from "aws/API";
import {
  BeliefKeys,
  ClinicianAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import { agentDTA } from "rc_agents/agents";
import { agentAPI, Belief } from "rc_agents/framework";
import { PatientAssignmentResolution } from "rc_agents/model";

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
