import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { FlatList } from "react-native";
import { MedicationRow } from "./MedicationRow";
import i18n from "util/language/i18n";
import { MedInput } from "rc_agents/model";

interface MedicationTakenProps {
  medications: MedInput[];
  maxHeight: number;
  minHeight: number;
}

export const MedicationTakenCard: FC<MedicationTakenProps> = ({
  medications,
  maxHeight,
  minHeight
}) => {
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
        data={medications}
        renderItem={({ item }) => <MedicationRow medicationInfo={item} />}
        keyExtractor={(item) => item.name}
      />
    </CardWrapper>
  );
};
