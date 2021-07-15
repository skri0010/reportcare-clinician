import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import { PersonRowGeneralDetails } from "models/PersonRowDetails";
import { ScaledSheet } from "react-native-size-matters";

export interface PatientRequestRowProps {
  generalDetails: PersonRowGeneralDetails;
  request?: string;
  time?: string;
  onBottomButtonPress?: () => void;
}

export const PatientRequestRow: React.FC<PatientRequestRowProps> = ({
  generalDetails,
  request,
  time,
  onBottomButtonPress
}) => {
  return (
    <TouchableOpacity>
      <PatientRowBase
        title={generalDetails.name}
        subtitleOne={{
          label: "",
          value: request || "Missing alert information"
        }}
        riskLevel={generalDetails.riskLevel}
        bottomButtonLabel="View Details"
        onBottomButtonPress={onBottomButtonPress}
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
