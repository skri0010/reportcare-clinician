import React from "react";
import { View, TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import { PatientInfo } from "aws/API";
import { ScaledSheet } from "react-native-size-matters";
import { H6 } from "components/Text";
import { RiskLevel } from "models/RiskLevel";

export interface PatientRequestRowProps {
  generalDetails: PatientInfo;
  request?: string;
  time?: string;
  disabled?: boolean;
  reduceOpacity?: boolean;
  onRowPress?: () => void;
}

export const PatientRequestRow: React.FC<PatientRequestRowProps> = ({
  generalDetails,
  request,
  time,
  disabled = false,
  reduceOpacity = false,
  onRowPress
}) => {
  return (
    <TouchableOpacity
      onPress={onRowPress}
      disabled={disabled}
      style={{ opacity: reduceOpacity ? 0.2 : 1 }}
    >
      <PatientRowBase
        title={generalDetails.name!}
        subtitleOne={{
          label: "",
          value: request || "Missing request information"
        }}
        riskLevel={generalDetails.riskLevel as RiskLevel}
      >
        {/* Time container */}
        <View style={styles.sideContainer}>
          <H6 text={time || "?"} style={null} />
        </View>
      </PatientRowBase>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  sideContainer: {
    flexDirection: "column",
    paddingTop: "10@ms",
    paddingRight: "10@ms"
  }
});
