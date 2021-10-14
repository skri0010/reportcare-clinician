import React, { FC, useState } from "react";
import { FlatList, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { RowButton } from "components/Buttons/TextButton";
import { MedInput, PatientDetails } from "rc_agents/model";
import { MedInfoRow } from "./MedInfoRow";
import { H5 } from "components/Text";

interface MedicationListProps {
  setAddNewMed: (setAdding: boolean) => void;
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
        title="Add New Medication"
        onPress={() => setAddNewMed(true)}
      />
      <H5
        text="List of active medications: "
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
