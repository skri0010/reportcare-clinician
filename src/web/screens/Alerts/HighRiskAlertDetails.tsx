import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { SymptomCard } from "./AlertDetailsCards/SymptomCard";
import { SummaryCard } from "./AlertDetailsCards/SummaryCard";
import { MedicationCard } from "./AlertDetailsCards/MedicationCard";
import { HighRiskAlertInfo, Role } from "rc_agents/model";
import { HighRiskPatientBaselinesCard } from "./AlertDetailsCards/HighRiskPatientBaselinesCard";
import { ClinicianRecord } from "aws/API";
import { IcdCrtCard } from "./AlertDetailsCards/IcdCrtCard";
import { LocalStorage } from "rc_agents/storage";
import { HighRiskVitalSignsCard } from "./AlertDetailsCards/HighRiskVitalSignsCard";

export const HighRiskAlertDetails: FC = () => {
  const { alertInfo } = select((state: RootState) => ({
    alertInfo: state.agents.alertInfo
  }));

  const [viewIcdCrt, setViewIcdCrt] = useState(false);

  // TODO: To be removed
  const mockIcdCrt: ClinicianRecord = {
    __typename: "ClinicianRecord",
    patientID: "bea",
    documentID: "",
    type: "IcdCrt",
    title: "BW ICD/CRT october 2021",
    path: "",
    uploaderClinicianID: "",
    uploadDateTime: new Date().toISOString(),
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  };

  useEffect(() => {
    // Checks for clinician's role to determine whether ICD/CRT record should be shown
    const checkClinicianRole = async () => {
      const clinician = await LocalStorage.getClinician();
      if (clinician) {
        if (clinician.role === Role.EP) {
          setViewIcdCrt(true);
        }
      }
    };
    checkClinicianRole();
  }, []);

  return (
    <View style={styles.container}>
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
        <MedicationCard medication={alertInfo?.medCompliants} />
        {/* Latest ICD/CRT record */}
        {viewIcdCrt && <IcdCrtCard icdCrtRecord={mockIcdCrt} />}
      </View>

      {/* Alert symptoms */}
      <View style={styles.rowContainer}>
        <SymptomCard symptomReport={alertInfo?.symptomReport} />
      </View>

      {/* Alert vitals */}
      <HighRiskVitalSignsCard
        vitalsReports={(alertInfo as HighRiskAlertInfo).vitalsReports}
      />
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
