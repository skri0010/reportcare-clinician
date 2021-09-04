import React, { FC, useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextField } from "components/InputComponents/TextField";
import i18n from "util/language/i18n";
import {
  notEmptyString,
  validateMedName,
  validateMedDosage,
  validateMedFreq
} from "util/validation";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";

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

  const [allMedInputValid, setAllMedInputValid] = useState<boolean>(false);

  // Medication info
  const updateMedName = (medName: string) => {
    setConfigMedInfo({ ...configMedInfo, name: medName });
  };

  const updateMedDosage = (dosage: string) => {
    setConfigMedInfo({ ...configMedInfo, dosage: dosage });
  };

  const updateMedFreq = (frequency: string) => {
    setConfigMedInfo({ ...configMedInfo, frequency: frequency });
  };

  useEffect(() => {
    const medInput =
      validateMedName(configMedInfo.name) &&
      validateMedDosage(configMedInfo.dosage) &&
      validateMedFreq(configMedInfo.frequency);
    setAllMedInputValid(medInput);
  }, [configMedInfo]);

  return (
    <View
      style={{
        backgroundColor: colors.primaryBackgroundColor,
        paddingHorizontal: ms(20),
        paddingTop: ms(5),
        borderRadius: ms(3)
      }}
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
          value={configMedInfo.dosage}
          onChange={(dosage) => updateMedDosage(dosage)}
          placeholder={i18n.t("Patient_Configuration.Placeholder.Dosage")}
          error={
            notEmptyString(configMedInfo.dosage) &&
            !validateMedDosage(configMedInfo.dosage)
          }
          errorMessage={i18n.t("Patient_Configuration.Error.Dosage")}
        />
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
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: ms(10),
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingHorizontal: ms(60)
        }}
      >
        <TouchableOpacity
          // on save, add the medication into medication list and display, clear the previous input
          onPress={() => saveMedInput(configMedInfo)}
          disabled={!allMedInputValid}
          style={{
            backgroundColor: allMedInputValid
              ? colors.acceptButtonColor
              : colors.primaryDeactivatedButtonColor,
            height: ms(20),
            width: ms(50),
            borderRadius: ms(5),
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <H5
            text={i18n.t("Patient_Configuration.Save")}
            style={{ color: colors.primaryContrastTextColor }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // on save, add the medication into medication list and display, clear the previous input
          onPress={() => setAddMedInfo(false)}
          style={{
            backgroundColor: colors.primaryBackgroundColor,
            borderColor: colors.secondaryBorderColor,
            height: ms(20),
            width: ms(50),
            borderRadius: ms(5),
            borderWidth: ms(1),
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <H5
            text={i18n.t("Patient_Configuration.Cancel")}
            style={{ color: colors.primaryTextColor }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
