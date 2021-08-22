import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { Text, TouchableHighlight } from "react-native";
import { getRiskLevelColor, RiskLevel } from "models/RiskLevel";
import { moderateScale, ms, ScaledSheet } from "react-native-size-matters";

export interface RiskFilterPillProps {
  riskLevel: RiskLevel;
  selected: boolean;
  leftPadding?: boolean;
  onPress?: (key: RiskLevel) => void;
}

export const RiskFilterPill: FC<RiskFilterPillProps> = ({
  riskLevel,
  selected,
  leftPadding = false,
  onPress = null
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
        },
        leftPadding ? { marginLeft: ms(20) } : {}
      ]}
      onPress={
        onPress
          ? () => {
              onPress(riskLevel);
            }
          : undefined
      }
    >
      <Text
        style={
          selected
            ? [styles.textStyle, { fontWeight: "bold" }]
            : styles.textStyle
        }
      >
        {riskLevel}
      </Text>
    </TouchableHighlight>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    minWidth: "45@ms",
    justifyContent: "center",
    borderRadius: "5@ms",
    paddingVertical: "3@ms",
    paddingHorizontal: "6@ms",
    marginHorizontal: "6@ms"
  },
  textStyle: {
    textAlign: "center"
  }
});
