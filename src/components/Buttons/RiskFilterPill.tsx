import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { Text, TouchableHighlight } from "react-native";
import { getRiskLevelColor, RiskLevel } from "models/RiskLevel";
import { moderateScale, ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";

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
  const {
    colors,
    fetchingPatients,
    fetchingPendingAlerts,
    fetchingCompletedAlerts
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    fetchingPatients: state.patients.fetchingPatients,
    fetchingPendingAlerts: state.alerts.fetchingPendingAlerts,
    fetchingCompletedAlerts: state.alerts.fetchingCompletedAlerts
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
      disabled={
        fetchingPatients || fetchingPendingAlerts || fetchingCompletedAlerts
      } // disable clicking when fetch is ongoing
    >
      <Text
        style={
          selected
            ? [styles.textStyle, { fontWeight: "bold" }]
            : styles.textStyle
        }
      >
        {i18n.t(`Filter.${riskLevel}`)}
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
