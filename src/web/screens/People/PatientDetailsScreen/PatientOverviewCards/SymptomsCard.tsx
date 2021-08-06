import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";
import { H3, H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { ReportSymptom } from "aws/models";
import { FlatList } from "react-native";
import { mockSymptomRecords } from "mock/mockSymptoms";
import i18n from "util/language/i18n";

interface SymptomProps {
  symptoms: ReportSymptom[];
}

export const SymptomsCard: FC<SymptomProps> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [mockSymptoms] = useState(mockSymptomRecords);

  return (
    <CardWrapper maxHeight={ms(120)}>
      <H3
        text={i18n.t("Patient_Overview.Symptoms")}
        style={{ fontWeight: "bold", color: colors.primaryTextColor }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={mockSymptoms}
        renderItem={({ item }) => <H4 text={`  ${item.Name}`} style={null} />}
        keyExtractor={(item) => item.id}
      />
    </CardWrapper>
  );
};
