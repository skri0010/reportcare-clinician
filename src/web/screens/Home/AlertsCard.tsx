import React, { FC, useState, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { View, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { LongAlertButton } from "components/Buttons/LongAlertButton";
import { H4, H6 } from "components/Text";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";
import agentMHA from "agents_implementation/agents/medical-health-assistant/MHA";
import Belief from "agents_implementation/agent_framework/base/Belief";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import { AlertStatus } from "aws";

interface AlertsCardProps {
  maxHeight: number;
}

export const AlertsCard: FC<AlertsCardProps> = ({ maxHeight }) => {
  const { colors, pendingAlertCount } = select((state: RootState) => ({
    colors: state.settings.colors,
    pendingAlertCount: state.agents.pendingAlertCount
  }));

  const titleColor = { color: colors.primaryTextColor } as TextStyle;
  const detailsColors = { color: colors.secondaryTextColor } as TextStyle;

  const [remainingAlert, setRemainingAlert] = useState(0);

  useEffect(() => {
    setRemainingAlert(
      pendingAlertCount.highRisk +
        pendingAlertCount.mediumRisk +
        pendingAlertCount.lowRisk +
        pendingAlertCount.unassignedRisk
    );
  }, [pendingAlertCount]);

  const getPendingRiskAlerts = async (
    alertStatus: AlertStatus,
    riskLevel: RiskLevel
  ) => {
    // Adds alert status and risk level to be used by agents
    agentAPI.addFact(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.ALERT_STATUS,
        alertStatus
      ),
      false
    );
    agentAPI.addFact(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.ALERT_RISK_LEVEL,
        riskLevel
      ),
      false
    );
    // Triggers MHA to retrieve alerts
    agentMHA.addBelief(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.RETRIEVE_ALERTS,
        true
      )
    );
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.AT_CP,
        ProcedureConst.ACTIVE
      )
    );
  };

  return (
    <CardWrapper maxHeight={maxHeight}>
      <View style={styles.titleContainer}>
        <H4 text={i18n.t("Home.Alerts")} style={[styles.title, titleColor]} />
        <H6
          text={`(${remainingAlert} ${i18n.t("Home.ItemsRemaining")})`}
          style={[styles.title, detailsColors]}
        />
      </View>
      <LongAlertButton
        riskLevel={RiskLevel.HIGH}
        alertCount={
          pendingAlertCount.highRisk > 0
            ? pendingAlertCount.highRisk
            : undefined
        }
        onPress={getPendingRiskAlerts}
      />
      <LongAlertButton
        riskLevel={RiskLevel.MEDIUM}
        alertCount={
          pendingAlertCount.mediumRisk > 0
            ? pendingAlertCount.mediumRisk
            : undefined
        }
        onPress={getPendingRiskAlerts}
      />
      <LongAlertButton
        riskLevel={RiskLevel.LOW}
        alertCount={
          pendingAlertCount.lowRisk > 0 ? pendingAlertCount.lowRisk : undefined
        }
        onPress={getPendingRiskAlerts}
      />
      <LongAlertButton
        riskLevel={RiskLevel.UNASSIGNED}
        alertCount={
          pendingAlertCount.unassignedRisk > 0
            ? pendingAlertCount.unassignedRisk
            : undefined
        }
        onPress={getPendingRiskAlerts}
      />
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  },
  title: {
    fontWeight: "bold"
  }
});
