import React, { FC, useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { RootState, select } from "util/useRedux";
import { ReportVitals } from "aws/API";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H3 } from "components/Text";
import i18n from "util/language/i18n";
import { LineChartComponent } from "./LineChart";

enum days {
  "Sunday" = 0,
  "Monday" = 1,
  "Tuesday" = 2,
  "Wednesday" = 3,
  "Thursday" = 4,
  "Friday" = 5,
  "Saturday" = 6
}

interface AverageStats {
  count: number;
  totalDiastolic: number;
  averageDiastolic: number;
  totalSystolic: number;
  averageSystolic: number;
  totalWeight: number;
  averageWeight: number;
  totalSteps: number;
  averageSteps: number;
  totalOxySat: number;
  averageOxySat: number;
}

interface ParameterGraphsProps {
  data: ReportVitals[];
}

export const ParameterGraphs: FC<ParameterGraphsProps> = ({ data }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [vitalsData, setVitalsData] = useState<ReportVitals[]>(data);

  useEffect(() => {
    setVitalsData(data);
  }, [data]);

  // Calculates average diastolic BP, systolic BP, weight and oxygen saturation each day.
  const averageStats: { [k: string]: AverageStats } = {};
  for (let i = 0; i < vitalsData.length; i += 1) {
    const item = vitalsData[i];
    const date = new Date(item.DateTime!);
    if (days[date.getDay()] in averageStats) {
      const currentMap = averageStats[days[date.getDay()]];
      currentMap.count += 1;
      currentMap.totalDiastolic += parseFloat(item.BPDi!);
      currentMap.averageDiastolic =
        currentMap.totalDiastolic / currentMap.count;

      currentMap.totalSystolic += parseFloat(item.BPSys!);
      currentMap.averageSystolic = currentMap.totalSystolic / currentMap.count;

      currentMap.totalWeight += parseFloat(item.Weight!);
      currentMap.averageWeight = currentMap.totalWeight / currentMap.count;

      currentMap.totalSteps += parseFloat(item.NoSteps!);
      currentMap.averageSteps = currentMap.totalSteps / currentMap.count;

      currentMap.totalOxySat += parseFloat(item.BPDi!);
      currentMap.averageOxySat = currentMap.totalOxySat / currentMap.count;

      averageStats[days[date.getDay()]] = currentMap;
    } else {
      averageStats[days[date.getDay()]] = {
        count: 1,
        totalDiastolic: parseFloat(item.BPDi!),
        averageDiastolic: parseFloat(item.BPDi!),
        totalSystolic: parseFloat(item.BPSys!),
        averageSystolic: parseFloat(item.BPSys!),
        totalWeight: parseFloat(item.Weight!),
        averageWeight: parseFloat(item.Weight!),
        totalSteps: parseFloat(item.NoSteps!),
        averageSteps: parseFloat(item.NoSteps!),
        totalOxySat: parseFloat(item.OxySat!),
        averageOxySat: parseFloat(item.OxySat!)
      };
    }
  }

  const xLabels = Object.keys(averageStats).map((key) =>
    i18n.t(`Parameter_Graphs.Days.${key}`)
  );

  // Local styles
  const dividerStyle = [
    styles.divider,
    { borderBottomColor: colors.secondaryBackgroundColor }
  ];

  if (Object.keys(averageStats).length > 0) {
    return (
      <ScrollView style={styles.container}>
        {/* Diastolic Blood Pressure graph */}
        <LineChartComponent
          graphTitle={i18n.t("Parameter_Graphs.DiastolicBP")}
          graphSubtitle={i18n.t("Parameter_Graphs.BPUnit")}
          xLabels={xLabels}
          data={Object.keys(averageStats).map((key) => {
            return averageStats[key].averageDiastolic;
          })}
        />
        <View style={dividerStyle} />

        {/* Systolic Blood Pressure graph */}
        <LineChartComponent
          graphTitle={i18n.t("Parameter_Graphs.SystolicBP")}
          graphSubtitle={i18n.t("Parameter_Graphs.BPUnit")}
          xLabels={xLabels}
          data={Object.keys(averageStats).map((key) => {
            return averageStats[key].averageSystolic;
          })}
        />
        <View style={dividerStyle} />

        {/* Oxygen Saturation graph */}
        <LineChartComponent
          graphTitle={i18n.t("Parameter_Graphs.OxygenSaturation")}
          graphSubtitle={i18n.t("Parameter_Graphs.OxygenSaturationUnit")}
          xLabels={xLabels}
          data={Object.keys(averageStats).map((key) => {
            return averageStats[key].averageOxySat;
          })}
        />
        <View style={dividerStyle} />

        {/* Weight graph */}
        <LineChartComponent
          graphTitle={i18n.t("Parameter_Graphs.Weight")}
          graphSubtitle={i18n.t("Parameter_Graphs.WeightUnit")}
          xLabels={xLabels}
          data={Object.keys(averageStats).map((key) => {
            return averageStats[key].averageWeight;
          })}
        />
      </ScrollView>
    );
  }
  return (
    <View style={styles.container}>
      <H3 text={i18n.t("Parameter_Graphs.NoData")} style={styles.title} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: ms(20)
  },
  title: {
    fontWeight: "bold"
  },
  divider: {
    opacity: 0.5,
    borderBottomWidth: ms(1),
    marginBottom: ms(15)
  }
});
