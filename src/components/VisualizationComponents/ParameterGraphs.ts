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
  fluid: Stat;
  date: Date;
}

// Processed from Stat in ParameterStats
export type SubParameterStat = {
  parameter: Stat;
  date: Date;
};

export interface FullChartData {
  diastolic: ChartData;
  systolic: ChartData;
  weight: ChartData;
  oxygenSaturation: ChartData;
  fluid: ChartData;
}

export interface ParameterGraphsProps {
  data: ChartData;
}

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
    const average = (array: number[]) => {
      // Handles case where no records were recorded for a day
      try {
        return array.reduce((a, b) => a + b) / array.length;
      } catch (err) {
        return 0;
      }
    };

    const getStat = (array: number[]) => ({
      // Handles case where no records were recorded for a day
      min: Math.min(...array) === Infinity ? 0 : Math.min(...array),
      max: Math.max(...array) === -Infinity ? 0 : Math.max(...array),
      average: average(array)
    });

    // Diastolic BP
    const diastolicBPVitals: number[] = vitalsData
      .filter((data) => data.BPDi && parseFloat(data.BPDi))
      .map((data) => parseFloat(data.BPDi!));

    // Systolic BP
    const systolicBPVitals: number[] = vitalsData
      .filter((data) => data.BPSys && parseFloat(data.BPSys))
      .map((data) => parseFloat(data.BPSys!));

    // Oxygen saturation
    const oxygenSaturation: number[] = vitalsData
      .filter((data) => data.OxySat && parseFloat(data.OxySat))
      .map((data) => parseFloat(data.OxySat!));

    // Weight
    const weightVitals: number[] = vitalsData
      .filter((data) => data.Weight && parseFloat(data.Weight))
      .map((data) => parseFloat(data.Weight!));

    // Fluid
    const fluidVitals: number[] = vitalsData
      .filter((data) => data.FluidIntake && parseFloat(data.FluidIntake))
      .map((data) => parseFloat(data.FluidIntake!));

    // Stats
    stats = {
      diastolic: getStat(diastolicBPVitals),
      systolic: getStat(systolicBPVitals),
      weight: getStat(oxygenSaturation),
      oxygenSaturation: getStat(weightVitals),
      fluid: getStat(fluidVitals),
      date: new Date(localeDateString)
    };
  }
  return stats;
};

// Divides parameter stat into a specific sub parameter stat (ie breakdown to diastolic, systolic, etc)
export const obtainFullChartData = (
  parameterStats: ParameterStats[]
): FullChartData => {
  const rename = parameterStats;
  return {
    diastolic: subParameterStatsToChartData(
      rename
        .filter((data) => data.diastolic && data.date)
        .map((data) => ({ parameter: data.diastolic, date: data.date }))
    ),
    systolic: subParameterStatsToChartData(
      rename
        .filter((data) => data.systolic && data.date)
        .map((data) => ({ parameter: data.systolic, date: data.date }))
    ),
    weight: subParameterStatsToChartData(
      rename
        .filter((data) => data.weight && data.date)
        .map((data) => ({ parameter: data.weight, date: data.date }))
    ),
    oxygenSaturation: subParameterStatsToChartData(
      rename
        .filter((data) => data.oxygenSaturation && data.date)
        .map((data) => ({ parameter: data.oxygenSaturation, date: data.date }))
    ),
    fluid: subParameterStatsToChartData(
      rename
        .filter((data) => data.fluid && data.date)
        .map((data) => ({ parameter: data.fluid, date: data.date }))
    )
  };
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
