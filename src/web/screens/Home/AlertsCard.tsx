import React, { FC, useState, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { View, TextStyle } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { AlertButton } from "components/Buttons/AlertButton";
import { H4, H6 } from "components/Text";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { Belief } from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import agentAPI from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { AlertStatus } from "rc_agents/model";
import { agentDTA } from "rc_agents/agents";
import { Alert } from "aws/API";

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
    // Triggers DTA to get count of pending alerts
    agentDTA.addBelief(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.RETRIEVE_PENDING_ALERT_COUNT,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRemainingAlert(
      pendingAlertCount.highRisk +
        pendingAlertCount.mediumRisk +
        pendingAlertCount.lowRisk +
        pendingAlertCount.unassignedRisk
    );
  }, [pendingAlertCount]);

  // Triggers the procedure of querying alerts with specific status and risk level.
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
    // Triggers DTA to retrieve alerts
    agentDTA.addBelief(
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

  // Triggers the procedure of querying information associated with an alert.
  const getAlertInfo = (alert: Alert) => {
    agentAPI.addFact(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERT, alert),
      false
    );
    agentDTA.addBelief(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.RETRIEVE_ALERT_INFO,
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
          text={`(${remainingAlert} remaining)`}
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
    fontWeight: "bold",
    paddingRight: "5@ms"
  },
  alertsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: "15@ms"
  }
});
