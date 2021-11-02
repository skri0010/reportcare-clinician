import React, { FC, useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { WeightChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/WeightChartCard";
import { DiastolicBPChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/DiastolicBPChartCard";
import { OxygenSaturationChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/OxygenSaturationChartCard";
import { SystolicBPChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/SystolicBPChartCard";
import { FluidIntakeChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/FluidIntakeChart";
import { PatientDetailsTabProps } from "web/navigation/types";
import { PatientDetails } from "rc_agents/model";
import { FullVitalsChartData } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { mockLocalReportVitals } from "mock/mockVitals";
import { InformationBlock } from "components/InfoComponents/InformationBlock";
import { ChartFilterPillList } from "components/Buttons/ChartFilterPillList";
import i18n from "util/language/i18n";
import { mockLocalPhysical } from "mock/mockPhysicals";
import { StepsChartCard } from "./PatientParameterComponents/PhysicalsChartCards/StepsChartCard";
import { FullPhysicalsChartData } from "components/VisualizationComponents/PhysicalsCharts/PhysicalsChartUtilities";
import {
  getLast7DaysFullPhysicalsChartData,
  getLast7DaysFullVitalsChartData
} from "components/VisualizationComponents/GeneralUtilities";
import { MeanSpeedChartCard } from "./PatientParameterComponents/PhysicalsChartCards/MeanSpeedChartCard";
import { DistanceChartCard } from "./PatientParameterComponents/PhysicalsChartCards/DistanceChartCard";

interface PatientParametersProps
  extends PatientDetailsTabProps.ParametersTabProps {
  details: PatientDetails;
}

export const PatientParameters: FC<PatientParametersProps> = () => {
  const cardMaxHeight = Math.max(
    ms(200),
    Dimensions.get("window").height * 0.8
  );
  // FUTURE-TODO: Allow week selection to view parameters
  // TODO: Uncomment following line and remove line with mock local report vitals and mock physicals
  // const { vitalsReports, physicals } = details;
  const vitalsReports = mockLocalReportVitals;
  const physicals = mockLocalPhysical;

  const [fullVitalsChartData, setFullVitalsChartData] =
    useState<FullVitalsChartData | null>(null);
  const [fullPhysicalsChartData, setFullPhysicalsChartData] =
    useState<FullPhysicalsChartData | null>(null);

  // Update state for vitals reports and physicals
  useEffect(() => {
    // Set full vitals chart data for the last 7 days
    if (vitalsReports) {
      setFullVitalsChartData(getLast7DaysFullVitalsChartData(vitalsReports));
    }

    // Set full physicals chart data for the last 7 days
    if (physicals) {
      setFullPhysicalsChartData(getLast7DaysFullPhysicalsChartData(physicals));
    }
  }, [vitalsReports, physicals]);

  return (
    <ScreenWrapper padding>
      {fullPhysicalsChartData ? (
        <View style={styles.container}>
          <StepsChartCard
            data={fullPhysicalsChartData.steps}
            maxHeight={cardMaxHeight}
          />
          <DistanceChartCard
            data={fullPhysicalsChartData.distance}
            maxHeight={cardMaxHeight}
          />
          <MeanSpeedChartCard
            data={fullPhysicalsChartData.meanSpeed}
            maxHeight={cardMaxHeight}
          />
        </View>
      ) : null}
      {fullVitalsChartData ? (
        <>
          <InformationBlock
            information={i18n.t("Parameter_Graphs.Information")}
          />
          <ChartFilterPillList />
          <View style={styles.container}>
            {/* Diastolic Blood Graph */}
            <DiastolicBPChartCard
              data={fullVitalsChartData.diastolic}
              maxHeight={cardMaxHeight}
            />
            {/* Systolic Blood Graph */}
            <SystolicBPChartCard
              data={fullVitalsChartData.systolic}
              maxHeight={cardMaxHeight}
            />
          </View>
          <View style={styles.container}>
            {/* Oxygen Saturation graph */}
            <OxygenSaturationChartCard
              data={fullVitalsChartData.oxygenSaturation}
              maxHeight={cardMaxHeight}
            />
            {/* Weight Graph */}
            <WeightChartCard
              data={fullVitalsChartData.weight}
              maxHeight={cardMaxHeight}
            />
          </View>
          <View style={[styles.container]}>
            {/* Fluid Intake graph */}
            <FluidIntakeChartCard
              data={fullVitalsChartData.oxygenSaturation}
              maxHeight={cardMaxHeight}
            />
          </View>
        </>
      ) : null}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
