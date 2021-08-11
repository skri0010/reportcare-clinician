import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { Text, TouchableHighlight } from "react-native";
import { getRiskLevelColor, RiskLevel } from "models/RiskLevel";
import { moderateScale, ScaledSheet } from "react-native-size-matters";

interface RiskFilterTagProps {
  title: string;
  riskLevel: RiskLevel;
  selected: boolean;
  onTagPress: (key: RiskLevel) => void;
}

export const RiskFilterTag: FC<RiskFilterTagProps> = ({
  title,
  riskLevel,
  selected,
  onTagPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <TouchableHighlight
      underlayColor={getRiskLevelColor(
        colors.riskLevelSelectedBackgroundColors,
        riskLevel
      )}
      style={[
        styles.container,
        {
          backgroundColor: !selected
            ? getRiskLevelColor(colors.riskLevelBackgroundColors, riskLevel)
            : getRiskLevelColor(
                colors.riskLevelSelectedBackgroundColors,
                riskLevel
              ),
          borderWidth: !selected ? moderateScale(1) : moderateScale(1.5),
          borderColor: getRiskLevelColor(
            colors.riskLevelBorderColors,
            riskLevel
          )
        }
      ]}
      onPress={() => {
        onTagPress(riskLevel);
      }}
    >
      <Text
        style={
          selected
            ? [styles.textStyle, { fontWeight: "bold" }]
            : styles.textStyle
        }
      >
        {title === RiskLevel.UNASSIGNED ? "None" : title}
      </Text>
    </TouchableHighlight>
  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: "5@ms",
    paddingVertical: "3@ms",
    marginHorizontal: "5@ms"
  },
  textStyle: {
    textAlign: "center"
  }
});
