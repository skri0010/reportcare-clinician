import React, { FC } from "react";
import { View } from "react-native";
import i18n from "util/language/i18n";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";
import { IconButton, IconType } from "components/Buttons/IconButton";

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
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primaryBackgroundColor }
      ]}
    >
      {/* Medicatio info */}
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

      {/* Delete button */}
      <IconButton
        name="minus-circle"
        type={IconType.MATERIAL_COMMUNITY}
        onPress={() => setMedInfoToDelete(medicationItem)}
        size={fonts.h4Size}
        containerStyle={styles.deleteIconContainer}
        containerBackgroundColor={colors.deleteIconBackgroundColor}
        iconStyle={{ color: colors.deleteIconColor }}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: "20@ms",
    paddingVertical: "10@ms"
  },
  deleteIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: "15@ms"
  }
});