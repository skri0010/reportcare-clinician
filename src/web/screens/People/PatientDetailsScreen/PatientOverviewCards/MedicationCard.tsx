import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";
import { H3, H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { MedicationInfo } from "aws/models";
import { FlatList, View } from "react-native";
import { mockMedicationRecord } from "mock/mockMedication";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
          text={i18n.t("Patient_Overview.MedicationTaken")}
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
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Add a checking here to see if the patient has taken the medicine */}
            {/* {medicineTaken?(<Icon name="check" color={colors.primaryButtonColor} size={ms(15)} />):(<View style={{ paddingLeft: ms(15) }} />)} */}
            <Icon
              name="check"
              color={colors.primaryButtonColor}
              size={ms(15)}
            />
            <H4 text={`  ${item.medname}`} style={null} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </CardWrapper>
  );
};
