import React, { FC, useState, useEffect } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { BloodPressureCard } from "./PatientOverviewComponents/BloodPressureCard";
import { MedicationTakenCard } from "./PatientOverviewComponents/MedicationCard";
import { OxygenSaturationCard } from "./PatientOverviewComponents/OxygenSaturationCard";
import { WeightCard } from "./PatientOverviewComponents/WeightCard";
import { SymptomsCard } from "./PatientOverviewComponents/SymptomsCard";
import { Dimensions, View } from "react-native";
import { ReportSymptom, ReportVitals } from "aws/API";
import i18n from "util/language/i18n";
import { PatientDetailsTabProps } from "web/navigation/types";
import { PatientDetails } from "rc_agents/model";

interface PatientOverviewProps extends PatientDetailsTabProps.OverviewTabProps {
  details: PatientDetails;
}

export const PatientOverview: FC<PatientOverviewProps> = ({ details }) => {
  const cardHeight = Math.max(ms(100), Dimensions.get("window").height * 0.3);

  const [vitals, setVitals] = useState<ReportVitals | null>(null);
  const [symptoms, setSymptoms] = useState<ReportSymptom[]>([]);

  useEffect(() => {
    // TODO: This code needs to be modified for changing days
    const date = new Date().toLocaleDateString();

    // Take the latest vitals report and update vitals on date
    const vitalsReportsOnDate = details.vitalsReports[date];
    if (vitalsReportsOnDate) {
      const datetimeList = vitalsReportsOnDate.map((report) =>
        Date.parse(report.DateTime)
      );
      const latestDatetime = Math.max(...datetimeList);
      const latestVitalsReport: ReportVitals | undefined =
        vitalsReportsOnDate.find(
          (item) => item.DateTime === new Date(latestDatetime).toISOString()
        );
      if (latestVitalsReport) {
        setVitals(latestVitalsReport);
      }
    }
    // Update symptoms on date
    const symptomsOnDate = details.symptomReports[date];
    if (symptomsOnDate) {
      setSymptoms(symptomsOnDate);
    }
  }, [details]);

  const noRecord = i18n.t("Patient_Overview.NoRecord");

  return (
    <ScreenWrapper padding>
      <>
        <View style={[styles.container]}>
          {/* Blood Pressure Card */}
          <BloodPressureCard
            systolicBP={vitals?.BPDi || noRecord}
            diastolicBP={vitals?.BPSys || noRecord}
            minHeight={cardHeight}
            flex={2}
          />
          {/* Oxygen Saturation card and Weigth card to share fixed space */}
          <OxygenSaturationCard
            oxySatValue={vitals?.OxySat || noRecord}
            minHeight={cardHeight}
          />
          <WeightCard
            weight={vitals?.Weight || noRecord}
            targetWeight={details.patientInfo.targetWeight}
            minHeight={cardHeight}
          />
        </View>

        <View style={[styles.container, { paddingBottom: ms(10) }]}>
          {/* Medication and symptoms card */}
          {/* JH-TODO-NEW: Current data type does not support this */}
          <MedicationTakenCard
            medications={[]}
            maxHeight={cardHeight}
            minHeight={cardHeight}
          />
          <SymptomsCard
            symptoms={symptoms}
            maxHeight={cardHeight}
            minHeight={cardHeight}
          />
        </View>
      </>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
