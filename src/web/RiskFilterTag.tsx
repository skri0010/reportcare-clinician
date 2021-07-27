import React, { useState, FC } from "react";
import { RootState, select } from "util/useRedux";
import { Text, TouchableHighlight } from "react-native";
import { getRiskLevelColor, RiskLevel } from "models/RiskLevel";
import { moderateScale, ScaledSheet } from "react-native-size-matters";

interface RiskFilterTagProps {
  title: string;
  riskLevel: RiskLevel;
  onTagPress: () => void;
}

export const RiskFilterTag: FC<RiskFilterTagProps> = ({
  title,
  riskLevel,
  onTagPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [selected, setSelected] = useState<boolean>(false);

  return (
    <TouchableHighlight
      style={
        !selected
          ? [
              styles.container,
              {
                backgroundColor: getRiskLevelColor(
                  colors.riskLevelBackgroundColors,
                  riskLevel
                ),
                borderColor: getRiskLevelColor(
                  colors.riskLevelBorderColors,
                  riskLevel
                ),
                borderWidth: moderateScale(1)
              }
            ]
          : [
              styles.container,
              {
                backgroundColor: getRiskLevelColor(
                  colors.riskLevelSelectedBackgroundColors,
                  riskLevel
                ),
                borderColor: getRiskLevelColor(
                  colors.riskLevelBorderColors,
                  riskLevel
                ),
                borderWidth: moderateScale(1.5)
              }
            ]
      }
      onPress={() => {
        setSelected(!selected);
        onTagPress;
      }}
    >
      <Text
        style={
          selected
            ? [styles.textStyle, { fontWeight: "bold" }]
            : styles.textStyle
        }
      >
        {title}
      </Text>
    </TouchableHighlight>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: "45@ms",
    height: "20@ms",
    justifyContent: "center",
    borderRadius: "5@ms"
    // borderWidth: "1@ms"
  },
  textStyle: {
    textAlign: "center"
  }
});
