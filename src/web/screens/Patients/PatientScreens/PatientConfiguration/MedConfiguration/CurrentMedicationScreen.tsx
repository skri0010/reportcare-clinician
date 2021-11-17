import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";
import { H5 } from "components/Text";
import i18n from "util/language/i18n";
import { ScaledSheet } from "react-native-size-matters";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { ModalMedicationList } from "./ModalMedicationList";

interface CurrentMedicationScreenProps {
  addMedication: () => void;
  modifyMedication: (medication: MedInput) => void;
  activeMedications: MedInput[];
  newMedications: MedInput[];
}

export const CurrentMedicationScreen: FC<CurrentMedicationScreenProps> = ({
  addMedication,
  modifyMedication,
  activeMedications,
  newMedications
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={addMedication}
        >
          <MaterialCommunityIcon
            name="plus"
            style={[
              styles.addButton,
              {
                borderColor: colors.acceptButtonColor,
                backgroundColor: colors.acceptButtonColor,
                color: colors.primaryContrastTextColor
              }
            ]}
            size={fonts.h3Size}
          />
          <H5
            text={i18n.t("Patient_Configuration.Medications.AddNewMedication")}
            style={[
              styles.buttonText,
              {
                color: colors.primaryTextColor
              }
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* List of active medications */}
      {activeMedications.length > 0 && (
        <ModalMedicationList
          title={i18n.t("Patient_Configuration.Medications.CurrentMedications")}
          medications={activeMedications}
          onModifyMedication={modifyMedication}
        />
      )}

      {/* List of new medications */}
      {newMedications.length > 0 && (
        <ModalMedicationList
          title={i18n.t("Patient_Configuration.Medications.NewMedications")}
          medications={newMedications}
          onModifyMedication={modifyMedication}
        />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: {
    maxWidth: "90%",
    padding: "3@ms",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "-5@ms"
  },
  buttonText: {
    fontWeight: "600",
    marginLeft: "10@ms",
    alignSelf: "center"
  },
  addButton: {
    borderRadius: "10@ms",
    borderWidth: "1@ms",
    alignSelf: "center"
  }
});
