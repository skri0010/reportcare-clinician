import agentALA from "agents_implementation/agents/alert-assistant/ALA";
import agentMHA from "agents_implementation/agents/medical-health-assistant/MHA";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import {
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import Belief from "agents_implementation/agent_framework/base/Belief";

// Triggers MHA to receive a dummy alert
export const triggerATCP = async (): Promise<void> => {
  agentALA.start();
  agentMHA.addBelief(
    new Belief(BeliefKeys.PATIENT, PatientAttributes.INCOMING_ALERTS, true)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.AT_CP,
      ProcedureConst.ACTIVE
    )
  );
};
