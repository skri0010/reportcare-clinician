import React, { FC, useState } from "react";
import { FlatList, View } from "react-native";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { AgentTrigger } from "rc_agents/trigger";
import i18n from "util/language/i18n";
import { RootState, select, useDispatch } from "util/useRedux";
import { RiskFilterPillList } from "components/Buttons/RiskFilterPillList";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";
import { setPatientDetails } from "ic-redux/actions/agents/actionCreator";
import { PatientInfo } from "aws/API";
import Fuse from "fuse.js";

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

  const dispatch = useDispatch();

  const onPatientRowPress = (patient: PatientInfo) => {
    if (patient) {
      dispatch(
        setPatientDetails({
          patientInfo: patient,
          activityInfos: {},
          symptomReports: {},
          vitalsReports: {},
          medicalRecords: {},
          icdCrtRecords: {}
        })
      );
      if (patient.configured) {
        // Patient has been configured. Retrieve patient details
        AgentTrigger.triggerRetrievePatientDetails(patient);
      }
    }
  };

  // Check if the search is being used
  const [searching, setSearching] = useState<boolean>(false);

  // Store results of fuzzy search
  const [searchedSubset, setSubset] = useState<PatientInfo[]>([]);

  return (
    <View
      style={{
        flex: flex,
        backgroundColor: colors.primaryContrastTextColor
      }}
    >
      {/* Search bar*/}
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={(searchString: string) => {
          if (searchString.length === 0) {
            setSearching(false);
          } else if (patients) {
            const options = {
              includeScore: true,
              keys: ["name"]
            };
            const fuse = new Fuse(patients, options);
            const result = fuse.search(searchString);
            const searchResults: PatientInfo[] = [];
            result.forEach((item) => searchResults.push(item.item));
            setSearching(true);
            setSubset(searchResults);
          }
        }}
        containerStyle={{
          backgroundColor: colors.primaryContrastTextColor
        }}
        placeholder={i18n.t("Patients.SearchBarPlaceholder")}
      />
      <RiskFilterPillList patientScreen />
      {fetchingPatients ? (
        // Show loading indicator if fetching patients
        <LoadingIndicator flex={1} />
      ) : patients ? (
        // Show patients if list exists
        <View>
          {searching ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <NoItemsTextIndicator
                  text={i18n.t("Patients.PatientsList.NoPatients")}
                />
              )}
              ItemSeparatorComponent={() => <ItemSeparator />}
              data={searchedSubset}
              renderItem={({ item }) => (
                <PatientDetailsRow
                  patient={item}
                  selected={displayPatientId === item.patientID}
                  onRowPress={onPatientRowPress}
                />
              )}
              keyExtractor={(item) => item.patientID}
            />
          ) : (
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
                  onRowPress={onPatientRowPress}
                />
              )}
              keyExtractor={(item) => item.patientID}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};
