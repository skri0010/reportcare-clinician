import React, { FC } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { RootState, select } from "util/useRedux";
import { MedInput, PatientDetails } from "rc_agents/model";
import { MedInfoRow } from "./MedInfoRow";
import { H5 } from "components/Text";
import i18n from "util/language/i18n";
import { ScaledSheet } from "react-native-size-matters";

interface MedicationListProps {
  setAddNewMed: () => void;
  setMedToUpdate: (medToUpdate: MedInput) => void;
  details: PatientDetails;
}

export const MedicationList: FC<MedicationListProps> = ({
  setAddNewMed,
  setMedToUpdate,
  details
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const activeMedications = details.medicationInfo.length > 0;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primaryContrastTextColor
      }}
    >
      <View style={styles.buttonContainer}>
        <View>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: colors.primaryButtonColor
              }
            ]}
            onPress={setAddNewMed}
          >
            <H5
              text={i18n.t("Patient_Configuration.Medications.AddNewMed")}
              style={[
                styles.buttonText,
                {
                  color: colors.primaryContrastTextColor
                }
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <H5
        text={i18n.t("Patient_Configuration.Medications.ListActiveMed")}
        style={{
          fontWeight: "600",
          paddingBottom: 10,
          paddingTop: 20
        }}
      />
      {activeMedications ? (
        <FlatList
          data={details.medicationInfo}
          renderItem={({ item }) => (
            <MedInfoRow medicationInfo={item} updateMedInfo={setMedToUpdate} />
          )}
        />
      ) : (
        <H5 text="There are no active medications currently" />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    height: "70%",
    width: "80%",
    borderRadius: "5@ms",
    alignItems: "center",
    margin: "5@ms",
    paddingBottom: "3@ms",
    paddingHorizontal: "5@ms"
  },
  buttonContainer: {
    paddingHorizontal: "10@ms",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    padding: "3@ms",
    paddingBottom: "3@ms",
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    opacity: 0.9
  }
});
