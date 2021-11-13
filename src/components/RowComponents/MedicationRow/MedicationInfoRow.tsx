import React, { FC } from "react";
import { View } from "react-native";
import i18n from "util/language/i18n";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { Unit } from "util/const";

interface MedicationRowProps {
  medicationItem: MedInput;
  setMedInfoToDelete?: (medInfo: MedInput) => void;
}

interface MedicationInfoRowProps {
  title?: string;
  content: string;
}

const MedicationInfoRow: FC<MedicationInfoRowProps> = ({ title, content }) => {
  return (
    <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
      {title ? <H5 text={title} /> : null}
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
          content={`${medicationItem.name}, ${medicationItem.dosage}${
            Unit.DOSAGE
          }, ${medicationItem.frequency} ${i18n.t(
            "Patient_Configuration.FrequencyUnit"
          )}`}
        />
      </View>

      {/* Delete button */}
      {setMedInfoToDelete ? (
        <IconButton
          name="minus-circle"
          type={IconType.MATERIAL_COMMUNITY}
          onPress={() => setMedInfoToDelete(medicationItem)}
          size={fonts.h4Size}
          containerStyle={styles.deleteIconContainer}
          containerBackgroundColor={colors.deleteIconBackgroundColor}
          iconStyle={{ color: colors.deleteIconColor }}
        />
      ) : null}
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
