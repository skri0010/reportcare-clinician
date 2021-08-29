import { ReportVitals } from "aws/API";
import i18n from "util/language/i18n";

export interface ChartData {
  data: number[];
  xLabels: string[];
}

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

export interface ParameterGraphsProps {
  vitals: ReportVitals[];
}

export const getAverageStats = (
  vitalsData: ReportVitals[]
): { [k: string]: AverageStats } => {
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
  return averageStats;
};

export const getXLabels = (averageStats: {
  [k: string]: AverageStats;
}): string[] => {
  const xLabels = Object.keys(averageStats).map((key) =>
    i18n.t(`Parameter_Graphs.Days.${key}`)
  );
  return xLabels;
};
