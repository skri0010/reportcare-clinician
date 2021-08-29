import React, { FC, useState, useEffect } from "react";
import { RootState, select, store } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { View, TextStyle } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { AlertButton } from "components/Buttons/AlertButton";
import { H4, H6 } from "components/Text";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";
import { RiskFilter } from "rc_agents/model";
import { agentDTA } from "rc_agents/agents";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { setAlertRiskFilters } from "ic-redux/actions/agents/actionCreator";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { Belief } from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { isMobile } from "util/device";

interface AlertsCardProps {
  flex?: number;
  maxHeight: number;
  navigateCallback: () => void;
}

export const AlertsCard: FC<AlertsCardProps> = ({
  flex = 1,
  maxHeight,
  navigateCallback
}) => {
  const { colors, pendingAlertCount, fetchingPendingAlerts } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      pendingAlertCount: state.agents.pendingAlertCount,
      fetchingPendingAlerts: state.agents.fetchingPendingAlerts
    })
  );

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
        ProcedureAttributes.AT_CP_I,
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

  const setSelectedRiskFilter = (riskLevel: RiskLevel) => {
    const tempRiskFilters: RiskFilter = {
      [RiskLevel.HIGH]: false,
      [RiskLevel.MEDIUM]: false,
      [RiskLevel.LOW]: false,
      [RiskLevel.UNASSIGNED]: false
    };
    tempRiskFilters[riskLevel] = true;
    store.dispatch(setAlertRiskFilters(tempRiskFilters));

    //navigate to alert screen
    navigateCallback();
  };

  const iconSize = isMobile ? ms(30) : ms(15); // Larger icon size for mobile

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
      {fetchingPendingAlerts ? (
        <LoadingIndicator flex={1} />
      ) : (
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
            onPress={() => setSelectedRiskFilter(RiskLevel.HIGH)}
          />
          <AlertButton
            riskLevel={RiskLevel.MEDIUM}
            alertCount={
              pendingAlertCount.mediumRisk > 0
                ? pendingAlertCount.mediumRisk
                : undefined
            }
            iconSize={iconSize}
            onPress={() => setSelectedRiskFilter(RiskLevel.MEDIUM)}
          />
          <AlertButton
            riskLevel={RiskLevel.LOW}
            alertCount={
              pendingAlertCount.lowRisk > 0
                ? pendingAlertCount.lowRisk
                : undefined
            }
            iconSize={iconSize}
            onPress={() => setSelectedRiskFilter(RiskLevel.LOW)}
          />
          <AlertButton
            riskLevel={RiskLevel.UNASSIGNED}
            iconSize={iconSize}
            alertCount={
              pendingAlertCount.unassignedRisk > 0
                ? pendingAlertCount.unassignedRisk
                : undefined
            }
            onPress={() => setSelectedRiskFilter(RiskLevel.UNASSIGNED)}
          />
        </View>
      )}
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
