import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { RootState, select } from "util/useRedux";
import { RiskLevel, getRiskLevelColor } from "models/RiskLevel";
import { ScaledSheet } from "react-native-size-matters";
import { PeopleAvatar } from "../PeopleAvatar";

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
        <PeopleAvatar iconType="person" />
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
  }
});
