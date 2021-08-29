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
  getParameterStatFromOneVitalsReport,
  ParameterStats
} from "components/Visualization/ParameterGraphs";

interface PatientParametersProps
  extends PatientDetailsTabProps.ParametersTabProps {
  details: PatientDetails;
}

export const PatientParameters: FC<PatientParametersProps> = ({ details }) => {
  const cardMaxHeight = Math.max(
    ms(200),
    Dimensions.get("window").height * 0.8
  );
  const { vitalsReports } = details;

  const [stats, setStats] = useState<ParameterStats[] | null>(null);

  useEffect(() => {
    if (vitalsReports) {
      const tempLocalVitals: LocalReportVitals = {};
      const tempParameterStats: ParameterStats[] = [];
      // Get the last 7 days
      const targetLocaleDateStrings = getWeekLocaleDateString();

      // Get ReportVitals[] from those last 7 days if they exist
      targetLocaleDateStrings.forEach(
        (date) => (tempLocalVitals[date] = vitalsReports[date] || [])
      );

      // For each day, get parameter stats
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

      // Sort parameter stats
      tempParameterStats.sort((a, b) => a.date.valueOf() - b.date.valueOf());

      setStats(tempParameterStats);
    }
  }, [vitalsReports]);

  return (
    <ScreenWrapper padding>
      {stats ? (
        <>
          <View style={styles.container}>
            {/* Systolic Blood Graph */}
            <SystolicBPChartCard stats={stats} maxHeight={cardMaxHeight} />
            {/* Diastolic Blood Graph */}
            <DiastolicBPChartCard stats={stats} maxHeight={cardMaxHeight} />
          </View>
          <View style={styles.container}>
            {/* Oxygen Saturation graph */}
            <OxygenSaturationChartCard
              stats={stats}
              maxHeight={cardMaxHeight}
            />
            {/* Weight Graph */}
            <WeightChartCard stats={stats} maxHeight={cardMaxHeight} />
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
