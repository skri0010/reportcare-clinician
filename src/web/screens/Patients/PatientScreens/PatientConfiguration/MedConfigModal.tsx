import React, { FC, useState } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedInput, PatientDetails } from "rc_agents/model";
import { H4 } from "components/Text";
import { MedicationList } from "./MedicationList";
import { AddNewMedication } from "./AddNewMedication";
import i18n from "util/language/i18n";

interface MedConfigModalProps {
  details: PatientDetails;
  configMedInfo: MedInput;
  setConfigMedInfo: (medInfo: MedInput) => void;
  saveMedInput: (medInput: MedInput) => void;
  setMedConfigFormVisible: (state: boolean) => void;
}

export const MedConfigModal: FC<MedConfigModalProps> = ({
  details,
  configMedInfo,
  setConfigMedInfo,
  saveMedInput,
  setMedConfigFormVisible
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [medToUpdate, setMedToUpdate] = useState<MedInput | undefined>(
    undefined
  );

  const [addingNewMed, setAddingNewMed] = useState<boolean>(false);

  const updateMed = (medInfo: MedInput) => {
    setAddingNewMed(false);
    setConfigMedInfo(medInfo);
    setMedToUpdate(medInfo);
  };

  const addMed = () => {
    setMedToUpdate(undefined);
    setAddingNewMed(true);
    setConfigMedInfo({
      name: "",
      dosage: "",
      frequency: "",
      patientID: details.patientInfo.id
    });
  };

  return (
    <View
      style={[
        styles.form,
        {
          backgroundColor: colors.primaryBackgroundColor,
          flexDirection: "column",
          height: "100%",
          width: "100%"
        }
      ]}
    >
      <H4
        text={i18n.t("Patient_Configuration.Medications.MedicationForm")}
        style={{ fontWeight: "bold" }}
      />
      <View style={styles.container}>
        <MedicationList
          setAddNewMed={addMed}
          details={details}
          setMedToUpdate={updateMed}
        />
        <View
          style={{
            flex: 1
          }}
        >
          {addingNewMed ? (
            <AddNewMedication
              configMedInfo={configMedInfo}
              setConfigMedInfo={setConfigMedInfo}
              saveMedInput={saveMedInput}
              setMedConfigFormVisible={setMedConfigFormVisible}
              isAdding
            />
          ) : medToUpdate ? (
            <AddNewMedication
              configMedInfo={configMedInfo}
              setConfigMedInfo={setConfigMedInfo}
              saveMedInput={saveMedInput}
              setMedConfigFormVisible={setMedConfigFormVisible}
              isAdding={false}
            />
          ) : undefined}
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "row", maxHeight: "90%" },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: "10@ms",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: "25@ms"
  },
  form: {
    paddingHorizontal: "3@ms",
    paddingTop: "3@ms"
  }
});
