import React, { FC, useState, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { View, TextStyle } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { AlertButton } from "components/Buttons/AlertButton";
import { H4, H6 } from "components/Text";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";

interface AlertsCardProps {
  flex?: number;
  maxHeight: number;
}

export const AlertsCard: FC<AlertsCardProps> = ({ flex = 1, maxHeight }) => {
  const {
    colors,
    newHighRiskAlerts,
    newMediumRiskAlerts,
    newLowRiskAlerts,
    newUnassignedRiskAlerts
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts,
    newHighRiskAlerts: state.agents.newHighRiskAlerts,
    newMediumRiskAlerts: state.agents.newMediumRiskAlerts,
    newLowRiskAlerts: state.agents.newLowRiskAlerts,
    newUnassignedRiskAlerts: state.agents.newUnassignedRiskAlerts
  }));

  const titleColor = { color: colors.primaryTextColor } as TextStyle;
  const detailsColors = { color: colors.secondaryTextColor } as TextStyle;

  const [pendingAlertsCount, setPendingAlertsCount] = useState(0);

  useEffect(() => {
    setPendingAlertsCount(
      newHighRiskAlerts.length +
        newMediumRiskAlerts.length +
        newLowRiskAlerts.length +
        newUnassignedRiskAlerts.length
    );
  }, [
    newHighRiskAlerts,
    newMediumRiskAlerts,
    newLowRiskAlerts,
    newUnassignedRiskAlerts
  ]);

  const iconSize = ms(15);

  return (
    <CardWrapper flex={flex} maxHeight={maxHeight}>
      <View style={styles.titleContainer}>
        <H4 text={i18n.t("Home.Alerts")} style={[styles.title, titleColor]} />
        <H6
          text={`(${pendingAlertsCount} remaining)`}
          style={[styles.title, detailsColors]}
        />
      </View>
      {/* Alert Button Row */}
      <View style={styles.alertsContainer}>
        {/* JH-TODO: Remove hardcoding of alertCount */}
        <AlertButton
          riskLevel={RiskLevel.HIGH}
          alertCount={1}
          iconSize={iconSize}
        />
        <AlertButton
          riskLevel={RiskLevel.MEDIUM}
          alertCount={1}
          iconSize={iconSize}
        />
        <AlertButton riskLevel={RiskLevel.LOW} iconSize={iconSize} />
        <AlertButton riskLevel={RiskLevel.UNASSIGNED} iconSize={iconSize} />
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
