import React, { FC, useState, useEffect } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { BloodPressureCard } from "./PatientOverviewCards/BloodPressureCard";
import { MedicationTakenCard } from "./PatientOverviewCards/MedicationCard";
import { OxygenSaturationCard } from "./PatientOverviewCards/OxygenSaturationCard";
import { WeightCard } from "./PatientOverviewCards/WeightCard";
import { SymptomsCard } from "./PatientOverviewCards/SymptomsCard";
import { Dimensions, View } from "react-native";
import { WithPatientsScreenProps } from "../../../WithPatientsScreenProps";
import { PatientsScreenName } from "web/screens";
import { RootState, select } from "util/useRedux";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { ReportSymptom, ReportVitals } from "aws/API";

export const PatientOverview: FC<
  WithPatientsScreenProps[PatientsScreenName.OVERVIEW]
> = () => {
  const { patientDetails } = select((state: RootState) => ({
    colors: state.settings.colors,
    patientDetails: state.agents.patientDetails
  }));
  const cardHeight = Math.max(ms(100), Dimensions.get("window").height * 0.325);

  const [vitals, setVitals] = useState<ReportVitals | null>(null);
  const [symptoms, setSymptoms] = useState<ReportSymptom[]>([]);

  useEffect(() => {
    if (patientDetails) {
      // TODO: This code needs to be modified for changing days
      const date = new Date().toLocaleDateString();

      // Take the latest vitals report
      const vitalsReportsOnDate = patientDetails.vitalsReports[date];
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

      const symptomsOnDate = patientDetails.symptomReports[date];
      setSymptoms(symptomsOnDate);
    }
  }, [patientDetails]);

  const unknown = "?";

  return (
    <ScreenWrapper padding>
      {patientDetails ? (
        <>
          <View style={[styles.container]}>
            {/* Blood Pressure Card */}
            <BloodPressureCard
              systolic={vitals?.BPDi || unknown}
              dystolic={vitals?.BPSys || unknown}
              minHeight={cardHeight}
              flex={2}
            />
            {/* Oxygen Saturation card and Weigth card to share fixed space */}
            <OxygenSaturationCard
              oxySatValue={vitals?.OxySat || unknown}
              minHeight={cardHeight}
            />
            <WeightCard
              weight={vitals?.Weight || unknown}
              targetWeight={patientDetails.patientInfo.targetWeight}
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
      ) : (
        // Show loading indicator if patient details is null
        <LoadingIndicator />
      )}
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
