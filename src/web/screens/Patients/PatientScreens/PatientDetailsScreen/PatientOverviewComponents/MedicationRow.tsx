import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms } from "react-native-size-matters";
import { H5 } from "components/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MedInfoCompliants, MedInput } from "rc_agents/model";

interface MedicationRowProps {
  medicationInfo: MedInput;
  date: Date;
}

export const MedicationRow: FC<MedicationRowProps> = ({
  medicationInfo,
  date
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  function validateMeds() {
    if (medicationInfo.records) {
      const recordObject: MedInfoCompliants = JSON.parse(
        medicationInfo.records
      );
      const meds = recordObject[date.toDateString()] as string[] | null;
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
      <H5
        text={medicationInfo.name}
        style={{ marginLeft: ms(5), marginBottom: ms(3) }}
      />
    </View>
  );
};
