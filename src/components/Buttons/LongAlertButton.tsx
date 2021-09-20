import React from "react";
import { View, TouchableOpacity } from "react-native";
import { RootState, select } from "util/useRedux";
import { getRiskLevelColor, RiskLevel } from "../../models/RiskLevel";
import { ScaledSheet, ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import { H5, H6 } from "components/Text";
import i18n from "util/language/i18n";
import { FetchAlertsMode } from "rc_agents/model";

interface LongAlertButtonProps {
  riskLevel: RiskLevel;
  alertCount?: number;
  onPress?: (fetchAlertsMode: FetchAlertsMode, riskLevel: RiskLevel) => void;
}

export const LongAlertButton: React.FC<LongAlertButtonProps> = ({
  riskLevel,
  alertCount = 0,
  onPress
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const hasNotifications = alertCount > 0;

  function findRiskName(risk: RiskLevel) {
    let riskName: string = "Alert.UnassignedRisk";

    if (risk === RiskLevel.HIGH) {
      riskName = "Alert.HighRisk";
    } else if (risk === RiskLevel.MEDIUM) {
      riskName = "Alert.MediumRisk";
    } else if (risk === RiskLevel.LOW) {
      riskName = "Alert.LowRisk";
    }
    return i18n.t(riskName);
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: getRiskLevelColor(
            colors.riskLevelBackgroundColors,
            riskLevel
          ),
          borderColor: getRiskLevelColor(
            colors.riskLevelBorderColors,
            riskLevel
          )
        }
      ]}
      onPress={
        onPress ? () => onPress(FetchAlertsMode.PENDING, riskLevel) : undefined
      }
    >
      <H5
        text={findRiskName(riskLevel)}
        style={[{ color: colors.primaryTextColor }, styles.riskText]}
      />
      {/* Floating notification count */}
      {hasNotifications ? (
        <View
          style={[
            styles.badgeContainerStyle,
            {
              backgroundColor: colors.acceptButtonColor,
              borderColor: colors.primaryContrastTextColor
            }
          ]}
        >
          <H6
            text={`${alertCount}`}
            style={[
              styles.badgeTextStyle,
              { fontSize: ms(10), color: colors.primaryTextColor }
            ]}
          />
        </View>
      ) : null}

      {/* Button icon */}
      <Icon
        name={hasNotifications ? "notification-important" : "check"}
        size={fonts.h3Size}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderWidth: "1@ms",
    borderRadius: "5@ms",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "35@ms",
    margin: "4@ms"
  },
  icon: {
    marginRight: "6@ms0.05",
    marginLeft: "9@ms0.05"
  },
  riskText: {
    paddingLeft: "15@ms",
    flexGrow: 2
  },
  badgeTextStyle: {
    textAlign: "center"
  },
  badgeContainerStyle: {
    borderWidth: "1@ms",
    width: "20@ms",
    height: "20@ms",
    borderRadius: "12@ms",
    justifyContent: "space-evenly"
  }
});
