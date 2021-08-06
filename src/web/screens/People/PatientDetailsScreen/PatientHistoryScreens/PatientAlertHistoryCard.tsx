import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { H3 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { AlertHistoryRow } from "./AlertHistoryRow";
import { mockAlertHistory, AlertHistory } from "mock/mockPatientDetails";
import { FlatList } from "react-native";
import i18n from "util/language/i18n";

interface PatientAlertHistoryProps {
  patientId: string;
  maxHeight: number;
  name: string;
  setDisplayHistory: (state: AlertHistory) => void;
  setModalAlertVisible: (state: boolean) => void;
}

export const PatientAlertHistoryCard: FC<PatientAlertHistoryProps> = ({
  name,
  maxHeight,
  setDisplayHistory,
  setModalAlertVisible
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  // Query database for a specific patient by patientId for alert histories
  // For now I just mocked it

  const [alertHistory] = useState(mockAlertHistory);
  // const [displayHistory, setDisplayHistory] = useState<AlertHistory>();

  function onRowPress(history: AlertHistory) {
    setDisplayHistory(history);
    setModalAlertVisible(true);
  }

  return (
    <CardWrapper maxHeight={maxHeight}>
      <H3
        text={i18n.t("Patient_History.Alert")}
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
            onRowPress={() => onRowPress(item)}
            key={item.id}
          />
        )}
        keyExtractor={(alert) => alert.id}
      />
    </CardWrapper>
  );
};
