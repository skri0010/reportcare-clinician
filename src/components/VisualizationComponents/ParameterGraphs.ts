import { ReportVitals } from "aws/API";
import { ChartViewTypes } from "models/ChartViewTypes";
import i18n from "util/language/i18n";
import { getNonNullItemsFromList } from "util/utilityFunctions";

export interface Parameter {
  min: number;
  max: number;
  average: number;
  date: Date;
}

export interface ParametersRecord {
  diastolic: Parameter;
  systolic: Parameter;
  weight: Parameter;
  oxygenSaturation: Parameter;
  fluid: Parameter;
  date: Date;
}

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
export const getParametersRecordFromVitalsReport = (
  vitalsData: ReportVitals[],
  localeDateString: string
): ParametersRecord | null => {
  let stats: ParametersRecord | null = null;
  if (vitalsData.length > 0) {
    const date = new Date(localeDateString);

    // Utility functions
    const average = (array: number[]) => {
      // Handles case where no records were recorded for a day
      try {
        return array.reduce((a, b) => a + b) / array.length;
      } catch (err) {
        return 0;
      }
    };

    const getParameter = (array: number[]): Parameter => ({
      // Handles case where no records were recorded for a day
      min: array.length > 0 ? Math.min(...array) : 0,
      max: array.length > 0 ? Math.max(...array) : 0,
      average: average(array),
      date: date
    });

    // Diastolic BP
    const diastolicBPVitals: number[] = getNonNullItemsFromList(
      vitalsData.map((data) => data.diastolicBloodPressure)
    );

    // Systolic BP
    const systolicBPVitals: number[] = getNonNullItemsFromList(
      vitalsData.map((data) => data.systolicBloodPressure)
    );

    // Oxygen saturation
    const oxygenSaturation: number[] = getNonNullItemsFromList(
      vitalsData.map((data) => data.oxygenSaturation)
    );

    // Weight
    const weightVitals: number[] = getNonNullItemsFromList(
      vitalsData.map((data) => data.weight)
    );

    // Fluid
    const fluidVitals: number[] = getNonNullItemsFromList(
      vitalsData.map((data) => data.fluidIntakeInMl)
    );

    // DS-TODO: Steps

    // Stats
    stats = {
      diastolic: getParameter(diastolicBPVitals),
      systolic: getParameter(systolicBPVitals),
      weight: getParameter(weightVitals),
      oxygenSaturation: getParameter(oxygenSaturation),
      fluid: getParameter(fluidVitals),
      date: new Date(localeDateString)
    };
  }
  return stats;
};

// Divides parameter stat into a specific sub parameter stat (ie breakdown to diastolic, systolic, etc)
export const obtainFullChartData = (
  parameterStats: ParametersRecord[]
): FullChartData => {
  const parametersRecords = parameterStats;
  return {
    diastolic: parameterRecordsToChartData(
      parametersRecords.flatMap((data) =>
        data.diastolic && data.date ? [data.diastolic] : []
      )
    ),
    systolic: parameterRecordsToChartData(
      parametersRecords.flatMap((data) =>
        data.systolic && data.date ? [data.systolic] : []
      )
    ),
    weight: parameterRecordsToChartData(
      parametersRecords.flatMap((data) =>
        data.weight && data.date ? [data.weight] : []
      )
    ),
    oxygenSaturation: parameterRecordsToChartData(
      parametersRecords.flatMap((data) =>
        data.oxygenSaturation && data.date ? [data.oxygenSaturation] : []
      )
    ),
    fluid: parameterRecordsToChartData(
      parametersRecords.flatMap((data) =>
        data.fluid && data.date ? [data.fluid] : []
      )
    )
    // DS-TODO: Steps
  };
};

export const parameterRecordsToChartData: (
  subParameterStats: Parameter[]
) => ChartData = (subParameterStats) => {
  const chartData: ChartData = {
    min: [],
    max: [],
    average: [],
    xLabels: []
  };
  subParameterStats.forEach(({ min, max, average, date }) => {
    chartData.min.push(min);
    chartData.max.push(max);
    chartData.average.push(average);
    chartData.xLabels.push(date.toLocaleDateString());
  });
  return chartData;
};

export const getXLabels = (averageStats: {
  [k: string]: ParametersRecord;
}): string[] => {
  const xLabels = Object.keys(averageStats).map((key) =>
    i18n.t(`Parameter_Graphs.Days.${key}`)
  );
  return xLabels;
};

export const getVictoryChartData = (
  data: ChartData,
  type: ChartViewTypes.MIN | ChartViewTypes.MAX | ChartViewTypes.AVERAGE
): { x: string; y: number }[][] => {
  const compiledData: { x: string; y: number }[][] = [];
  let temp: { x: string; y: number }[] = [];

  for (let i = 0; i < data.xLabels.length; i++) {
    if (data[type][i] > 0) {
      temp.push({ x: data.xLabels[i], y: data[type][i] });
      if (i === data.xLabels.length - 1) {
        if (temp.length > 0) {
          compiledData.push(temp);
        }
      }
    } else {
      compiledData.push(temp);
      temp = [];
    }
  }
  return compiledData;
};
