import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentUXSA } from "rc_agents/agents";
import { Belief } from "agents-framework";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { AlertInfo, AlertsCount } from "rc_agents/model";

// HF-OTP-I
// Triggers RetrieveRole of UXSA which then triggers RetrievePatientsByRole of DTA
export const triggerRetrievePatientsByRole = (): void => {
  agentUXSA.addBelief(
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

// P-USOR-I
// Triggers DisplayAlerts of UXSA
export const triggerDisplayAlerts: (input: {
  pendingAlertInfos?: AlertInfo[];
  pendingAlertsCount?: AlertsCount;
  completedAlertInfos?: AlertInfo[];
}) => void = ({
  pendingAlertInfos,
  pendingAlertsCount,
  completedAlertInfos
}) => {
  // Optional attributes
  // Pending AlertInfo[]
  if (pendingAlertInfos) {
    agentAPI.addFact(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.PENDING_ALERTS,
        pendingAlertInfos
      ),
      false
    );
  }

  // Pending alerts count
  if (pendingAlertsCount) {
    agentAPI.addFact(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.PENDING_ALERTS_COUNT,
        pendingAlertsCount
      ),
      false
    );
  }

  // Completed AlertInfo[]
  if (completedAlertInfos) {
    agentAPI.addFact(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.PENDING_ALERTS,
        completedAlertInfos
      ),
      false
    );
  }

  agentUXSA.addBelief(
    new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERTS_RETRIEVED, true)
  );

  agentAPI.addFact(
    new Belief(
      BeliefKeys.PROCEDURE,
      ProcedureAttributes.P_USOR_I,
      ProcedureConst.ACTIVE
    )
  );
};
