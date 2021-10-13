import React, { FC, useState } from "react";
import { View } from "react-native";
import { H4, H5 } from "components/Text";
import { MedInput } from "rc_agents/model";
import i18n from "util/language/i18n";
import { RowButton } from "components/Buttons/TextButton";

interface MedInfoRowProps {
  medicationInfo: MedInput;
  updateMedInfo: (medInfo: MedInput) => void;
}

export const MedInfoRow: FC<MedInfoRowProps> = ({
  medicationInfo,
  updateMedInfo
}) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", padding: "5@ms" }}
    >
      <H5 text={`${medicationInfo.name} `} />
      <H5
        text={i18n.t("Patient_Configuration.MedInfo.CurrentDosage")}
        style={{ padding: "5@ms" }}
      />
      <H5 text={`${medicationInfo.dosage}`} />
      <RowButton title="Modify" onPress={() => updateMedInfo(medicationInfo)} />
    </View>
  );
};
