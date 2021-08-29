import { ReportVitals } from "aws/API";
import i18n from "util/language/i18n";

enum days {
  "Sunday" = 0,
  "Monday" = 1,
  "Tuesday" = 2,
  "Wednesday" = 3,
  "Thursday" = 4,
  "Friday" = 5,
  "Saturday" = 6
}

export interface Stat {
  min: number;
  max: number;
  average: number;
}

export interface ParameterStats {
  diastolic: Stat;
  systolic: Stat;
  weight: Stat;
  oxygenSaturation: Stat;
  date: Date;
}

export interface ParameterGraphsProps {
  stats: ParameterStats[];
}

// Processed from Stat in ParameterStats
export type SubParameterStat = {
  parameter: Stat;
  date: Date;
};

export interface ChartData {
  min: number[];
  max: number[];
  average: number[];
  xLabels: string[];
}

// Calculates average, min and max diastolic BP, systolic BP, weight and oxygen saturation from one day.
export const getParameterStatFromOneVitalsReport = (
  vitalsData: ReportVitals[],
  localeDateString: string
): ParameterStats | null => {
  let stats: ParameterStats | null = null;
  if (vitalsData.length > 0) {
    // Utility functions
    const average = (array: number[]) =>
      array.reduce((a, b) => a + b) / array.length;

    const getStat = (array: number[]) => ({
      min: Math.min(...array),
      max: Math.max(...array),
      average: average(array)
    });

    // Diastolic BP
    const diastolicBPVitals: number[] = vitalsData
      .filter((data) => parseFloat(data.BPDi))
      .map((data) => parseFloat(data.BPDi));

    // Systolic BP
    const systolicBPVitals: number[] = vitalsData
      .filter((data) => parseFloat(data.BPSys))
      .map((data) => parseFloat(data.BPSys));

    // Oxygen saturation
    const oxygenSaturation: number[] = vitalsData
      .filter((data) => parseFloat(data.OxySat))
      .map((data) => parseFloat(data.OxySat));

    // Weight
    const weightVitals: number[] = vitalsData
      .filter((data) => parseFloat(data.Weight))
      .map((data) => parseFloat(data.Weight));

    // Statsw
    stats = {
      diastolic: getStat(diastolicBPVitals),
      systolic: getStat(systolicBPVitals),
      weight: getStat(oxygenSaturation),
      oxygenSaturation: getStat(weightVitals),
      date: new Date(localeDateString)
    };
  }
  return stats;
};

export const subParameterStatsToChartData: (
  subParameterStats: SubParameterStat[]
) => ChartData = (subParameterStats) => {
  const chartData: ChartData = {
    min: [],
    max: [],
    average: [],
    xLabels: []
  };
  subParameterStats.forEach(({ parameter, date }) => {
    chartData.min.push(parameter.min);
    chartData.max.push(parameter.max);
    chartData.average.push(parameter.average);
    chartData.xLabels.push(date.toLocaleDateString());
  });
  return chartData;
};

export const getXLabels = (averageStats: {
  [k: string]: ParameterStats;
}): string[] => {
  const xLabels = Object.keys(averageStats).map((key) =>
    i18n.t(`Parameter_Graphs.Days.${key}`)
  );
  return xLabels;
};
