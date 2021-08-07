import { Agent, Belief } from "rc_agents/framework";
import { af_VisualizeParameters } from "./action-frames/hf-outcome-trends/VisualizeParameters";
import { af_RetrieveRole } from "./action-frames/hf-outcome-trends/RetrieveRole";
import { af_RequestRetrieveAll } from "./action-frames/hf-outcome-trends/RequestRetrieveAll";
import { af_DisplayAlerts } from "./action-frames/triage-alert-hf-clinic/DisplayAlerts";
import { af_RetrievePendingPatientAssignments } from "./action-frames/hf-outcome-trends/RetrievePendingPatientAssignments";
import { AgentIDs, CommonAttributes } from "rc_agents/AgentEnums";
import { af_DisplayPendingAlertCount } from "./action-frames/triage-alert-hf-clinic/DisplayPendingAlertCount";

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

    // HF-OTP-III
    af_RetrievePendingPatientAssignments,

    // AT-CP
    af_DisplayPendingAlertCount,
    af_DisplayAlerts
  ], // action frame
  [belief1] // beliefs
);

export default agentUXSA;
