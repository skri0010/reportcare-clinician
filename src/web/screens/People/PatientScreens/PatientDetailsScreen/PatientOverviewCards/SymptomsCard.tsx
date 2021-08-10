import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H3, H4 } from "components/Text/index";
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
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [mockSymptoms] = useState(mockSymptomRecords);

  return (
    <CardWrapper maxHeight={maxHeight} minHeight={minHeight}>
      <H3
        text={i18n.t("Patient_Overview.Symptoms")}
        style={[
          styles.cardTitle,
          {
            color: colors.primaryTextColor
          }
        ]}
      />
      <FlatList
        style={{ paddingLeft: ms(10) }}
        showsVerticalScrollIndicator={false}
        data={mockSymptoms}
        renderItem={({ item }) => <H4 text={`  ${item.Name}`} style={null} />}
        keyExtractor={(item) => item.id}
      />
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  cardTitle: { fontWeight: "bold", paddingLeft: ms(5), paddingBottom: ms(5) }
});
