import React, { FC, useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  ViewStyle,
  ScrollView,
  Platform
} from "react-native";
import { RootState, select } from "util/useRedux";
import { LineChart } from "react-native-chart-kit";
import { ReportVitals } from "aws/API";
import { ms, ScaledSheet } from "react-native-size-matters";

enum days {
  "Sun" = 0,
  "Mon" = 1,
  "Tue" = 2,
  "Wed" = 3,
  "Thu" = 4,
  "Fri" = 5,
  "Sat" = 6
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
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
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

  // Line graphs configuration
  const chartConfig = {
    backgroundGradientFrom: colors.primaryBackgroundColor,
    backgroundGradientTo: colors.primaryBackgroundColor,
    color: (opacity = 1) => `rgba(255, 0, 100, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: ms(4),
    propsForLabels: {
      fontSize: fonts.h4Size,
      fontWeight: "bold"
    },
    propsForDots: {
      r: "6"
    },
    propsForBackgroundLines: {
      strokeWidth: ms(2)
    }
  };

  // Local styles
  const titleStyle = [styles.title, { fontSize: fonts.h2Size }];
  const unitStyle = [styles.title, { fontSize: fonts.h3Size }];
  const dividerStyle = [
    styles.divider,
    { borderBottomColor: colors.secondaryBackgroundColor }
  ];

  const webChartStyle = {
    paddingTop: ms(30),
    paddingRight: ms(50),
    alignSelf: "center"
  } as Partial<ViewStyle>;

  const mobileChartStyle = {
    paddingTop: ms(20),
    paddingBottom: ms(10),
    alignSelf: "center"
  } as Partial<ViewStyle>;

  const chartStyle = Platform.OS === "web" ? webChartStyle : mobileChartStyle;

  const width =
    Platform.OS === "web"
      ? Dimensions.get("window").width / 2
      : (Dimensions.get("window").width * 6) / 7;

  const height =
    Platform.OS === "web"
      ? (Dimensions.get("window").height * 3) / 5
      : Dimensions.get("window").height / 3;

  if (Object.keys(averageStats).length > 0) {
    return (
      <ScrollView style={styles.container}>
        {/* Diastolic Blood Pressure graph */}
        <View style={styles.titleContainer}>
          <Text style={titleStyle}>Diastolic Blood Pressure </Text>
          <Text style={unitStyle}>(mmHg)</Text>
        </View>
        <LineChart
          data={{
            labels: Object.keys(averageStats),
            datasets: [
              {
                data: Object.keys(averageStats).map((key) => {
                  return averageStats[key].averageDiastolic;
                })
              }
            ]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={chartStyle}
        />
        <View style={dividerStyle} />
        {/* Systolic Blood Pressure graph */}
        <View style={styles.titleContainer}>
          <Text style={titleStyle}>Systolic Blood Pressure </Text>
          <Text style={unitStyle}>(mmHg)</Text>
        </View>
        <LineChart
          data={{
            labels: Object.keys(averageStats),
            datasets: [
              {
                data: Object.keys(averageStats).map((key) => {
                  return averageStats[key].averageSystolic;
                })
              }
            ]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={chartStyle}
        />
        <View style={dividerStyle} />
        {/* Oxygen Saturation graph */}
        <View style={styles.titleContainer}>
          <Text style={titleStyle}>Oxygen Saturation </Text>
          <Text style={unitStyle}>(%)</Text>
        </View>
        <LineChart
          data={{
            labels: Object.keys(averageStats),
            datasets: [
              {
                data: Object.keys(averageStats).map((key) => {
                  return averageStats[key].averageOxySat;
                })
              }
            ]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={chartStyle}
        />
        <View style={dividerStyle} />
        {/* Weight graph */}
        <View style={styles.titleContainer}>
          <Text style={titleStyle}>Weight </Text>
          <Text style={unitStyle}>(kg)</Text>
        </View>
        <LineChart
          data={{
            labels: Object.keys(averageStats),
            datasets: [
              {
                data: Object.keys(averageStats).map((key) => {
                  return averageStats[key].averageWeight;
                })
              }
            ]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={chartStyle}
        />
      </ScrollView>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={titleStyle}>No data was found</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: ms(20)
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: ms(10)
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
