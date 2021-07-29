import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { H3 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { AlertHistoryRow } from "./AlertHistoryRow";
import { mockAlertHistory } from "mock/mockPatientDetails";
import { FlatList } from "react-native";

interface PatientAlertHistoryProps {
  patientId: string;
  maxHeight: number;
}

export const PatientAlertHistoryCard: FC<PatientAlertHistoryProps> = ({
  maxHeight
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  // Query database for a specific patient by patientId for alert histories
  // For now I just mocked it

  const [alertHistory] = useState(mockAlertHistory);

  return (
    <CardWrapper maxHeight={maxHeight}>
      <H3
        text="Alert"
        style={[{ fontWeight: "bold", color: colors.primaryTextColor }]}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={alertHistory}
        renderItem={({ item }) => (
          <AlertHistoryRow
            risk={item.risk}
            description={item.description}
            date={item.date}
            onRowPress={() => null}
            key={item.patientId}
          />
        )}
        keyExtractor={(alert) => alert.patientId}
      />
    </CardWrapper>
  );
};
