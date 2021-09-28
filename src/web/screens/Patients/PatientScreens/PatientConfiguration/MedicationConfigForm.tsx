import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";
import { TextField } from "components/InputComponents/TextField";
import i18n from "util/language/i18n";
import {
  notEmptyString,
  validateMedName,
  validateMedDosage,
  validateMedFreq,
  validateMedDosageInput,
  validateMedFreqInput
} from "util/validation";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";
import { RowButton } from "components/Buttons/TextButton";

interface MedicationConfigFormProps {
  configMedInfo: MedInput;
  setConfigMedInfo: (medInfo: MedInput) => void;
  saveMedInput: (medInput: MedInput) => void;
  setAddMedInfo: (state: boolean) => void;
}

export const MedicationConfigForm: FC<MedicationConfigFormProps> = ({
  configMedInfo,
  setConfigMedInfo,
  saveMedInput,
  setAddMedInfo
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Checks for validity of medication info inputs
  const [allMedInputValid, setAllMedInputValid] = useState<boolean>(false);

  // Update medicine name
  const updateMedName = (medName: string) => {
    setConfigMedInfo({ ...configMedInfo, name: medName });
  };

  // Update dosage
  const updateMedDosage = (dosage: string) => {
    if (validateMedDosageInput(dosage)) {
      setConfigMedInfo({ ...configMedInfo, dosage: parseFloat(dosage) });
    } else {
      setConfigMedInfo({ ...configMedInfo, dosage: 0 });
    }
  };

  // Update frequency
  const updateMedFreq = (frequency: string) => {
    if (validateMedFreqInput(frequency)) {
      setConfigMedInfo({ ...configMedInfo, frequency: parseFloat(frequency) });
    } else {
      setConfigMedInfo({ ...configMedInfo, frequency: 0 });
    }
  };

  // Input validations to see if the save button should be enabled or not
  useEffect(() => {
    const medInput =
      validateMedName(configMedInfo.name) &&
      validateMedDosage(configMedInfo.dosage) &&
      validateMedFreq(configMedInfo.frequency);
    setAllMedInputValid(medInput);
  }, [configMedInfo]);

  return (
    <View
      style={[
        styles.form,
        {
          backgroundColor: colors.primaryBackgroundColor
        }
      ]}
    >
      <View>
        {/* Medicine name */}
        <TextField
          label={i18n.t("Patient_Configuration.Label.MedName")}
          value={configMedInfo.name}
          onChange={(medName) => updateMedName(medName)}
          placeholder={i18n.t("Patient_Configuration.Placeholder.MedName")}
          error={
            notEmptyString(configMedInfo.name) &&
            !validateMedName(configMedInfo.name)
          }
          errorMessage={i18n.t("Patient_Configuration.Error.MedName")}
        />
        {/* Medicine Dosage */}
        <TextField
          label={i18n.t("Patient_Configuration.Label.Dosage")}
          value={configMedInfo.dosage === 0 ? "" : `${configMedInfo.dosage}`}
          onChange={(dosage) => updateMedDosage(dosage)}
          placeholder={i18n.t("Patient_Configuration.Placeholder.Dosage")}
          error={
            // notEmptyString(configMedInfo.dosage) &&
            // !validateMedDosage(configMedInfo.dosage)
            validateMedDosage(configMedInfo.dosage)
          }
          errorMessage={i18n.t("Patient_Configuration.Error.Dosage")}
        />
        {/* Medicine Frequency */}
        <TextField
          label={i18n.t("Patient_Configuration.Label.Frequency")}
          value={
            configMedInfo.frequency === 0 ? "" : `${configMedInfo.frequency}`
          }
          onChange={(frequency) => updateMedFreq(frequency)}
          placeholder={i18n.t("Patient_Configuration.Placeholder.Frequency")}
          error={validateMedFreq(configMedInfo.frequency)}
          errorMessage={i18n.t("Patient_Configuration.Error.Frequency")}
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* Save button */}
        <RowButton
          title="Patient_Configuration.Save"
          onPress={() => saveMedInput(configMedInfo)}
          backgroundColor={
            allMedInputValid
              ? colors.acceptButtonColor
              : colors.primaryDeactivatedButtonColor
          }
          disabled={!allMedInputValid}
          width={ms(50)}
          height={ms(20)}
        />

        {/* Cancel button */}
        <RowButton
          title="Patient_Configuration.Cancel"
          onPress={() => setAddMedInfo(false)}
          backgroundColor={colors.primaryBackgroundColor}
          textColor={colors.primaryTextColor}
          borderColor={colors.secondaryBorderColor}
          borderWidth={ms(1)}
          width={ms(50)}
          height={ms(20)}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: "10@ms",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: "60@ms"
  },
  form: {
    paddingHorizontal: "20@ms",
    paddingTop: "5@ms",
    borderRadius: "3@ms"
  }
});
