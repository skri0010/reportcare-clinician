import React, { FC, useState } from "react";
import { ms } from "react-native-size-matters";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { FlatList } from "react-native";
import { mockMedicationRecord } from "mock/mockMedication";
import { MedicationRow } from "./MedicationRow";
import i18n from "util/language/i18n";
import { MedicationInfo } from "aws/API";

interface MedicationTakenProps {
  medications: MedicationInfo[];
  maxHeight: number;
  minHeight: number;
}

export const MedicationTakenCard: FC<MedicationTakenProps> = ({
  maxHeight,
  minHeight
}) => {
  const [mockMedications] = useState(mockMedicationRecord);

  return (
    <CardWrapper
      maxHeight={maxHeight}
      minHeight={minHeight}
      title={i18n.t("Patient_Overview.Medications")}
    >
      {/* Medication List */}
      <FlatList
        style={{ paddingLeft: ms(10), paddingTop: ms(5) }}
        showsVerticalScrollIndicator={false}
        data={mockMedications}
        renderItem={({ item }) => <MedicationRow medicationInfo={item} />}
        keyExtractor={(item) => item.id}
      />
    </CardWrapper>
  );
};
