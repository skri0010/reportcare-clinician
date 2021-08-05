import React, { FC, useState, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { View, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { LongAlertButton } from "components/Buttons/LongAlertButton";
import { H4, H6 } from "components/Text";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";

interface AlertsCardProps {
  maxHeight: number;
}

export const AlertsCard: FC<AlertsCardProps> = ({ maxHeight }) => {
  const {
    colors,
    newHighRiskAlerts,
    newMediumRiskAlerts,
    newLowRiskAlerts,
    newUnassignedRiskAlerts
  } = select((state: RootState) => ({
    colors: state.settings.colors,
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

  return (
    <CardWrapper maxHeight={maxHeight}>
      <View style={styles.titleContainer}>
        <H4 text={i18n.t("Home.Alerts")} style={[styles.title, titleColor]} />
        <H6
          text={`   (${pendingAlertsCount} remaining)`}
          style={[styles.title, detailsColors]}
        />
      </View>
      <LongAlertButton
        riskLevel={RiskLevel.HIGH}
        alertCount={
          newHighRiskAlerts.length > 0 ? newHighRiskAlerts.length : undefined
        }
      />
      <LongAlertButton
        riskLevel={RiskLevel.MEDIUM}
        alertCount={
          newMediumRiskAlerts.length > 0
            ? newMediumRiskAlerts.length
            : undefined
        }
      />
      <LongAlertButton
        riskLevel={RiskLevel.LOW}
        alertCount={
          newLowRiskAlerts.length > 0 ? newLowRiskAlerts.length : undefined
        }
      />
      <LongAlertButton
        riskLevel={RiskLevel.UNASSIGNED}
        alertCount={
          newUnassignedRiskAlerts.length > 0
            ? newUnassignedRiskAlerts.length
            : undefined
        }
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
