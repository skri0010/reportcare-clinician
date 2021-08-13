import { Agent, Belief } from "rc_agents/framework";
import { af_VisualizeParameters } from "./action-frames/hf-outcome-trends/VisualizeParameters";
import { af_RetrieveRole } from "./action-frames/hf-outcome-trends/RetrieveRole";
import { af_RequestRetrieveAll } from "./action-frames/hf-outcome-trends/RequestRetrieveAll";
import { af_DisplayAlerts } from "./action-frames/triage-alert-hf-clinic/DisplayAlerts";
import { af_DisplayPendingPatientAssignments } from "./action-frames/storing-data/DisplayPendingPatientAssignments";
import { AgentIDs, CommonAttributes } from "rc_agents/AgentEnums";
import { af_DisplayPendingAlertCount } from "./action-frames/triage-alert-hf-clinic/DisplayPendingAlertCount";
import { af_DisplayAlertInfo } from "./action-frames/triage-alert-hf-clinic/DisplayAlertInfo";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.UXSA, CommonAttributes.LAST_ACTIVITY, null);

// User Specific Assistant Agent
const agentUXSA = new Agent(
  AgentIDs.UXSA,
  [
    // HF-OTP-II
    af_VisualizeParameters,

    // HF-OTP-I
    af_RetrieveRole,
    af_RequestRetrieveAll,

    // SRD
    af_DisplayPendingPatientAssignments,

    // AT-CP
    af_DisplayPendingAlertCount,
    af_DisplayAlerts,
    af_DisplayAlertInfo
  ], // action frame
  [belief1] // beliefs
);

export default agentUXSA;
