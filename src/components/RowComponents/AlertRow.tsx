import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel, getRiskLevelColor } from "models/RiskLevel";
import { Alert } from "aws/API";
import { View, Button, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H4, H5 } from "components/Text/index";

interface AlertRowProps {
  alertDetails: Alert;
}

export const AlertRow: FC<AlertRowProps> = ({ alertDetails }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View>
      <H4 text={alertDetails.patientName} style={null} />
      <H4 text={alertDetails.summary} style={null} />
      <H4 text={alertDetails.dateTime} style={null} />
    </View>
  );
};
