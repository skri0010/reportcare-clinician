import React, { FC } from "react";
import { FlatList, View } from "react-native";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { AgentTrigger } from "rc_agents/trigger";
import i18n from "util/language/i18n";
import { RootState, select } from "util/useRedux";
import { RiskFilterPillList } from "components/Buttons/RiskFilterPillList";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";

interface PatientsListScreen {
  displayPatientId?: string;
  flex?: number;
}

export const PatientsList: FC<PatientsListScreen> = ({
  displayPatientId,
  flex = 1
}) => {
  const { colors, patients, fetchingPatients } = select((state: RootState) => ({
    colors: state.settings.colors,
    patients: state.agents.patients,
    fetchingPatients: state.agents.fetchingPatients
  }));

  return (
    <View
      style={{ flex: flex, backgroundColor: colors.primaryContrastTextColor }}
    >
      {/* Search bar*/}
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        containerStyle={{
          backgroundColor: colors.primaryContrastTextColor
        }}
        placeholder={i18n.t("Patients.SearchBarPlaceholder")}
      />
      {/* Risk filter pills */}
      <RiskFilterPillList />
      {/* Risk filter pills and List of patients */}
      {fetchingPatients ? (
        // Show loading indicator if fetching patients
        <LoadingIndicator flex={1} />
      ) : patients ? (
        // Show patients if list exists
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <NoItemsTextIndicator
              text={i18n.t("Patients.PatientsList.NoPatients")}
            />
          )}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={patients}
          renderItem={({ item }) => (
            <PatientDetailsRow
              patient={item}
              selected={displayPatientId === item.patientID}
              onRowPress={AgentTrigger.triggerRetrievePatientDetails}
            />
          )}
          keyExtractor={(item) => item.patientID}
        />
      ) : null}
    </View>
  );
};
