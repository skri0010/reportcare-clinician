import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { AlertHistoryRow } from "./AlertHistoryRow";
import { FlatList } from "react-native";
import i18n from "util/language/i18n";
import { AlertInfo } from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { EmptyListIndicator } from "components/Indicators/EmptyListIndicator";

interface PatientAlertHistoryProps {
  patientId?: string;
  maxHeight: number;
  setDisplayHistory: (state: AlertInfo) => void; // alert history details
  setModalAlertVisible: (state: boolean) => void; // alert modal visibility
}

export const PatientAlertHistoryCard: FC<PatientAlertHistoryProps> = ({
  maxHeight,
  setDisplayHistory,
  setModalAlertVisible
}) => {
  const { colors, alertHistory, fetchingPatientAlertHistory } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      alertHistory: state.agents.alertHistory,
      fetchingPatientAlertHistory: state.agents.fetchingPatientAlertHistory
    })
  );

  // On row press, set the alert history details to be shown and set the modal to be visible
  function onRowPress(history: AlertInfo) {
    setDisplayHistory(history);
    setModalAlertVisible(true);
  }

  return (
    <CardWrapper maxHeight={maxHeight} title={i18n.t("Home.Alerts")}>
      {/* List of alert histories */}
      {alertHistory && alertHistory.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={alertHistory}
          renderItem={({ item }) => (
            <AlertHistoryRow
              risk={item.riskLevel}
              description={item.summary}
              date={item.dateTime}
              onRowPress={() => onRowPress(item)}
              key={item.id}
            />
          )}
          keyExtractor={(alert) => alert.id}
        />
      ) : !fetchingPatientAlertHistory ? (
        <EmptyListIndicator text={i18n.t("Patient_History.NoAlertHistory")} />
      ) : null}
      {fetchingPatientAlertHistory && <LoadingIndicator />}
    </CardWrapper>
  );
};
