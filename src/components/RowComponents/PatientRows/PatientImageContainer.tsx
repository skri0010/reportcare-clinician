import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { RootState, select } from "util/useRedux";
import { RiskLevel, getRiskLevelColor } from "models/RiskLevel";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ms, ScaledSheet } from "react-native-size-matters";

interface PatientImageContainerProps {
  // JH-TODO: Image link in prop
  riskLevel: RiskLevel;
  onPress?: () => void;
}

export const PatientImageContainer: FC<PatientImageContainerProps> = ({
  riskLevel,
  onPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const PatientImageContainerContent = () => {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: getRiskLevelColor(
              colors.riskLevelBackgroundColors,
              riskLevel
            )
          }
        ]}
      >
        <View style={styles.avatar}>
          <Icon name="person" color="black" size={ms(20)} />
        </View>
      </View>
    );
  };

  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      <PatientImageContainerContent />
    </TouchableOpacity>
  ) : (
    <PatientImageContainerContent />
  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "10@ms",
    width: "70@ms"
  },
  avatar: {
    backgroundColor: "#e0e0e0",
    width: "50@ms",
    height: "50@ms",
    borderRadius: "50@ms",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
