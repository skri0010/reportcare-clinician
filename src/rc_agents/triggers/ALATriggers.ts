import { Belief } from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { AlertNotification } from "aws/TypedAPI/subscriptions";
import { agentALA } from "rc_agents/agents";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";

// HF-EUA: Triggers ProcessAlertNotification of ALA
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
      ProcedureAttributes.HF_EUA,
      ProcedureConst.ACTIVE
    )
  );
};
