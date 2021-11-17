import React, { FC } from "react";
import { View } from "react-native";
import { H5, H7 } from "components/Text";
import { MedInput } from "rc_agents/model";
import i18n from "util/language/i18n";
import { RowButton } from "components/Buttons/RowButton";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { Unit } from "util/const";

interface ModalMedicationRowProps {
  medication: MedInput;
  onModifyMedication: (medication: MedInput) => void;
}

export const ModalMedicationRow: FC<ModalMedicationRowProps> = ({
  medication,
  onModifyMedication
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primaryWebBackgroundColor }
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.medicationContainer}>
          <H5 text={`${medication.name}`} style={styles.medicationName} />
          <H7
            text={`${i18n.t("Patient_Configuration.Medications.Dosage")}: ${
              medication.dosage
            }${Unit.DOSAGE}`}
          />
        </View>
        <View style={styles.modifyButtonContainer}>
          <RowButton
            title={i18n.t("DetailsUpdate.Modify")}
            onPress={() => onModifyMedication(medication)}
            fontSize={fonts.h6Size}
          />
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "3@ms"
  },
  contentContainer: {
    margin: "5@ms",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  medicationContainer: { flexDirection: "column", flex: 3 },
  medicationName: {
    fontWeight: "600"
  },
  modifyButtonContainer: {
    alignItems: "flex-end"
  }
});
