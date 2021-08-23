import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { ReportSymptom } from "aws/API";
import { FlatList } from "react-native";
import i18n from "util/language/i18n";
import { EmptyListIndicator } from "components/indicators/EmptyListIndicator";

interface SymptomProps {
  symptoms: ReportSymptom[];
  maxHeight: number;
  minHeight: number;
}

export const SymptomsCard: FC<SymptomProps> = ({
  symptoms,
  maxHeight,
  minHeight
}) => {
  // JH-TODO-NEW: Message if no symptoms
  return (
    <CardWrapper
      maxHeight={maxHeight}
      minHeight={minHeight}
      title={i18n.t("Patient_Overview.Symptoms")}
    >
      <FlatList
        style={{ paddingLeft: ms(10), paddingTop: ms(5) }}
        showsVerticalScrollIndicator={false}
        data={symptoms}
        ListEmptyComponent={() => (
          <EmptyListIndicator text={i18n.t("Patient_Overview.NoSymptoms")} />
        )}
        renderItem={({ item }) => <H4 text={`  ${item.Name}`} style={null} />}
        keyExtractor={(item) => item.id}
      />
    </CardWrapper>
  );
};
