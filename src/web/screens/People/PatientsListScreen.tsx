import React, { FC, useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { H5 } from "components/Text";
import { AgentTrigger } from "rc_agents/trigger";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { RootState, select } from "util/useRedux";
import { RiskFilterPillList } from "web/RiskFilterPillList";
import { RowSelectionTab } from "../RowSelectionTab";

interface PatientsListScreenProps {
  flex?: number;
}

export const PatientsListScreen: FC<PatientsListScreenProps> = ({
  flex = 1
}) => {
  const { colors, patients, fetchingPatients } = select((state: RootState) => ({
    colors: state.settings.colors,
    patients: state.agents.patients,
    fetchingPatients: state.agents.fetchingPatients
  }));

  const [noPatientsNotice, setNoPatientsNotice] = useState<string>("");

  // Prepare text notice to be displayed after fetching patients
  useEffect(() => {
    if (fetchingPatients) {
      if (patients) {
        // No patients found
        setNoPatientsNotice(i18n.t("Patients.PatientsList.NoPatients"));
      } else {
        // Could not fetch patients
        setNoPatientsNotice(
          i18n.t("Internet_Connection.FailedToRetrieveNotice")
        );
      }
    }
  }, [patients, fetchingPatients]);

  return (
    <View
      style={{ flex: flex, backgroundColor: colors.primaryContrastTextColor }}
    >
      {/* Search bar and risk filter pills */}
      <RowSelectionTab
        title={i18n.t("TabTitle.Patients")}
        placeholder={i18n.t("Patients.SearchBarPlaceholder")}
      />
      <RiskFilterPillList patientScreen />
      {/* Risk filter pills and List of patients */}
      {fetchingPatients ? (
        // Show loading indicator if fetching patients
        <LoadingIndicator flex={1} />
      ) : patients && patients.length > 0 ? (
        // Show patients if list exists and length > 0
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={patients}
          renderItem={({ item }) => (
            <PatientDetailsRow
              patient={item}
              onRowPress={AgentTrigger.triggerRetrievePatientDetails}
            />
          )}
          keyExtractor={(item) => item.patientID}
        />
      ) : (
        // Show text notice (no patients or failed to fetch patients)
        <View style={styles.noPatientsContainer}>
          <H5 text={noPatientsNotice} style={styles.noPatientsText} />
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  noPatientsContainer: {
    flex: 1,
    paddingTop: "10@ms",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: "30@ms"
  },
  noPatientsText: {
    textAlign: "center"
  }
});
