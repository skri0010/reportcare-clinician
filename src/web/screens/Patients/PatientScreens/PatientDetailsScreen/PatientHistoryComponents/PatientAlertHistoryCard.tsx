import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { H3 } from "components/Text";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { AlertHistoryRow } from "./AlertHistoryRow";
import { mockAlertHistory, AlertHistory } from "mock/mockPatientDetails";
import { FlatList, View } from "react-native";
import i18n from "util/language/i18n";
import { ScaledSheet } from "react-native-size-matters";

interface PatientAlertHistoryProps {
  patientId: string;
  maxHeight: number;
  name: string;
  setDisplayHistory: (state: AlertHistory) => void; // alert history details
  setModalAlertVisible: (state: boolean) => void; // alert modal visibility
}

export const PatientAlertHistoryCard: FC<PatientAlertHistoryProps> = ({
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

  // On row press, set the alert history details to be shown and set the modal to be visible
  function onRowPress(history: AlertHistory) {
    setDisplayHistory(history);
    setModalAlertVisible(true);
  }

  return (
    <CardWrapper maxHeight={maxHeight} title={i18n.t("Home.Alerts")}>
      {/* List of alert histories */}
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
