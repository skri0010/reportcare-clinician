import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { H3 } from "components/Text";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { AlertHistoryRow } from "./AlertHistoryRow";
import { FlatList, View } from "react-native";
import i18n from "util/language/i18n";
import { ScaledSheet } from "react-native-size-matters";
import { AlertInfo } from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";

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
  // Query database for a specific patient by patientId for alert histories
  // For now I just mocked it

  // const [alertHistory] = useState(mockAlertHistory);
  // const [displayHistory, setDisplayHistory] = useState<AlertHistory>();

  // On row press, set the alert history details to be shown and set the modal to be visible
  function onRowPress(history: AlertInfo) {
    setDisplayHistory(history);
    setModalAlertVisible(true);
  }

  return (
    <CardWrapper maxHeight={maxHeight}>
      <View style={styles.title}>
        <H3
          text={i18n.t("Home.Alerts")}
          style={[
            {
              fontWeight: "bold",
              color: colors.primaryTextColor
            }
          ]}
        />
      </View>

      {/* List of alert histories */}
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
      {fetchingPatientAlertHistory && <LoadingIndicator />}
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "15@ms",
    alignItems: "center"
  }
});
