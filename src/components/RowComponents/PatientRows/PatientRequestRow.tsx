import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import { PersonRowGeneralDetails } from "models/PersonRowDetails";
import { ScaledSheet } from "react-native-size-matters";

export interface PatientRequestRowProps {
  generalDetails: PersonRowGeneralDetails;
  request?: string;
  time?: string;
  onRowPress?: () => void;
}

export const PatientRequestRow: React.FC<PatientRequestRowProps> = ({
  generalDetails,
  request,
  time,
  onRowPress
}) => {
  return (
    <TouchableOpacity onPress={onRowPress}>
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
          <Text>{time || "?"}</Text>
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
