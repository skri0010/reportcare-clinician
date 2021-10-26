import React, { FC, useState, useEffect } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { BloodPressureCard } from "./PatientOverviewComponents/BloodPressureCard";
import { MedicationTakenCard } from "./PatientOverviewComponents/MedicationCard";
import { OxygenSaturationCard } from "./PatientOverviewComponents/OxygenSaturationCard";
import { WeightCard } from "./PatientOverviewComponents/WeightCard";
import { SymptomsCard } from "./PatientOverviewComponents/SymptomsCard";
import { Dimensions, ScrollView, View } from "react-native";
import { ReportSymptom, ReportVitals } from "aws/API";
import i18n from "util/language/i18n";
import { PatientDetailsTabProps } from "web/navigation/types";
import { MedInput, PatientDetails } from "rc_agents/model";
import { getLatestVitalsReport } from "util/utilityFunctions";
import { FluidIntakeCard } from "./PatientOverviewComponents/FluidIntakeCard";
import { ActivityCard } from "./PatientOverviewComponents/ActivityCard";
import { InnerScreenButton } from "components/Buttons/InnerScreenButton";

interface PatientOverviewProps extends PatientDetailsTabProps.OverviewTabProps {
  details: PatientDetails;
  setEditDetails: (state: boolean) => void; // To edit patient's details
}

export const PatientOverview: FC<PatientOverviewProps> = ({
  details,
  setEditDetails
}) => {
  const cardHeight = Math.max(ms(100), Dimensions.get("window").height * 0.3);

  const [vitals, setVitals] = useState<ReportVitals | null>(null);
  const [symptoms, setSymptoms] = useState<ReportSymptom[]>([]);
  const [medications, setMedications] = useState<MedInput[]>([]);
  const [sumFluidIntake, setSumFluidIntake] = useState<number>(0);
  const [sumStepsTaken, setSumStepsTaken] = useState<number>(0);

  useEffect(() => {
    // FUTURE-TODO: This code needs to be modified for changing days
    const date = new Date().toLocaleDateString();

    // Take the latest vitals report and update vitals on date
    const vitalsReportsOnDate = details.vitalsReports[date];
    if (vitalsReportsOnDate) {
      const latestVitalsReport = getLatestVitalsReport(vitalsReportsOnDate);
      if (latestVitalsReport) {
        setVitals(latestVitalsReport);
      }

      // Get sum of fluid taken
      const fluidIntakeList: number[] = vitalsReportsOnDate.flatMap((data) =>
        data.FluidIntake && parseFloat(data.FluidIntake)
          ? [parseFloat(data.FluidIntake)]
          : []
      );
      // set total fluid taken
      setSumFluidIntake(fluidIntakeList.reduce((a, b) => a + b, 0));

      // Get sum of steps taken
      const stepsTakenList: number[] = vitalsReportsOnDate.flatMap((data) =>
        data.NoSteps && parseFloat(data.NoSteps)
          ? [parseFloat(data.NoSteps)]
          : []
      );
      // set total fluid taken
      setSumStepsTaken(stepsTakenList.reduce((a, b) => a + b, 0));
    }

    // Update symptoms on date
    const symptomsOnDate = details.symptomReports[date];
    if (symptomsOnDate) {
      setSymptoms(symptomsOnDate);
    }
    const medInfo = details.medicationInfo;
    if (medInfo) {
      setMedications(medInfo);
    }
  }, [details]);

  const noRecord = i18n.t("Patient_Overview.NoRecord");

  return (
    <ScreenWrapper padding>
      <ScrollView>
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

          <View style={[styles.container]}>
            {/* Fluid and activity card */}
            <FluidIntakeCard
              fluidRequired={details.patientInfo.fluidIntakeGoal}
              fluidTaken={sumFluidIntake.toString()}
              minHeight={cardHeight}
            />
            <ActivityCard
              stepsTaken={sumStepsTaken.toString()}
              stepsRequired={details.patientInfo.targetActivity}
              minHeight={cardHeight}
            />
          </View>

          <View style={[styles.container, { paddingBottom: ms(10) }]}>
            {/* Medication and symptoms card */}
            {/* JH-TODO-NEW: Current data type does not support this */}
            <MedicationTakenCard
              medications={medications}
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
        <InnerScreenButton
          title={i18n.t("Patient_Configuration.EditDetails")}
          onPress={() => setEditDetails(true)}
          style={styles.editButtonContainer}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  editButtonContainer: {
    width: ms(100),
    flexDirection: "row",
    alignSelf: "center"
  }
});
