import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { H5 } from "components/Text";
import React, { FC } from "react";
import { FlatList, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { RootState, select } from "util/useRedux";
import { RiskFilterPillList } from "web/RiskFilterPillList";
import { RowSelectionTab } from "../RowSelectionTab";

interface PatientListScreenProps {
  flex?: number;
}

export const PatientListScreen: FC<PatientListScreenProps> = ({ flex = 1 }) => {
  const { colors, patients, fetchingPatients } = select((state: RootState) => ({
    colors: state.settings.colors,
    patients: state.agents.patients,
    fetchingPatients: state.agents.fetchingPatients
  }));

  return (
    <View
      style={{ flex: flex, backgroundColor: colors.primaryContrastTextColor }}
    >
      {/* Search bar and risk filter pills */}
      <RowSelectionTab
        title={i18n.t("TabTitle.Patients")}
        placeholder={i18n.t("Patients.SearchBarPlaceholder")}
      />
      <RiskFilterPillList />
      {/* Risk filter pills and List of patients */}
      {fetchingPatients ? (
        // JH-TODO-NEW: Loading indicator options
        <View style={{ flex: 1 }}>
          <LoadingIndicator />
        </View>
      ) : patients && patients.length > 0 ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ItemSeparator />}
            data={patients}
            renderItem={({ item }) => (
              <PatientDetailsRow patient={item} age={23} />
            )}
            keyExtractor={(item) => item.patientID}
          />
        </>
      ) : (
        // Display text to indicate no patients
        <View style={styles.noPatientsContainer}>
          <H5
            text={i18n.t("Patients.NoPatients")}
            style={styles.noPatientsText}
          />
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
