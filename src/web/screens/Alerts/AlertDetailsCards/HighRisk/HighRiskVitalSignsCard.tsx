import React, { FC, useEffect, useState } from "react";
import i18n from "util/language/i18n";
import { ReportVitals } from "aws/API";
import { BaseDetailsCard } from "../BaseDetailsCard";
import { LocalReportVitals } from "rc_agents/model";
import {
  FullChartData,
  getParameterStatFromOneVitalsReport,
  obtainFullChartData,
  ParameterStats
} from "components/VisualizationComponents/ParameterGraphs";
import { ChartFilterPillList } from "components/Buttons/ChartFilterPillList";
import { Dimensions, View } from "react-native";
import { DiastolicBPChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/DiastolicBPChartCard";
import { FluidIntakeChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/FluidIntakeChart";
import { NumberOfStepsChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/NumberOfStepsChartCard";
import { OxygenSaturationChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/OxygenSaturationChartCard";
import { SystolicBPChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/SystolicBPChartCard";
import { WeightChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/WeightChartCard";
import { ms, ScaledSheet } from "react-native-size-matters";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";

interface HighRiskVitalSignsCardProps {
  vitalsReports?: ReportVitals[] | null;
}

export const HighRiskVitalSignsCard: FC<HighRiskVitalSignsCardProps> = ({
  vitalsReports
}) => {
  const maxGraphHeight = Math.max(
    ms(200),
    Dimensions.get("window").height * 0.8
  );

  const [fullChartData, setFullChartData] = useState<FullChartData | undefined>(
    undefined
  );

  // Gets stats from vitals to be displayed in graphs
  useEffect(() => {
    if (vitalsReports) {
      const tempLocalVitals: LocalReportVitals = {};
      const tempParameterStats: ParameterStats[] = [];

      // Arrange ReportVitals[] according to date
      vitalsReports.forEach((report) => {
        const tempKey = new Date(report.dateTime).toLocaleDateString();
        if (tempLocalVitals[tempKey]) {
          tempLocalVitals[tempKey]!.push(report);
        } else {
          tempLocalVitals[tempKey] = [report];
        }
      });

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

      setFullChartData(tempFullChartData);
    }
  }, [vitalsReports]);

  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.AlertVitals.Vitals")}
      iconName="heart-pulse"
    >
      {fullChartData ? (
        <>
          <ChartFilterPillList />
          <View style={styles.rowContainer}>
            {/* Number of Steps Graph */}
            <NumberOfStepsChartCard
              data={fullChartData.steps}
              maxHeight={maxGraphHeight}
            />
            {/* Fluid Intake Graph */}
            <FluidIntakeChartCard
              data={fullChartData.fluid}
              maxHeight={maxGraphHeight}
            />
          </View>
          <View style={styles.rowContainer}>
            {/* Diastolic Blood Graph */}
            <DiastolicBPChartCard
              data={fullChartData.diastolic}
              maxHeight={maxGraphHeight}
            />
            {/* Systolic Blood Graph */}
            <SystolicBPChartCard
              data={fullChartData.systolic}
              maxHeight={maxGraphHeight}
            />
          </View>
          <View style={styles.rowContainer}>
            {/* Oxygen Saturation Graph */}
            <OxygenSaturationChartCard
              data={fullChartData.oxygenSaturation}
              maxHeight={maxGraphHeight}
            />
            {/* Weight Graph */}
            <WeightChartCard
              data={fullChartData.weight}
              maxHeight={maxGraphHeight}
            />
          </View>
        </>
      ) : (
        <NoListItemMessage
          screenMessage={i18n.t("Alerts.AlertVitals.NoVitalsReport")}
        />
      )}
    </BaseDetailsCard>
  );
};

const styles = ScaledSheet.create({
  rowContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
