import React, { FC, useState } from "react";
import { RiskLevel } from "models/RiskLevel";
import { RiskFilterTag } from "./RiskFilterTag";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface RiskFilterTabProps {
  onTagPress?: (item: FilterTagProps[]) => void;
}

export interface FilterTagProps {
  key: string;
  value: RiskLevel;
  selected: boolean;
}

export const RiskFilterTab: FC<RiskFilterTabProps> = ({ onTagPress }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const riskLevels: FilterTagProps[] = Object.entries(RiskLevel).map(
    ([key, value]) => ({ key: key, value: value, selected: false })
  );
  const [selectedRiskLevels, setSelectedRiskLevels] = useState(riskLevels);

  // Function for setting boolean to alternate
  const setSelected = (key: RiskLevel) => {
    const ind = selectedRiskLevels.findIndex((x) => x.value === key);
    // To bypass shallow compare done in react
    const toMod = selectedRiskLevels.map((x) => x);
    if (ind !== null) {
      toMod[ind].selected = !toMod[ind].selected;
    }
    setSelectedRiskLevels(toMod);
    // return selected filters
    onTagPress ? onTagPress(selectedRiskLevels) : null;
  };

  return (
    <View style={styles.container}>
      {selectedRiskLevels.map((risk) => (
        <RiskFilterTag
          title={risk.value}
          riskLevel={risk.value}
          selected={risk.selected}
          onTagPress={setSelected}
          key={risk.key}
        />
      ))}
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
