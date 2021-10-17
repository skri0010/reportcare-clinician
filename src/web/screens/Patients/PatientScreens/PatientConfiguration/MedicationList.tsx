import React, { FC } from "react";
import { FlatList, View } from "react-native";
import { RootState, select } from "util/useRedux";
import { RowButton } from "components/Buttons/RowButton";
import { MedInput, PatientDetails } from "rc_agents/model";
import { MedInfoRow } from "./MedInfoRow";
import { H5 } from "components/Text";
import i18n from "util/language/i18n";

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primaryContrastTextColor
      }}
    >
      <RowButton
        title={i18n.t("Patient_Configuration.Medications.AddNewMed")}
        onPress={() => setAddNewMed()}
      />
      <H5
        text={i18n.t("Patient_Configuration.Medications.ListActiveMed")}
        style={{
          fontWeight: "600",
          paddingBottom: 10,
          paddingTop: 20
        }}
      />
      <FlatList
        data={details.medicationInfo}
        renderItem={({ item }) => (
          <MedInfoRow medicationInfo={item} updateMedInfo={setMedToUpdate} />
        )}
      />
    </View>
  );
};
