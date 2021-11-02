import React, { FC, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { AgentTrigger } from "rc_agents/trigger";
import i18n from "util/language/i18n";
import { RootState, select, useDispatch } from "util/useRedux";
import { RiskFilterPillList } from "components/Buttons/RiskFilterPillList";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";
import { PatientInfo } from "aws/API";
import { setPatientDetails } from "ic-redux/actions/agents/patientActionCreator";
import Fuse from "fuse.js";
import { NoListItemMessage } from "../Shared/NoListItemMessage";

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
    patients: state.patients.patients,
    fetchingPatients: state.patients.fetchingPatients
  }));

  const dispatch = useDispatch();

  const onPatientRowPress = (patient: PatientInfo) => {
    if (patient) {
      dispatch(
        setPatientDetails({
          patientInfo: patient,
          activityInfos: [],
          symptomReports: {},
          vitalsReports: {},
          physicals: {},
          medicationInfos: [],
          medicalRecords: [],
          icdCrtRecords: []
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
  const [searchedSubset, setSearchingSubset] = useState<PatientInfo[]>([]);

  const onSearchClick = (searchString: string) => {
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
      setSearchingSubset(searchResults);
    }
  };

  return (
    <View
      style={{
        flex: flex,
        backgroundColor: colors.primaryBackgroundColor
      }}
    >
      {/* Search bar*/}
      <SearchBarComponent
        onUserInput={(searchString) => onSearchClick(searchString)}
        onSearchClick={(searchString) => onSearchClick(searchString)}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <NoItemsTextIndicator
                text={i18n.t("Patients.PatientsList.NoPatients")}
              />
            )}
            ItemSeparatorComponent={() => <ItemSeparator />}
            data={searching ? searchedSubset : patients}
            renderItem={({ item }) => (
              <PatientDetailsRow
                patient={item}
                selected={displayPatientId === item.patientID}
                onRowPress={onPatientRowPress}
              />
            )}
            keyExtractor={(item) => item.patientID}
          />
        </ScrollView>
      ) : (
        <NoListItemMessage
          screenMessage={i18n.t("Patients.PatientsList.NoPatients")}
        />
      )}
    </View>
  );
};
