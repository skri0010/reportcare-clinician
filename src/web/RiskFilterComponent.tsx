import React, { FC, useState } from "react";
import { RiskLevel } from "models/RiskLevel";
import { RiskFilterTag } from "./RiskFilterTag";
import { View, ScrollView } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";

interface RiskFilterComponentProps {
  onTagPress?: (item: FilterTagProps[]) => void;
}

export interface FilterTagProps {
  key: string;
  value: RiskLevel;
  selected: boolean;
}

export const RiskFilterComponent: FC<RiskFilterComponentProps> = ({
  onTagPress
}) => {
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
    <ScrollView
      horizontal
      contentContainerStyle={{ flexGrow: 1, minWidth: ms(250) }}
    >
      <View style={styles.container}>
        {selectedRiskLevels.map((risk) => (
          <View style={{ flex: 1 }}>
            <RiskFilterTag
              title={risk.value}
              riskLevel={risk.value}
              selected={risk.selected}
              onTagPress={setSelected}
              key={risk.key}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10@ms",
    flex: 1
  }
});
