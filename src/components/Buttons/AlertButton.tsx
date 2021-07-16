import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon, Badge } from "react-native-elements";
import { RootState, select } from "util/useRedux";
import { getRiskLevelColor, RiskLevel } from "../../models/RiskLevel";
import { ScaledSheet, ms } from "react-native-size-matters";

interface AlertButtonProps {
  riskLevel: RiskLevel;
  alertCount?: number;
  onPress?: () => void;
}

export const AlertButton: React.FC<AlertButtonProps> = ({
  riskLevel,
  alertCount = 0,
  onPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
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
          <Badge
            value={alertCount}
            containerStyle={styles.badgeContainerStyle}
            badgeStyle={styles.badgeStyle}
          />
        ) : null}

        {/* Button icon */}
        <Icon
          name={hasNotifications ? "notification-important" : "check"}
          size={ms(50)}
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
    alignItems: "center"
  },
  buttonContainer: {
    justifyContent: "center",
    borderWidth: "1@ms",
    borderRadius: "10@ms",
    padding: "4@ms"
  },
  badgeStyle: {
    width: "24@ms",
    height: "24@ms",
    borderRadius: "12@ms"
  },
  badgeTextStyle: {
    fontSize: "15@ms"
  },
  badgeContainerStyle: {
    position: "absolute",
    top: "-5@ms",
    right: "-10@ms"
  }
});
