import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms } from "react-native-size-matters";
import { H4 } from "components/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MedInput } from "rc_agents/model";

interface MedicationRowProps {
  medicationInfo: MedInput;
}

export const MedicationRow: FC<MedicationRowProps> = ({ medicationInfo }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  function validateMeds() {
    if (medicationInfo.records) {
      const recordObject = JSON.parse(medicationInfo.records);
      const meds = recordObject[new Date().toDateString()] as string[] | null;
      if (meds) {
        if (meds.length === parseFloat(medicationInfo.frequency)) {
          return true;
        }
      }
    }
    return false;
  }

  const medicineTaken = validateMeds();

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
