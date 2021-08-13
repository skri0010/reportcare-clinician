import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel, getRiskLevelColor } from "models/RiskLevel";
import { Alert } from "aws/API";
import { View, Button, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H4, H5 } from "components/Text/index";

interface AlertRowProps {
  alertDetails: Alert;
  onButtonPress?: () => void;
  onCardPress?: () => void;
}

export const AlertRow: FC<AlertRowProps> = ({
  alertDetails,
  onButtonPress = () => null,
  onCardPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <TouchableOpacity onPress={onCardPress} style={{ opacity: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingVertical: "3@ms", flex: 1 }}>
          <View style={{ padding: "10@ms" }}>
            <H4
              text={alertDetails.patientName}
              style={{ fontWeight: "bold", paddingBottom: "10@ms" }}
            />
            <H5
              text={alertDetails.summary}
              style={{ paddingBottom: "10@ms " }}
            />
            <H5
              text={alertDetails.dateTime}
              style={{ paddingBottom: "10@ms" }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
