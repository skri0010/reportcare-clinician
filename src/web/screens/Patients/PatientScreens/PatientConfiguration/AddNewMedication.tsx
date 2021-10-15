import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";
import { TextField } from "components/InputComponents/TextField";
import i18n from "util/language/i18n";
import {
  notEmptyString,
  validateMedName,
  validateMedDosage,
  validateMedFreq
} from "util/validation";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedicationNames, MedInput } from "rc_agents/model";
import { RowButton } from "components/Buttons/RowButton";
import { Picker } from "@react-native-picker/picker";
import { Label } from "components/Text/Label";
import { MedicationInfo } from "./MedicationInfo";
import { H6 } from "components/Text";

interface AddNewMedicationProps {
  configMedInfo: MedInput;
  setConfigMedInfo: (medInfo: MedInput) => void;
  saveMedInput: (medInput: MedInput) => void;
  setMedConfigFormVisible: (state: boolean) => void;
  isAdding: boolean;
}

export const AddNewMedication: FC<AddNewMedicationProps> = ({
  configMedInfo,
  setConfigMedInfo,
  saveMedInput,
  setMedConfigFormVisible,
  isAdding
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const pickerStyle = [
    styles.picker,
    { borderColor: colors.primaryBorderColor }
  ];

  // Checks for validity of medication info inputs
  const [allMedInputValid, setAllMedInputValid] = useState<boolean>(false);

  // Update medicine name
  const updateMedName = (medName: string) => {
    setConfigMedInfo({ ...configMedInfo, name: medName });
  };

  // Update dosage
  const updateMedDosage = (dosage: string) => {
    setConfigMedInfo({ ...configMedInfo, dosage: dosage });
  };

  // Update frequency
  const updateMedFreq = (frequency: string) => {
    setConfigMedInfo({ ...configMedInfo, frequency: frequency });
  };

  // Input validations to see if the save button should be enabled or not
  useEffect(() => {
    const medInput =
      validateMedName(configMedInfo.name) &&
      validateMedDosage(configMedInfo.name, configMedInfo.dosage) &&
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
      {!isAdding ? (
        <View>
          <Label text="Medication Name: " />
          <H6 text={`${configMedInfo.name}`} />
          <MedicationInfo configMedInfo={configMedInfo} isAdding={false} />
        </View>
      ) : (
        <View>
          <Label text="Select Medication To Add: " />
          <Picker
            style={pickerStyle}
            selectedValue={configMedInfo.name}
            onValueChange={(value: string) => {
              updateMedName(value);
            }}
          >
            {Object.entries(MedicationNames).map(([key, value]) => {
              return (
                <Picker.Item
                  key={key}
                  value={value}
                  label={i18n.t(value.toString())}
                />
              );
            })}
          </Picker>
          <MedicationInfo configMedInfo={configMedInfo} isAdding />
        </View>
      )}
      {/* Medicine Dosage */}
      <TextField
        label={i18n.t("Patient_Configuration.Label.Dosage")}
        value={`${configMedInfo.dosage}`}
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
        value={`${configMedInfo.frequency}`}
        onChange={(frequency) => updateMedFreq(frequency)}
        placeholder={i18n.t("Patient_Configuration.Placeholder.Frequency")}
        error={
          notEmptyString(configMedInfo.frequency) &&
          !validateMedFreq(configMedInfo.frequency)
        }
        errorMessage={i18n.t("Patient_Configuration.Error.Frequency")}
      />
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
          onPress={() => setMedConfigFormVisible(false)}
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
  },
  picker: {
    borderWidth: ms(2),
    height: ms(20),
    marginBottom: ms(5),
    justifyContent: "center"
  },
  pickerItem: {
    fontWeight: "300"
  }
});
