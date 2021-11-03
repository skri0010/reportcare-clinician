import React, { FC, useState, useEffect } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { BloodPressureCard } from "./PatientOverviewComponents/BloodPressureCard";
import { MedicationTakenCard } from "./PatientOverviewComponents/MedicationCard";
import { OxygenSaturationCard } from "./PatientOverviewComponents/OxygenSaturationCard";
import { WeightCard } from "./PatientOverviewComponents/WeightCard";
import { SymptomsCard } from "./PatientOverviewComponents/SymptomsCard";
import { Dimensions, View } from "react-native";
import { Physical, ReportSymptom, ReportVitals } from "aws/API";
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
  const [physical, setPhysical] = useState<Physical | null>(null);

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
    }

    // Get physical for the date
    const physicalOnDate = details.physicals[date];
    if (physicalOnDate) {
      setPhysical(physicalOnDate);
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
      <View style={styles.container}>
        {/* Left side (medication and symptoms cards)*/}
        <View style={{ flex: 2 }}>
          {/* Medication card */}
          <MedicationTakenCard
            medications={medications}
            maxHeight={cardHeight}
            minHeight={cardHeight}
          />

          {/* Symptoms card */}
          <SymptomsCard
            symptoms={symptoms}
            maxHeight={cardHeight}
            minHeight={cardHeight * 2.15}
          />
        </View>

        {/* Right side (other cards)*/}
        <View style={[{ flex: 3 }, styles.container]}>
          {/* Blood pressure card */}
          <BloodPressureCard
            systolicBloodPressure={
              vitals?.diastolicBloodPressure || displayPlaceholder
            }
            diastolicBloodPressure={
              vitals?.systolicBloodPressure || displayPlaceholder
            }
            fixedHeight={cardHeight}
            flex={3}
          />

          {/* Oxygen saturation card */}
          <OxygenSaturationCard
            flex={1}
            oxygenSaturation={vitals?.oxygenSaturation || displayPlaceholder}
            fixedHeight={cardHeight}
          />

          {/* Weight card */}
          <WeightCard
            flex={1}
            weight={vitals?.weight || displayPlaceholder}
            targetWeight={
              details.patientInfo.targetWeight || displayPlaceholder
            }
            fixedHeight={cardHeight}
          />

          {/* Fluid intake card */}
          <FluidIntakeCard
            flex={1}
            fluidGoalInMl={
              details.patientInfo.fluidIntakeGoalInMl || displayPlaceholder
            }
            fluidIntakeInMl={sumFluidIntake}
            fixedHeight={cardHeight}
          />

          {/* Physical card */}
          <PhysicalCard
            flex={3}
            steps={physical?.steps || displayPlaceholder}
            stepsGoal={physical?.stepsGoal || displayPlaceholder}
            averageWalkingSpeedInMetresPerSeconds={
              physical?.averageWalkingSpeedInMetresPerSeconds ||
              displayPlaceholder
            }
            distanceInMetres={physical?.distanceInMetres || displayPlaceholder}
            fixedHeight={cardHeight}
          />
        </View>
      </View>
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
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start"
  },
  editButtonContainer: {
    width: ms(100),
    flexDirection: "row",
    alignSelf: "center"
  }
});
