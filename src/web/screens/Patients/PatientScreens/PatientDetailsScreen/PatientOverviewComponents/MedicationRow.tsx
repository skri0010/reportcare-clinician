import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms } from "react-native-size-matters";
import { H4 } from "components/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MedicationInfo } from "aws/API";

interface MedicationRowProps {
  medicationInfo: MedicationInfo;
}

export const MedicationRow: FC<MedicationRowProps> = ({ medicationInfo }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  function validateMeds() {
    const recordObject = JSON.parse(medicationInfo.records);
    const dateKey = new Date().toDateString();
    if (recordObject[dateKey].length === medicationInfo.dosage) {
      return true;
    }
  }

  const medicineTaken = validateMeds();

  console.log(medicineTaken);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {medicineTaken ? (
        <Icon name="check" color={colors.acceptButtonColor} size={ms(15)} />
      ) : (
        <Icon name="close" color={colors.deleteIconColor} size={ms(15)} />
      )}
      <H4 text={`  ${medicationInfo.name}`} style={null} />
    </View>
  );
};
