import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms } from "react-native-size-matters";
import { H4 } from "components/Text/index";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MedicationInfo } from "aws/API";

interface MedicationRowProps {
  medicationInfo: MedicationInfo;
}

export const MedicationRow: FC<MedicationRowProps> = ({ medicationInfo }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* JQ-TODO Add a checking here to see if the patient has taken the medicine */}
      {/* ie {medicineTaken?(<Icon name="check" color={colors.primaryButtonColor} size={ms(15)} />):(<View style={{ paddingLeft: ms(15) }} />)} */}
      <Icon name="check" color={colors.primaryButtonColor} size={ms(15)} />
      <H4 text={`  ${medicationInfo.medname}`} style={null} />
    </View>
  );
};
