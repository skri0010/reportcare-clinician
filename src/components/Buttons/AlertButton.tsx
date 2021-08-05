import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootState } from "ic-redux/store";
import { select } from "util/useRedux";
import { getRiskLevelColor, RiskLevel } from "../../models/RiskLevel";
import { ScaledSheet, ms } from "react-native-size-matters";

interface AlertButtonProps {
  riskLevel: RiskLevel;
  iconSize?: number;
  alertCount?: number;
  onPress?: () => void;
}

export const AlertButton: React.FC<AlertButtonProps> = ({
  iconSize,
  riskLevel,
  alertCount = 0,
  onPress
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const hasNotifications = alertCount > 0;

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
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
        onPress={onPress}
      >
        {/* Floating notification count */}
        {hasNotifications ? (
          <View
            style={[
              styles.badgeContainerStyle,
              {
                backgroundColor: colors.primaryBarColor,
                borderColor: colors.primaryContrastTextColor
              }
            ]}
          >
            <Text
              style={[
                styles.badgeTextStyle,
                {
                  fontSize: fonts.notifSize,
                  color: colors.primaryContrastTextColor
                }
              ]}
            >
              {alertCount}
            </Text>
          </View>
        ) : null}

        {/* Button icon */}
        <Icon
          name={hasNotifications ? "alert-octagon" : "check"}
          size={iconSize ? ms(iconSize) : ms(25)}
        />
      </TouchableOpacity>

      {/* Label */}
      <Text>{riskLevel}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "10@ms",
    paddingHorizontal: "10@ms"
  },
  buttonContainer: {
    justifyContent: "center",
    borderWidth: "1@ms",
    borderRadius: "10@ms",
    padding: "4@ms"
  },
  badgeTextStyle: {
    textAlign: "center"
  },
  badgeContainerStyle: {
    position: "absolute",
    top: "-5@ms",
    right: "-10@ms",
    borderWidth: "1@ms",
    width: "20@ms",
    height: "20@ms",
    borderRadius: "12@ms",
    justifyContent: "space-evenly"
  }
});
