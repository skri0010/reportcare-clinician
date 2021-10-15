import { Belief } from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPS } from "rc_agents/agents";
import {
  BeliefKeys,
  AppAttributes,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";

/**
 * Triggers APS to store or retrieve clinician's entry data.
 */
export const triggerAssociateData = (): void => {
  agentAPS.addBelief(
    new Belief(BeliefKeys.APP, AppAttributes.CONFIGURED, true)
  );
  agentAPS.addBelief(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.HAS_ENTRY, false)
  );
  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.MRDC,
      ProcedureConst.ACTIVE
    )
  );
};
