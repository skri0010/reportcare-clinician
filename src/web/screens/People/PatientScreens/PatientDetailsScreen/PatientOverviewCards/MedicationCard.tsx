import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";
import { H3, H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { MedicationInfo } from "aws/models";
import { FlatList, View } from "react-native";
import { mockMedicationRecord } from "mock/mockMedication";
import { MedicationRow } from "./MedicationRow";
import i18n from "util/language/i18n";

interface MedicationTakenProps {
  medications: MedicationInfo[];
  maxHeight: number;
  minHeight: number;
}

export const MedicationTakenCard: FC<MedicationTakenProps> = ({
  maxHeight,
  minHeight
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

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
