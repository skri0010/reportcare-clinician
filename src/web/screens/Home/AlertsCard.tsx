import React, { FC, useState, useEffect } from "react";
import { RootState, select, store } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { AlertButton } from "components/Buttons/AlertButton";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import i18n from "util/language/i18n";
import { FetchAlertsMode, RiskFilter } from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { isMobile } from "util/device";
import { AgentTrigger } from "rc_agents/trigger";
import { setAlertRiskFilters } from "ic-redux/actions/agents/filterActionCreator";

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
  const { pendingAlertCount, fetchingPendingAlerts } = select(
    (state: RootState) => ({
      pendingAlertCount: state.alerts.pendingAlertCount,
      fetchingPendingAlerts: state.alerts.fetchingPendingAlerts
    })
  );

  const [remainingAlert, setRemainingAlert] = useState(0);

  useEffect(() => {
    AgentTrigger.triggerRetrieveAlerts(FetchAlertsMode.PENDING);
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
    <CardWrapper
      flex={flex}
      maxHeight={maxHeight}
      title={i18n.t("Home.Alerts")}
      subtitle={`(${remainingAlert} ${i18n.t("Keywords.remaining")})`}
    >
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
  alertsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: "5@ms"
  }
});
