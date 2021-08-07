import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";
import { H3 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { MedicationInfo } from "aws/models";
import { FlatList, View } from "react-native";
import { mockMedicationRecord } from "mock/mockMedication";
import { MedicationRow } from "./MedicationRow";
import i18n from "util/language/i18n";

interface MedicationTakenProps {
  medications: MedicationInfo[];
}

export const MedicationTakenCard: FC<MedicationTakenProps> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [mockMedications] = useState(mockMedicationRecord);

  return (
    <CardWrapper maxHeight={ms(120)}>
      <View>
        <H3
          text={i18n.t("Patient_Overview.Medications")}
          style={{
            fontWeight: "bold",
            color: colors.primaryTextColor,
            paddingLeft: ms(5),
            paddingBottom: ms(5)
          }}
        />
      </View>
      {/* Not sure what does the tick represent in figma would add that in after confirmation*/}
      <FlatList
        style={{ paddingLeft: ms(10) }}
        showsVerticalScrollIndicator={false}
        data={mockMedications}
        renderItem={({ item }) => <MedicationRow medicationInfo={item} />}
        keyExtractor={(item) => item.id}
      />
    </CardWrapper>
  );
};
