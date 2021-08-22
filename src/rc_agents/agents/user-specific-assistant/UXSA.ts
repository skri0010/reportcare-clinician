import { Agent, Belief } from "rc_agents/framework";
import { af_VisualizeParameters } from "./action-frames/hf-outcome-trends/VisualizeParameters";
import { af_RetrieveRole } from "./action-frames/hf-outcome-trends/RetrieveRole";
import { af_RequestRetrievePatients } from "./action-frames/hf-outcome-trends/RequestRetrievePatients";
import { af_DisplayAlerts } from "./action-frames/triage-alert-hf-clinic/DisplayAlerts";
import { af_DisplayPendingPatientAssignments } from "./action-frames/storing-data/DisplayPendingPatientAssignments";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "rc_agents/framework/Enums";
import { af_DisplayPendingAlertCount } from "./action-frames/triage-alert-hf-clinic/DisplayPendingAlertCount";
import { af_DisplayAlertInfo } from "./action-frames/triage-alert-hf-clinic/DisplayAlertInfo";
import { af_DisplayPatientsByFilter } from "./action-frames/hf-outcome-trends/DisplayPatientsByFilter";
import { af_DisplayTodos } from "./action-frames/storing-data/DisplayTodos";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.UXSA, CommonAttributes.LAST_ACTIVITY, null);

// User Specific Assistant Agent
const agentUXSA = new Agent(
  AgentIDs.UXSA,
  [
    // HF-OTP-I
    af_RetrieveRole,
    af_RequestRetrievePatients,
    af_DisplayPatientsByFilter,

    // HF-OTP-II
    af_VisualizeParameters,

    // SRD-I
    af_DisplayPendingPatientAssignments,

    // SRD-II
    af_DisplayTodos,

    // AT-CP
    af_DisplayPendingAlertCount,
    af_DisplayAlerts,
    af_DisplayAlertInfo
  ], // action frame
  [belief1] // beliefs
);

export default agentUXSA;
