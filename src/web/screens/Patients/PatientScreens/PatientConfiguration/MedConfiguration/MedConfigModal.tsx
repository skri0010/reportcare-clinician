import React, { FC, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedInput, PatientDetails } from "rc_agents/model";
import { H4 } from "components/Text";
import { MedicationList } from "./MedicationList";
import { AddNewMedication } from "./AddNewMedication";
import i18n from "util/language/i18n";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface MedConfigModalProps {
  details: PatientDetails;
  configMedInfo: MedInput;
  setConfigMedInfo: (medInfo: MedInput) => void;
  saveMedInput: (medInput: MedInput) => void;
  setMedConfigFormVisible: (state: boolean) => void;
  localMedInfos: MedInput[];
}

export const MedConfigModal: FC<MedConfigModalProps> = ({
  details,
  configMedInfo,
  setConfigMedInfo,
  saveMedInput,
  setMedConfigFormVisible,
  localMedInfos
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const [medToUpdate, setMedToUpdate] = useState<MedInput | undefined>(
    undefined
  );

  const [currentDosage, setCurrentDosage] = useState<string | undefined>(
    undefined
  );

  const [addingNewMed, setAddingNewMed] = useState<boolean>(false);

  const updateMed = (medInfo: MedInput) => {
    setAddingNewMed(false);
    setConfigMedInfo(medInfo);
    setMedToUpdate(medInfo);
    setCurrentDosage(medInfo.dosage);
  };

  const addMed = () => {
    setMedToUpdate(undefined);
    setAddingNewMed(true);
    setConfigMedInfo({
      name: "",
      dosage: "",
      frequency: "",
      patientID: details.patientInfo.patientID,
      active: true
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
      <View style={styles.titleContainer}>
        <H4
          text={i18n.t("Patient_Configuration.Medications.MedicationForm")}
          style={styles.title}
        />
        <TouchableOpacity
          onPress={() => setMedConfigFormVisible(false)}
          style={styles.closeButton}
        >
          <Icon
            name="close"
            size={fonts.h3Size}
            style={{ color: colors.primaryTextColor }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <MedicationList
          setAddNewMed={addMed}
          details={details}
          setMedToUpdate={updateMed}
          localMedInfos={localMedInfos}
        />
        <View
          style={{
            flex: 2
          }}
        >
          {addingNewMed ? (
            <AddNewMedication
              details={details}
              configMedInfo={configMedInfo}
              setConfigMedInfo={setConfigMedInfo}
              saveMedInput={saveMedInput}
              setMedConfigFormVisible={setMedConfigFormVisible}
              isAdding
              localMedInfos={localMedInfos}
            />
          ) : medToUpdate ? (
            <AddNewMedication
              details={details}
              configMedInfo={configMedInfo}
              setConfigMedInfo={setConfigMedInfo}
              saveMedInput={saveMedInput}
              setMedConfigFormVisible={setMedConfigFormVisible}
              isAdding={false}
              currentDosage={currentDosage}
              localMedInfos={localMedInfos}
            />
          ) : undefined}
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "row", maxHeight: "90%", flex: 1 },
  closeButton: {
    alignSelf: "flex-end",
    justifyContent: "space-evenly",
    margin: "10@ms"
  },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: "10@ms",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: "25@ms"
  },
  form: {
    paddingHorizontal: "1@ms",
    paddingTop: "3@ms"
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    margin: "10@ms",
    alignItems: "center",
    flex: 1
  }
});
