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
import { DEFAULT_CARD_WRAPPER_MIN_WIDTH } from "components/Wrappers/CardWrapper";
import { DateNavigator } from "components/InputComponents/DateNavigator";

interface PatientOverviewProps extends PatientDetailsTabProps.OverviewTabProps {
  details: PatientDetails;
  setEditDetails: (state: boolean) => void; // To edit patient's details
}

// IMPORTANT - Otherwise the cards will not wrap propertly due to lack of min width
const COLUMN_MIN_WIDTH = DEFAULT_CARD_WRAPPER_MIN_WIDTH + ms(20);

export const PatientOverview: FC<PatientOverviewProps> = ({
  details,
  setEditDetails
}) => {
  // State for current date displayed
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const cardHeight = Math.max(ms(100), Dimensions.get("window").height * 0.3);
  const [vitals, setVitals] = useState<ReportVitals | null>(null);
  const [symptoms, setSymptoms] = useState<ReportSymptom[]>([]);
  const [medications, setMedications] = useState<MedInput[]>([]);
  const [sumFluidIntake, setSumFluidIntake] = useState<string>("0");
  const [physical, setPhysical] = useState<Physical | null>(null);
  useEffect(() => {
    const date = currentDate.toLocaleDateString();

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
      setSumFluidIntake(fluidIntakeList.reduce((a, b) => a + b, 0).toString());
    } else {
      setVitals(null);
      setSumFluidIntake("0");
    }

    // Get physical for the date
    const physicalOnDate = details.physicals[date];
    setPhysical(physicalOnDate || null);

    // Update symptoms on date
    const symptomsOnDate = details.symptomReports[date];
    setSymptoms(symptomsOnDate || []);

    const medInfo = details.medicationInfos;
    setMedications(medInfo || null);
  }, [details, currentDate]);

  return (
    <ScreenWrapper padding>
      {/* Date navigator and edit patient details button*/}
      <View style={styles.header}>
        <DateNavigator
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />

        {/* Edit patient details button */}
        <View style={styles.editButtonContainer}>
          <InnerScreenButton
            title={i18n.t("Patient_Configuration.EditDetails")}
            onPress={() => setEditDetails(true)}
            style={styles.editButton}
          />
        </View>
      </View>

      {/* Cards with data */}
      <View style={styles.mainContainer}>
        {/* Left column (cards other than medication and symptoms)*/}
        <View style={[{ flex: 3 }, styles.columnContainer]}>
          {/* Blood pressure card */}
          <BloodPressureCard
            flex={2}
            systolicBloodPressure={
              vitals?.diastolicBloodPressure || displayPlaceholder
            }
            diastolicBloodPressure={
              vitals?.systolicBloodPressure || displayPlaceholder
            }
            fixedHeight={cardHeight}
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
            flex={2}
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

        {/* Right column (medication and symptoms cards)*/}
        <View style={[{ flex: 2 }, styles.columnContainer]}>
          {/* Medication card */}
          <MedicationTakenCard
            flex={1}
            medications={medications}
            maxHeight={cardHeight}
            minHeight={cardHeight}
          />
          {/* Symptoms card */}
          <SymptomsCard
            flex={1}
            symptoms={symptoms}
            minHeight={cardHeight}
            maxHeight={cardHeight * 2.15}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  editButtonContainer: {
    paddingRight: "10@ms"
  },
  editButton: {
    width: "100@ms"
  },
  mainContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  columnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    minWidth: COLUMN_MIN_WIDTH
  }
});
