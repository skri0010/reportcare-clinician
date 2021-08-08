import React, { FC, useState, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { View, TextStyle } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { AlertButton } from "components/Buttons/AlertButton";
import { H4, H6 } from "components/Text";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";
import agentMHA from "rc_agents/agents/medical-health-assistant/MHA";
import Belief from "rc_agents/framework/base/Belief";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { AlertStatus } from "aws";

interface AlertsCardProps {
  flex?: number;
  maxHeight: number;
}

export const AlertsCard: FC<AlertsCardProps> = ({ flex = 1, maxHeight }) => {
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

  const getPendingRiskAlerts = (
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

  const iconSize = ms(15);

  return (
    <CardWrapper flex={flex} maxHeight={maxHeight}>
      <View style={styles.titleContainer}>
        <H4 text={i18n.t("Home.Alerts")} style={[styles.title, titleColor]} />
        <H6
          text={`(${pendingAlertCount} remaining)`}
          style={[styles.title, detailsColors]}
        />
      </View>
      {/* Alert Button Row */}
      <View style={styles.alertsContainer}>
        {/* JH-TODO: Remove hardcoding of alertCount */}
        <AlertButton
          riskLevel={RiskLevel.HIGH}
          alertCount={
            pendingAlertCount.highRisk > 0
              ? pendingAlertCount.highRisk
              : undefined
          }
          iconSize={iconSize}
          onPress={() =>
            getPendingRiskAlerts(AlertStatus.PENDING, RiskLevel.HIGH)
          }
        />
        <AlertButton
          riskLevel={RiskLevel.MEDIUM}
          alertCount={
            pendingAlertCount.mediumRisk > 0
              ? pendingAlertCount.mediumRisk
              : undefined
          }
          iconSize={iconSize}
          onPress={() =>
            getPendingRiskAlerts(AlertStatus.PENDING, RiskLevel.MEDIUM)
          }
        />
        <AlertButton
          riskLevel={RiskLevel.LOW}
          alertCount={
            pendingAlertCount.lowRisk > 0
              ? pendingAlertCount.lowRisk
              : undefined
          }
          iconSize={iconSize}
          onPress={() =>
            getPendingRiskAlerts(AlertStatus.PENDING, RiskLevel.LOW)
          }
        />
        <AlertButton
          riskLevel={RiskLevel.UNASSIGNED}
          iconSize={iconSize}
          alertCount={
            pendingAlertCount.unassignedRisk > 0
              ? pendingAlertCount.unassignedRisk
              : undefined
          }
          onPress={() =>
            getPendingRiskAlerts(AlertStatus.PENDING, RiskLevel.UNASSIGNED)
          }
        />
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  title: {
    fontWeight: "bold"
  },
  alertsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: "15@ms"
  }
});
