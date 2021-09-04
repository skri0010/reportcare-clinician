import React, { FC } from "react";
import { View } from "react-native";
import i18n from "util/language/i18n";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface MedicationRowProps {
  medicationItem: MedInput;
  setMedInfoToDelete: (medInfo: MedInput) => void;
}

interface MedicationInfoRowProps {
  title: string;
  content: string;
}

const MedicationInfoRow: FC<MedicationInfoRowProps> = ({ title, content }) => {
  return (
    <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
      <H5 text={title} />
      <H5 text={content} />
    </View>
  );
};

export const MedicationRow: FC<MedicationRowProps> = ({
  medicationItem,
  setMedInfoToDelete
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.primaryBackgroundColor,
        paddingLeft: ms(20),
        paddingVertical: ms(10)
      }}
    >
      <View style={{ flex: 6 }}>
        <MedicationInfoRow
          title={i18n.t("Patient_Configuration.MedicationRow.Name")}
          content={`${medicationItem.name}`}
        />
        <MedicationInfoRow
          title={i18n.t("Patient_Configuration.MedicationRow.Dosage")}
          content={`${medicationItem.dosage} ${i18n.t(
            "Patient_Configuration.Unit.Dosage"
          )}`}
        />
        <MedicationInfoRow
          title={i18n.t("Patient_Configuration.MedicationRow.Frequency")}
          content={`${medicationItem.frequency} ${i18n.t(
            "Patient_Configuration.Unit.Frequency"
          )}`}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end"
        }}
      >
        <Icon.Button
          name="minus-circle"
          color="red"
          backgroundColor="#FFFFFF00"
          onPress={() => setMedInfoToDelete(medicationItem)}
        />
      </View>
    </View>
  );
};
