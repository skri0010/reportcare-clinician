import React, { FC, useEffect, useState } from "react";
import i18n from "util/language/i18n";
import { ReportVitals } from "aws/API";
import { BaseDetailsCard } from "../BaseDetailsCard";
import { LocalReportVitals } from "rc_agents/model";
import {
  FullVitalsChartData,
  getVitalsDataRecord,
  obtainFullVitalsChartData,
  VitalsDataRecord
} from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { ChartFilterPillList } from "components/Buttons/ChartFilterPillList";
import { View } from "react-native";
import { DiastolicBPChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/DiastolicBPChartCard";
import { FluidIntakeChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/FluidIntakeChart";
import { OxygenSaturationChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/OxygenSaturationChartCard";
import { SystolicBPChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/SystolicBPChartCard";
import { WeightChartCard } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/VitalsChartCards/WeightChartCard";
import { ScaledSheet } from "react-native-size-matters";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";

interface HighRiskVitalSignsCardProps {
  vitalsReports?: ReportVitals[] | null;
}

export const HighRiskVitalSignsCard: FC<HighRiskVitalSignsCardProps> = ({
  vitalsReports
}) => {
  const [fullChartData, setFullChartData] = useState<
    FullVitalsChartData | undefined
  >(undefined);

  // Gets stats from vitals to be displayed in graphs
  useEffect(() => {
    if (vitalsReports) {
      const tempLocalVitals: LocalReportVitals = {};
      const tempParameterStats: VitalsDataRecord[] = [];

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
          const parameterStat = getVitalsDataRecord({
            vitalsList: vitalsList,
            localeDateString: date
          });
          if (parameterStat) {
            tempParameterStats.push(parameterStat);
          }
        }
      });

      // Sort parameter stats based on ascending date
      tempParameterStats.sort((a, b) => a.date.valueOf() - b.date.valueOf());

      // Finally obtain full chart data
      // ie for each parameter, like systolic => min[], max[], average[], dates[]
      const tempFullChartData = obtainFullVitalsChartData(tempParameterStats);

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
            {/* DS-TODO: Physical Graph */}
            {/* <NumberOfStepsChartCard
              data={fullChartData.steps}
              maxHeight={maxGraphHeight}
            /> */}
            {/* Fluid Intake Graph */}
            <FluidIntakeChartCard data={fullChartData.fluid} />
          </View>
          <View style={styles.rowContainer}>
            {/* Diastolic Blood Graph */}
            <DiastolicBPChartCard data={fullChartData.diastolic} />
            {/* Systolic Blood Graph */}
            <SystolicBPChartCard data={fullChartData.systolic} />
          </View>
          <View style={styles.rowContainer}>
            {/* Oxygen Saturation Graph */}
            <OxygenSaturationChartCard data={fullChartData.oxygenSaturation} />
            {/* Weight Graph */}
            <WeightChartCard data={fullChartData.weight} />
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
