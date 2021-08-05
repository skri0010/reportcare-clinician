import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";
import { H3, H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { MedicationInfo } from "aws/models";
import { FlatList, View } from "react-native";
import { mockMedicationRecord } from "mock/mockMedication";

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
          text="Medication Taken"
          style={{ fontWeight: "bold", color: colors.primaryTextColor }}
        />
      </View>
      {/* Not sure what does the tick represent in figma would add that in after confirmation*/}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={mockMedications}
        renderItem={({ item }) => (
          <H4 text={`  ${item.medname}`} style={null} />
        )}
        keyExtractor={(item) => item.id}
      />
    </CardWrapper>
  );
};
