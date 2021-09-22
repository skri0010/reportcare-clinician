import { Belief } from "agents-framework";
import { af_VisualizeParameters } from "./action-frames/hf-outcome-trends/VisualizeParameters";
import { af_RetrieveRole } from "./action-frames/hf-outcome-trends/RetrieveRole";
import { af_RequestRetrievePatients } from "./action-frames/hf-outcome-trends/RequestRetrievePatients";
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
import { af_DisplayRefreshedAlerts } from "./action-frames/triage-alert-hf-clinic/DisplayRefreshedAlerts";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.UXSA, CommonAttributes.LAST_ACTIVITY, null);

// User Specific Assistant Agent
const agentUXSA = new ClinicianAgent(
  AgentIDs.UXSA,
  [
    // HF-OTP-I
    af_RetrieveRole,
    af_RequestRetrievePatients,
    af_DisplayPatientsByFilter,

    // HF-OTP-II
    af_VisualizeParameters,
    af_DisplayAlertHistory,

    // SRD-I
    af_DisplayPendingPatientAssignments,
    // SRD-II
    af_DisplayTodos,
    // SRD-III
    af_DisplayTodoDetails,
    // SRD-IV
    af_DisplayClinicianContacts,

    // AT-CP-I
    af_DisplayAlerts,
    // AT-CP-II
    af_DisplayDetailedAlertInfo,
    // AT-CP-III
    af_DisplayRefreshedAlerts
  ], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentUXSA;
