import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { SummaryCard } from "./AlertDetailsCards/SummaryCard";
import { MedicationCard } from "./AlertDetailsCards/MedicationCard";
import { HighRiskAlertInfo, Role } from "rc_agents/model";
import { HighRiskPatientBaselinesCard } from "./AlertDetailsCards/HighRisk/HighRiskPatientBaselinesCard";
import { IcdCrtCard } from "./AlertDetailsCards/IcdCrtCard";
import { HighRiskVitalSignsCard } from "./AlertDetailsCards/HighRisk/HighRiskVitalSignsCard";
import { HighRiskSymptomsCard } from "./AlertDetailsCards/HighRisk/HighRiskSymptomsCard";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";

export const HighRiskAlertDetails: FC = () => {
  const { alertInfo, fetchingIcdCrtRecordContent, clinician } = select(
    (state: RootState) => ({
      alertInfo: state.alerts.alertInfo,
      fetchingIcdCrtRecordContent: state.patients.fetchingIcdCrtRecordContent,
      clinician: state.clinicians.clinician
    })
  );

  const [viewIcdCrt, setViewIcdCrt] = useState(false);

  useEffect(() => {
    // Checks for clinician's role to determine whether ICD/CRT record should be shown
    if (clinician && clinician.role === Role.EP) {
      setViewIcdCrt(true);
    }
  }, [clinician]);

  return (
    <View
      style={styles.container}
      pointerEvents={fetchingIcdCrtRecordContent ? "none" : "auto"}
    >
      <View style={styles.rowContainer}>
        {/* Alert summary */}
        <SummaryCard alertInfo={alertInfo} />
        {/* Patient baselines */}
        <HighRiskPatientBaselinesCard
          patientInfo={(alertInfo as HighRiskAlertInfo).latestBaseline}
        />
      </View>

      <View style={styles.rowContainer}>
        {/* Medication */}
        <MedicationCard medication={alertInfo?.medicineInfoList} />
        {/* Latest ICD/CRT record */}
        {viewIcdCrt && (
          <IcdCrtCard
            icdCrtRecord={(alertInfo as HighRiskAlertInfo).icdCrtRecord}
          />
        )}
      </View>

      {/* Alert symptoms */}
      <View style={styles.rowContainer}>
        <HighRiskSymptomsCard
          symptomReports={(alertInfo as HighRiskAlertInfo).symptomReports}
        />
      </View>

      {/* Alert vitals */}
      <HighRiskVitalSignsCard
        vitalsReports={(alertInfo as HighRiskAlertInfo).vitalsReports}
      />
      {fetchingIcdCrtRecordContent && (
        <LoadingIndicator overlayBackgroundColor />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "column", paddingBottom: ms(20) },
  rowContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
