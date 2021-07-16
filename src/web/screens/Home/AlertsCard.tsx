import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { View, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { LongAlertButton } from "components/Buttons/LongAlertButton";
import { H4, H7 } from "components/Text";

export const AlertsCard: FC = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const titleColor = { color: colors.primaryTextColor } as TextStyle;
  const detailsColors = { color: colors.secondaryTextColor } as TextStyle;

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <H4 text="Alerts" style={[styles.title, titleColor]} />
        <H7 text="   (2 remaining)" style={[styles.title, detailsColors]} />
      </View>
      <LongAlertButton riskLevel={RiskLevel.HIGH} alertCount={3} />
      <LongAlertButton riskLevel={RiskLevel.MEDIUM} alertCount={3} />
      <LongAlertButton riskLevel={RiskLevel.LOW} />
      <LongAlertButton riskLevel={RiskLevel.UNASSIGNED} alertCount={3} />
    </View>
  );
};

const styles = ScaledSheet.create({
  card: {
    backgroundColor: "white",
    padding: "10@ms",
    margin: "20@ms",
    borderRadius: "5@ms",
    height: "78%"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  },
  title: {
    fontWeight: "bold"
  }
});
