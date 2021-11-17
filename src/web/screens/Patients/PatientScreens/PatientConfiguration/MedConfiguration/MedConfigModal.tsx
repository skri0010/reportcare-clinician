import React, { FC, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedInput, PatientDetails } from "rc_agents/model";
import { H4 } from "components/Text";
import { CurrentMedicationScreen } from "./CurrentMedicationScreen";
import { ModifyMedicationScreen } from "./ModifyMedicationScreen";
import i18n from "util/language/i18n";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface MedConfigModalProps {
  details: PatientDetails;
  configMedInfo: MedInput;
  setConfigMedInfo: (medInfo: MedInput) => void;
  saveMedication: (medication: MedInput) => void;
  removeMedication: (medication: MedInput) => void;
  setMedConfigModalVisible: (state: boolean) => void;
  activeMedications: MedInput[];
  newMedications: MedInput[];
  showDefaultScreen: boolean;
  setShowDefaultScreen: (show: boolean) => void;
}

export const MedConfigModal: FC<MedConfigModalProps> = ({
  details,
  configMedInfo,
  setConfigMedInfo,
  saveMedication,
  removeMedication,
  setMedConfigModalVisible,
  activeMedications,
  newMedications,
  showDefaultScreen,
  setShowDefaultScreen
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // To keep track of current dosage of a medication for display purposes
  const [currentDosage, setCurrentDosage] = useState<string | undefined>(
    undefined
  );

  // To keep track for whether new medication is being added
  const [addNewMedication, setAddNewMedication] = useState<boolean>(false);

  // Side effect when medication to configure is updated
  useEffect(() => {
    // Check whether medication is currently active
    const medIndex = details.medicationInfos.findIndex(
      (m) => m.name === configMedInfo.name
    );
    if (medIndex >= 0) {
      // Medication is active
      modifyMedication(details.medicationInfos[medIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configMedInfo.name, details.medicationInfos]);

  // Shows the screen for modifying existing medication
  const modifyMedication = (medication: MedInput) => {
    setShowDefaultScreen(false);
    setAddNewMedication(false);
    setConfigMedInfo(medication);
    setCurrentDosage(medication.dosage);
  };

  // Shows the screen for prescribing new medication
  const addMedication = () => {
    setShowDefaultScreen(false);
    setAddNewMedication(true);
    setConfigMedInfo({
      name: "",
      dosage: "",
      frequency: "",
      patientID: details.patientInfo.patientID,
      active: true
    });
    setCurrentDosage(undefined);
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
          text={i18n.t("Patient_Configuration.Medications.ConfigureMedication")}
          style={styles.title}
        />
        <TouchableOpacity
          onPress={() => {
            // Reset medication
            setConfigMedInfo({
              name: "",
              dosage: "",
              frequency: "",
              patientID: details.patientInfo.patientID,
              active: true
            });
            setShowDefaultScreen(true);
            setMedConfigModalVisible(false);
          }}
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
        <CurrentMedicationScreen
          addMedication={addMedication}
          modifyMedication={modifyMedication}
          activeMedications={activeMedications}
          newMedications={newMedications}
        />
        <View
          style={{
            flex: 2
          }}
        >
          {!showDefaultScreen && (
            <ModifyMedicationScreen
              configMedInfo={configMedInfo}
              setConfigMedInfo={setConfigMedInfo}
              saveMedication={saveMedication}
              removeMedication={removeMedication}
              setShowDefaultScreen={setShowDefaultScreen}
              isAdding={addNewMedication}
              currentDosage={currentDosage}
              allMedications={activeMedications.concat(newMedications)}
            />
          )}
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
