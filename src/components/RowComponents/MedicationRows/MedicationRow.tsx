import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H6 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { Unit } from "util/const";
import i18n from "util/language/i18n";

interface MedicationRowProps {
  medicationItem: MedInput;
  onRemoveMedication: (medication: MedInput) => void;
}

export const MedicationRow: FC<MedicationRowProps> = ({
  medicationItem,
  onRemoveMedication
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
      <View style={styles.medInfoContainer}>
        <H6
          text={`${medicationItem.name}, ${medicationItem.dosage}${
            Unit.DOSAGE
          }, ${medicationItem.frequency} ${i18n.t(
            "Patient_Configuration.Medications.FrequencyUnit"
          )}`}
          style={styles.medInfo}
        />
      </View>

      <IconButton
        name="minus-circle"
        type={IconType.MATERIAL_COMMUNITY}
        onPress={() => onRemoveMedication(medicationItem)}
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
  },
  medInfoContainer: {
    flex: 6,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  medInfo: {
    alignSelf: "center"
  }
});
