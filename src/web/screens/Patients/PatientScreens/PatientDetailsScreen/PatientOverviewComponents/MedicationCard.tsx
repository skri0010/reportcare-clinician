import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { FlatList } from "react-native";
import { MedicationRow } from "./MedicationRow";
import i18n from "util/language/i18n";
import { MedInput } from "rc_agents/model";

interface MedicationTakenProps {
  medications: MedInput[];
  flex?: number;
  maxHeight: number;
  minHeight: number;
}

export const MedicationTakenCard: FC<MedicationTakenProps> = ({
  medications,
  maxHeight,
  minHeight,
  flex
}) => {
  return (
    <CardWrapper
      maxHeight={maxHeight}
      minHeight={minHeight}
      title={i18n.t("Patient_Overview.Medications")}
      flex={flex}
    >
      {/* Medication List */}
      <FlatList
        style={{ paddingLeft: ms(10), paddingTop: ms(5) }}
        showsVerticalScrollIndicator={false}
        data={medications}
        renderItem={({ item }) =>
          item.active ? <MedicationRow medicationInfo={item} /> : null
        }
        keyExtractor={(item) => item.name}
      />
    </CardWrapper>
  );
};
