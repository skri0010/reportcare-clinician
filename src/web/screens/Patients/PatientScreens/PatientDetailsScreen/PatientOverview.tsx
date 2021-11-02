import React, { FC, useState, useEffect } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { BloodPressureCard } from "./PatientOverviewComponents/BloodPressureCard";
import { MedicationTakenCard } from "./PatientOverviewComponents/MedicationCard";
import { OxygenSaturationCard } from "./PatientOverviewComponents/OxygenSaturationCard";
import { WeightCard } from "./PatientOverviewComponents/WeightCard";
import { SymptomsCard } from "./PatientOverviewComponents/SymptomsCard";
import { Dimensions, View } from "react-native";
import { ReportSymptom, ReportVitals } from "aws/API";
import i18n from "util/language/i18n";
import { PatientDetailsTabProps } from "web/navigation/types";
import { MedInput, PatientDetails } from "rc_agents/model";
import {
  getLatestVitalsReport,
  getNonNullItemsFromList
} from "util/utilityFunctions";
import { FluidIntakeCard } from "./PatientOverviewComponents/FluidIntakeCard";
import { PhysicalCard } from "./PatientOverviewComponents/PhysicalCard";
import { InnerScreenButton } from "components/Buttons/InnerScreenButton";
import { displayPlaceholder } from "util/const";

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
      const fluidIntakeList: number[] = getNonNullItemsFromList(
        vitalsReportsOnDate.map((data) => data.fluidIntakeInMl)
      );

      // Set total fluid taken
      setSumFluidIntake(fluidIntakeList.reduce((a, b) => a + b, 0));

      // Get sum of steps taken
      const stepsTakenList: number[] = getNonNullItemsFromList([]);

      // Set sum of steps taken
      setSumStepsTaken(stepsTakenList.reduce((a, b) => a + b, 0));
    }

    // Update symptoms on date
    const symptomsOnDate = details.symptomReports[date];
    if (symptomsOnDate) {
      setSymptoms(symptomsOnDate);
    }
    const medInfo = details.medicationInfos;
    if (medInfo) {
      setMedications(medInfo);
    }
  }, [details]);

  return (
    <ScreenWrapper padding>
      <>
        <View style={[styles.container]}>
          {/* Blood Pressure Card */}
          <BloodPressureCard
            systolicBloodPressure={
              vitals?.diastolicBloodPressure || displayPlaceholder
            }
            diastolicBloodPressure={
              vitals?.systolicBloodPressure || displayPlaceholder
            }
            minHeight={cardHeight}
            flex={2}
          />
          {/* Oxygen Saturation card and Weigth card to share fixed space */}
          <OxygenSaturationCard
            oxygenSaturation={vitals?.oxygenSaturation || displayPlaceholder}
            minHeight={cardHeight}
          />
          <WeightCard
            weight={vitals?.weight || displayPlaceholder}
            targetWeight={
              details.patientInfo.targetWeight || displayPlaceholder
            }
            minHeight={cardHeight}
          />
        </View>

        <View style={[styles.container]}>
          {/* Fluid and physicals card */}
          <FluidIntakeCard
            fluidIntakeInMl={
              details.patientInfo.fluidIntakeGoalInMl || displayPlaceholder
            }
            fluidGoalInMl={sumFluidIntake}
            minHeight={cardHeight}
          />
          <PhysicalCard
            stepsTaken={sumStepsTaken || displayPlaceholder}
            stepsRequired={
              details.patientInfo.targetSteps || displayPlaceholder
            }
            minHeight={cardHeight}
          />
        </View>

        <View style={[styles.container, { paddingBottom: ms(10) }]}>
          {/* Medication and symptoms card */}
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
