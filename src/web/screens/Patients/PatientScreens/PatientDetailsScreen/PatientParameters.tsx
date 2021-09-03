/* eslint-disable no-console */
import React, { FC, useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { WeightChartCard } from "./PatientParameterComponents/WeightChartCard";
import { DiastolicBPChartCard } from "./PatientParameterComponents/DiastolicBPChartCard";
import { OxygenSaturationChartCard } from "./PatientParameterComponents/OxygenSaturationChartCard";
import { SystolicBPChartCard } from "./PatientParameterComponents/SystolicBPChartCard";
import { PatientDetailsTabProps } from "web/navigation/types";
import { LocalReportVitals, PatientDetails } from "rc_agents/model";
import { getWeekLocaleDateString } from "util/utilityFunctions";
import {
  FullChartData,
  getParameterStatFromOneVitalsReport,
  obtainFullChartData,
  ParameterStats
} from "components/VisualizationComponents/ParameterGraphs";
import { mockLocalReportVitals } from "mock/mockVitals";

interface PatientParametersProps
  extends PatientDetailsTabProps.ParametersTabProps {
  details: PatientDetails;
}

export const PatientParameters: FC<PatientParametersProps> = ({ details }) => {
  const cardMaxHeight = Math.max(
    ms(200),
    Dimensions.get("window").height * 0.8
  );
  // JH-TODO: Uncomment following line and remove line with mock local report vitals
  // const { vitalsReports } = details;
  const vitalsReports = mockLocalReportVitals;
  console.log(vitalsReports);

  const [fullChartData, setFullChartData] = useState<FullChartData | null>(
    null
  );

  useEffect(() => {
    if (vitalsReports) {
      const tempLocalVitals: LocalReportVitals = {};
      const tempParameterStats: ParameterStats[] = [];
      // Get 7 days locale date string[]
      const targetLocaleDateStrings = getWeekLocaleDateString();

      // Get ReportVitals[] from those days (if exist)
      targetLocaleDateStrings.forEach(
        (date) => (tempLocalVitals[date] = vitalsReports[date] || [])
      );

      // Extract parameter stat (min, max, average) for each ReportVitals[] (each day)
      Object.keys(tempLocalVitals).forEach((date) => {
        const vitalsList = tempLocalVitals[date];
        if (vitalsList) {
          const parameterStat = getParameterStatFromOneVitalsReport(
            vitalsList,
            date
          );
          if (parameterStat) {
            tempParameterStats.push(parameterStat);
          }
        }
      });

      // Sort parameter stats based on ascending date
      tempParameterStats.sort((a, b) => a.date.valueOf() - b.date.valueOf());

      // Finally obtain full chart data
      // ie for each parameter, like systolic => min[], max[], average[], dates[]
      const tempFullChartData = obtainFullChartData(tempParameterStats);

      console.log(tempFullChartData);
      setFullChartData(tempFullChartData);
    }
  }, [vitalsReports]);

  return (
    <ScreenWrapper padding>
      {fullChartData ? (
        <>
          <View style={styles.container}>
            {/* Diastolic Blood Graph */}
            <DiastolicBPChartCard
              data={fullChartData.diastolic}
              maxHeight={cardMaxHeight}
            />
            {/* Systolic Blood Graph */}
            <SystolicBPChartCard
              data={fullChartData.systolic}
              maxHeight={cardMaxHeight}
            />
          </View>
          <View style={styles.container}>
            {/* Oxygen Saturation graph */}
            <OxygenSaturationChartCard
              data={fullChartData.oxygenSaturation}
              maxHeight={cardMaxHeight}
            />
            {/* Weight Graph */}
            <WeightChartCard
              data={fullChartData.weight}
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
