import React, { FC, useState } from "react";
import { FlatList, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedInput, PatientDetails } from "rc_agents/model";
import { RowButton } from "components/Buttons/TextButton";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { MedicationRow } from "../PatientDetailsScreen/PatientOverviewComponents/MedicationRow";
import { MedInfoRow } from "./MedInfoRow";

interface MedicationListProps {
  details: PatientDetails;
  updateMed: (medInfo: MedInput) => void;
}

export const MedicationList: FC<MedicationListProps> = ({
  details,
  updateMed
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primaryContrastTextColor,
        padding: "10@ms"
      }}
    >
      <RowButton title="Add Medication" onPress={() => null} />
      <FlatList
        style={{ flex: 1 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
        data={details.medicationInfo}
        renderItem={({ item }) => (
          <MedInfoRow medicationInfo={item} updateMedInfo={updateMed} />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};
