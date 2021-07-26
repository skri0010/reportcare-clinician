import React from "react";
import { View, TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import { PersonRowGeneralDetails } from "models/PersonRowDetails";
import { ScaledSheet } from "react-native-size-matters";
import { H7 } from "components/Text/index";

export interface PatientRequestRowProps {
  generalDetails: PersonRowGeneralDetails;
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
        title={generalDetails.name}
        subtitleOne={{
          label: "",
          value: request || "Missing request information"
        }}
        riskLevel={generalDetails.riskLevel}
      >
        {/* Time container */}
        <View style={styles.sideContainer}>
          <H7 text={time || "?"} style={null} />
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
