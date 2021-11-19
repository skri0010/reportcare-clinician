import { ReportVitals } from "aws/API";
import { ChartFilter, ChartViewTypes } from "models/ChartViewTypes";
import { getNonNullItemsFromList } from "util/utilityFunctions";

export interface VitalsData {
  min: number;
  max: number;
  average: number;
  date: Date;
}

export interface VitalsDataRecord {
  diastolic: VitalsData;
  systolic: VitalsData;
  weight: VitalsData;
  oxygenSaturation: VitalsData;
  fluid: VitalsData;
  date: Date;
}

export interface VitalsChartProps {
  data: VitalsChartData;
  chartFilter: ChartFilter;
}

export interface VitalsChartData {
  min: number[];
  max: number[];
  average: number[];
  xLabels: string[];
}

export interface FullVitalsChartData {
  diastolic: VitalsChartData;
  systolic: VitalsChartData;
  weight: VitalsChartData;
  oxygenSaturation: VitalsChartData;
  fluid: VitalsChartData;
}

// Calculates average, min and max diastolic BP, systolic BP, weight and oxygen saturation during a date.
export const getVitalsDataRecord: (parameters: {
  vitalsList: ReportVitals[];
  localeDateString: string;
}) => VitalsDataRecord | null = ({ vitalsList, localeDateString }) => {
  let vitalsDataRecord: VitalsDataRecord | null = null;
  if (vitalsList.length > 0) {
    const date = new Date(localeDateString);

    // Utility function
    const getVitalsData = (values: number[]): VitalsData => {
      const average = (valuesToAverage: number[]) => {
        // Handles case where no records were recorded for a day
        try {
          return (
            valuesToAverage.reduce((a, b) => a + b) / valuesToAverage.length
          );
        } catch (err) {
          return 0;
        }
      };
      return {
        min: values.length > 0 ? Math.min(...values) : 0,
        max: values.length > 0 ? Math.max(...values) : 0,
        average: average(values),
        date: date
      };
    };

    // Diastolic BP
    const diastolicBPVitals = getNonNullItemsFromList(
      vitalsList.map((data) => data.diastolicBloodPressure)
    );

    // Systolic BP
    const systolicBPVitals = getNonNullItemsFromList(
      vitalsList.map((data) => data.systolicBloodPressure)
    );

    // Oxygen saturation
    const oxygenSaturation = getNonNullItemsFromList(
      vitalsList.map((data) => data.oxygenSaturation)
    );

    // Weight
    const weightVitals = getNonNullItemsFromList(
      vitalsList.map((data) => data.weight)
    );

    // Fluid
    const fluidVitals: number[] = getNonNullItemsFromList(
      vitalsList.map((data) => data.fluidIntakeInMl)
    );

    // VitalsDataRecord
    vitalsDataRecord = {
      diastolic: getVitalsData(diastolicBPVitals),
      systolic: getVitalsData(systolicBPVitals),
      weight: getVitalsData(weightVitals),
      oxygenSaturation: getVitalsData(oxygenSaturation),
      fluid: getVitalsData(fluidVitals),
      date: new Date(localeDateString)
    };
  }
  return vitalsDataRecord;
};

// Breakdown parameter in each vitals data record stat into a specific sub parameter(ie breakdown to diastolic, systolic, etc)
export const obtainFullVitalsChartData = (
  parameterStats: VitalsDataRecord[]
): FullVitalsChartData => {
  const parametersRecords = parameterStats;
  return {
    diastolic: vitalsDataListToChartData(
      parametersRecords.flatMap((data) =>
        data.diastolic && data.date ? [data.diastolic] : []
      )
    ),
    systolic: vitalsDataListToChartData(
      parametersRecords.flatMap((data) =>
        data.systolic && data.date ? [data.systolic] : []
      )
    ),
    weight: vitalsDataListToChartData(
      parametersRecords.flatMap((data) =>
        data.weight && data.date ? [data.weight] : []
      )
    ),
    oxygenSaturation: vitalsDataListToChartData(
      parametersRecords.flatMap((data) =>
        data.oxygenSaturation && data.date ? [data.oxygenSaturation] : []
      )
    ),
    fluid: vitalsDataListToChartData(
      parametersRecords.flatMap((data) =>
        data.fluid && data.date ? [data.fluid] : []
      )
    )
  };
};

export const vitalsDataListToChartData: (
  vitalsDataList: VitalsData[]
) => VitalsChartData = (vitalsDataList) => {
  const chartData: VitalsChartData = {
    min: [],
    max: [],
    average: [],
    xLabels: []
  };
  vitalsDataList.forEach(({ min, max, average, date }) => {
    chartData.min.push(min);
    chartData.max.push(max);
    chartData.average.push(average);
    chartData.xLabels.push(date.toLocaleDateString());
  });
  return chartData;
};

export const getVictoryVitalsChartData = (
  data: VitalsChartData,
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
