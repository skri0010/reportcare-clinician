import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { View, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { LongAlertButton } from "components/Buttons/LongAlertButton";
import { H3, H5 } from "components/Text";
import { CardWrapper } from "./CardWrapper";

interface AlertsCardProps {
  maxHeight: number;
}

export const AlertsCard: FC<AlertsCardProps> = ({ maxHeight }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const titleColor = { color: colors.primaryTextColor } as TextStyle;
  const detailsColors = { color: colors.secondaryTextColor } as TextStyle;

  return (
    <CardWrapper maxHeight={maxHeight}>
      <View style={styles.titleContainer}>
        <H3 text="Alerts" style={[styles.title, titleColor]} />
        <H5 text="   (2 remaining)" style={[styles.title, detailsColors]} />
      </View>
      <LongAlertButton riskLevel={RiskLevel.HIGH} alertCount={3} />
      <LongAlertButton riskLevel={RiskLevel.MEDIUM} alertCount={3} />
      <LongAlertButton riskLevel={RiskLevel.LOW} />
      <LongAlertButton riskLevel={RiskLevel.UNASSIGNED} alertCount={3} />
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
