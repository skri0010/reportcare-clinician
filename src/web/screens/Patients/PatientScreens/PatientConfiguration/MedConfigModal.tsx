import React, { FC, useState } from "react";
import { View } from "react-native";
import i18n from "util/language/i18n";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedInput, PatientDetails } from "rc_agents/model";
import { H4, H5, H6 } from "components/Text";
import { MedicationList } from "./MedicationList";
import { AddNewMedication } from "./AddNewMedication";
import { NoSelectionScreen } from "web/screens/Shared/NoSelectionScreen";
import { ScreenName } from "web/navigation";

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
    setConfigMedInfo(medInfo);
    setMedToUpdate(medInfo);
  };

  return (
    <View
      style={[
        styles.form,
        {
          backgroundColor: colors.primaryBackgroundColor
        }
      ]}
    >
      <H4 text="Medication Form" style={{ fontWeight: "bold" }} />
      <View style={styles.container}>
        <MedicationList
          setAddNewMed={setAddingNewMed}
          details={details}
          setMedToUpdate={updateMed}
        />
        <View
          style={{
            flex: 2,
            backgroundColor: colors.primaryWebBackgroundColor
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
          ) : (
            <NoSelectionScreen
              screenName={ScreenName.PATIENTS}
              subtitle="Select medication to modify or add"
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "row", height: "100%" },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: "10@ms",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: "60@ms"
  },
  form: {
    paddingHorizontal: "10@ms",
    paddingTop: "5@ms",
    borderRadius: "3@ms"
  }
});
