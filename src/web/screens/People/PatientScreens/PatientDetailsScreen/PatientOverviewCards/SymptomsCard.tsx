import React, { FC, useState } from "react";
import { ms } from "react-native-size-matters";
import { H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { ReportSymptom } from "aws/models";
import { FlatList } from "react-native";
import { mockSymptomRecords } from "mock/mockSymptoms";
import i18n from "util/language/i18n";

interface SymptomProps {
  symptoms: ReportSymptom[];
  maxHeight: number;
  minHeight: number;
}

export const SymptomsCard: FC<SymptomProps> = ({ maxHeight, minHeight }) => {
  const [mockSymptoms] = useState(mockSymptomRecords);

  return (
    <CardWrapper
      maxHeight={maxHeight}
      minHeight={minHeight}
      title={i18n.t("Patient_Overview.Symptoms")}
    >
      <FlatList
        style={{ paddingLeft: ms(10), paddingTop: ms(5) }}
        showsVerticalScrollIndicator={false}
        data={mockSymptoms}
        renderItem={({ item }) => <H4 text={`  ${item.Name}`} style={null} />}
        keyExtractor={(item) => item.id}
      />
    </CardWrapper>
  );
};
