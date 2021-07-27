import React, { FC } from "react";
import { RiskLevel } from "models/RiskLevel";
import { RiskFilterTag } from "./RiskFilterTag";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface RiskFilterTabProps {
  onTagPress: () => void;
}

export const RiskFilterTab: FC<RiskFilterTabProps> = ({ onTagPress }) => {
  return (
    <View style={styles.container}>
      <RiskFilterTag
        title="High"
        riskLevel={RiskLevel.HIGH}
        onTagPress={onTagPress}
      />
      <RiskFilterTag
        title="Medium"
        riskLevel={RiskLevel.MEDIUM}
        onTagPress={onTagPress}
      />
      <RiskFilterTag
        title="Low"
        riskLevel={RiskLevel.LOW}
        onTagPress={onTagPress}
      />
      <RiskFilterTag
        title="None"
        riskLevel={RiskLevel.UNASSIGNED}
        onTagPress={onTagPress}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10@ms"
  }
});
