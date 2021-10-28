import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { H4, H6 } from "components/Text/index";
import { AlertInfo } from "rc_agents/model";
import { RootState, select } from "util/useRedux";
import { getRiskLevelColor } from "models/RiskLevel";
import { ScaledSheet } from "react-native-size-matters";

interface AlertRowProps {
  alertDetails: AlertInfo;
  selected?: boolean;
  onCardPress?: (alert: AlertInfo) => void;
}

export const AlertRow: FC<AlertRowProps> = ({
  alertDetails,
  selected,
  onCardPress
}) => {
  const { colors, fetchingAlertInfo } = select((state: RootState) => ({
    colors: state.settings.colors,
    fetchingAlertInfo: state.alerts.fetchingAlertInfo
  }));

  return (
    <TouchableOpacity
      style={{
        opacity: selected ? 0.5 : 1,
        backgroundColor: getRiskLevelColor(
          colors.riskLevelBackgroundColors,
          alertDetails.riskLevel
        )
      }}
      disabled={selected || !onCardPress || fetchingAlertInfo} // disable clicking when fetch is ongoing
      onPress={
        onCardPress && !selected ? () => onCardPress(alertDetails) : undefined
      }
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.container}>
          <H4
            text={alertDetails.patientName}
            style={[styles.mainItem, { color: colors.consistentTextColor }]}
          />
          <H6
            text={alertDetails.summary}
            style={[styles.subItem, { color: colors.consistentTextColor }]}
          />
          <H6
            text={`${new Date(alertDetails.dateTime).toLocaleString()}`}
            style={[styles.subItem, { color: colors.consistentTextColor }]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    padding: "5@ms"
  },
  mainItem: { fontWeight: "600", paddingBottom: "5@ms" },
  subItem: {
    paddingBottom: "1@ms"
  }
});
