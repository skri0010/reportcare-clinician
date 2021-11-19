import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { ReportSymptom } from "aws/API";
import { FlatList } from "react-native";
import i18n from "util/language/i18n";
import { EmptyListIndicator } from "components/Indicators/EmptyListIndicator";
import { SymptomRow } from "components/RowComponents/SymptomRow";

interface SymptomProps {
  symptoms: ReportSymptom[];
  maxHeight: number;
  minHeight: number;
  flex?: number;
}

export const SymptomsCard: FC<SymptomProps> = ({
  symptoms,
  maxHeight,
  minHeight,
  flex
}) => {
  return (
    <CardWrapper
      maxHeight={maxHeight}
      minHeight={minHeight}
      title={i18n.t("Patient_Overview.Symptoms")}
      flex={flex}
    >
      <FlatList
        style={{ paddingLeft: ms(10), paddingTop: ms(5) }}
        showsVerticalScrollIndicator={false}
        data={symptoms}
        ListEmptyComponent={() => (
          <EmptyListIndicator text={i18n.t("Patient_Overview.NoSymptoms")} />
        )}
        renderItem={({ item }) => <SymptomRow symptom={item} />}
        keyExtractor={(item) => item.id}
      />
    </CardWrapper>
  );
};
