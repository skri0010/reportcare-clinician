import React, { FC, useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { TextField } from "components/InputComponents/TextField";
import i18n from "util/language/i18n";
import {
  notEmptyString,
  validateMedName,
  validateMedDosage,
  validateMedFreq
} from "util/validation";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedicationNames, MedInput } from "rc_agents/model";
import { RowButton } from "components/Buttons/RowButton";
import { Picker } from "@react-native-picker/picker";
import { Label } from "components/Text/Label";
import { MedicationDetails } from "./MedicationDetails";
import { H6 } from "components/Text";
import { SaveAndCancelButtons } from "components/Buttons/SaveAndCancelButtons";

interface ModifyMedicationScreenProps {
  configMedInfo: MedInput;
  setConfigMedInfo: (configMedInfo: MedInput) => void;
  saveMedication: (medication: MedInput) => void;
  removeMedication: (medication: MedInput) => void;
  isAdding: boolean;
  currentDosage?: string;
  allMedications: MedInput[];
  setShowDefaultScreen: (state: boolean) => void;
}

export const ModifyMedicationScreen: FC<ModifyMedicationScreenProps> = ({
  configMedInfo,
  setConfigMedInfo,
  saveMedication,
  removeMedication,
  isAdding,
  currentDosage,
  allMedications,
  setShowDefaultScreen
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const pickerStyle = [
    styles.picker,
    { borderColor: colors.primaryBorderColor }
  ];

  // Checks for validity of medication info inputs
  const [allMedInputValid, setAllMedInputValid] = useState<boolean>(false);

  // Update medicine name
  const updateMedName = (medName: string) => {
    setConfigMedInfo({
      ...configMedInfo,
      name: medName
    });
  };

  // Update dosage
  const updateMedDosage = (dosage: string) => {
    setConfigMedInfo({ ...configMedInfo, dosage: dosage });
  };

  // Update frequency
  const updateMedFreq = (frequency: string) => {
    setConfigMedInfo({ ...configMedInfo, frequency: frequency });
  };

  // Side effect when medication details are updated
  useEffect(() => {
    const medInput =
      validateMedName(configMedInfo.name) &&
      validateMedDosage(configMedInfo.name, configMedInfo.dosage) &&
      validateMedFreq(configMedInfo.frequency);
    setAllMedInputValid(medInput);
  }, [configMedInfo]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.form,
        {
          backgroundColor: colors.primaryBackgroundColor
        }
      ]}
    >
      {!isAdding && currentDosage ? (
        <View>
          <Label
            text={i18n.t(
              "Patient_Configuration.Medications.ModifyingMedication"
            )}
            style={styles.titleText}
          />
          <View style={styles.medicationRow}>
            <View style={styles.medicationText}>
              <Label
                text={`${i18n.t(
                  "Patient_Configuration.Medications.MedicationName"
                )}:`}
              />
              <H6 text={configMedInfo.name} style={styles.medicationName} />
            </View>
            <View style={styles.removeButtonContainer}>
              <RowButton
                fontSize={fonts.h6Size}
                backgroundColor={colors.declineButtonColor}
                title={i18n.t("DetailsUpdate.Remove")}
                onPress={() => removeMedication(configMedInfo)}
              />
            </View>
          </View>
          <MedicationDetails
            medication={configMedInfo}
            currentDosage={currentDosage}
          />
        </View>
      ) : (
        <View>
          <Label
            text={i18n.t(
              "Patient_Configuration.Medications.PrescribingNewMedication"
            )}
            style={styles.titleText}
          />
          <Label
            text={i18n.t("Patient_Configuration.Medications.SelectMedication")}
          />
          <Picker
            style={pickerStyle}
            onValueChange={(value: string) => {
              updateMedName(value);
            }}
          >
            {Object.entries(MedicationNames).map(([key, value]) => {
              const existingMedication = allMedications.some(
                (t) => t.name === value
              );

              if (existingMedication) {
                return null;
              }
              return (
                <Picker.Item
                  key={key}
                  value={value}
                  label={i18n.t(value.toString())}
                />
              );
            })}
          </Picker>
          <MedicationDetails medication={configMedInfo} />
        </View>
      )}
      {/* Medicine Dosage */}
      <TextField
        label={i18n.t("Patient_Configuration.Label.Dosage")}
        value={configMedInfo.dosage}
        onChange={(dosage) => updateMedDosage(dosage)}
        placeholder={i18n.t("Patient_Configuration.Placeholder.Dosage")}
        error={
          notEmptyString(configMedInfo.dosage) &&
          !validateMedDosage(configMedInfo.name, configMedInfo.dosage)
        }
        errorMessage={i18n.t("Patient_Configuration.Error.Dosage")}
      />
      {/* Medicine Frequency */}
      <TextField
        label={i18n.t("Patient_Configuration.Label.Frequency")}
        value={configMedInfo.frequency}
        onChange={(frequency) => updateMedFreq(frequency)}
        placeholder={i18n.t("Patient_Configuration.Placeholder.Frequency")}
        error={
          notEmptyString(configMedInfo.frequency) &&
          !validateMedFreq(configMedInfo.frequency)
        }
        errorMessage={i18n.t("Patient_Configuration.Error.Frequency")}
      />
      <SaveAndCancelButtons
        onPressSave={() => saveMedication(configMedInfo)}
        onPressCancel={() => setShowDefaultScreen(true)}
        validToSave={allMedInputValid}
      />
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  form: {
    paddingHorizontal: "3@ms",
    borderRadius: "3@ms",
    paddingLeft: "15@ms",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    flexWrap: "wrap"
  },
  picker: {
    borderWidth: "2@ms",
    height: "20@ms",
    marginBottom: "5@ms",
    justifyContent: "center"
  },
  pickerItem: {
    fontWeight: "300"
  },
  titleText: {
    textAlign: "center",
    textDecorationLine: "underline"
  },
  medicationRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  medicationText: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline"
  },
  medicationName: {
    marginLeft: "5@ms"
  },
  removeButtonContainer: {
    alignItems: "flex-end",
    flex: 1
  }
});
