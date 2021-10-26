import { Belief } from "agents-framework";
import { af_DisplayPatientDetails } from "./action-frames/hf-outcome-trends/DisplayPatientDetails";
import { af_DisplayAlerts } from "./action-frames/triage-alert-hf-clinic/DisplayAlerts";
import { af_DisplayPendingPatientAssignments } from "./action-frames/storing-data/DisplayPendingPatientAssignments";
import { af_DisplayTodoDetails } from "./action-frames/storing-data/DisplayTodoDetails";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "agents-framework/Enums";
import { af_DisplayDetailedAlertInfo } from "./action-frames/triage-alert-hf-clinic/DisplayDetailedAlertInfo";
import { af_DisplayPatientsByFilter } from "./action-frames/hf-outcome-trends/DisplayPatientsByFilter";
import { af_DisplayTodos } from "./action-frames/storing-data/DisplayTodos";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ClinicianAgent } from "rc_agents/clinician_framework/ClinicianAgent";
import { af_DisplayAlertHistory } from "./action-frames/hf-outcome-trends/DisplayAlertHistory";
import { af_DisplayClinicianContacts } from "./action-frames/storing-data/DisplayClinicianContacts";
import { af_DisplayRefreshedAlerts } from "./action-frames/exacerbation-user-specific-alert/DisplayRefreshedAlerts";
import { af_DisplayMedicalRecordContent } from "./action-frames/hf-outcome-trends/DisplayMedicalRecordContent";
import { af_DisplayIcdCrtRecordContent } from "./action-frames/hf-outcome-trends/DisplayIcdCrtRecordContent";
import { af_DisplaySharingClinicians } from "./action-frames/clinician-specific-patient-sharing/DisplaySharingClinicians";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.UXSA, CommonAttributes.LAST_ACTIVITY, null);

// User Specific Assistant Agent
const agentUXSA = new ClinicianAgent(
  AgentIDs.UXSA,
  [
    // HF-OTP-I
    af_DisplayPatientsByFilter,

    // HF-OTP-II
    af_DisplayPatientDetails,
    af_DisplayAlertHistory,

    // HF-OTP-III
    af_DisplayMedicalRecordContent,

    // HF-OTP-IV
    af_DisplayIcdCrtRecordContent,

    // SRD-I
    af_DisplayPendingPatientAssignments,
    // SRD-II
    af_DisplayTodos,
    // SRD-III
    af_DisplayTodoDetails,
    // SRD-IV
    af_DisplayClinicianContacts,
    // CP-PS
    af_DisplaySharingClinicians,

    // P-USOR-I
    af_DisplayAlerts,
    // P-USOR-II
    af_DisplayDetailedAlertInfo,
    // HF-EUA
    af_DisplayRefreshedAlerts
  ], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentUXSA;
