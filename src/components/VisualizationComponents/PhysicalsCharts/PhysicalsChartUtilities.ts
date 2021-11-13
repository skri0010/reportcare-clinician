import { Physical } from "aws/API";
import { GeneralChartData } from "components/VisualizationComponents/GeneralLineChartComponent";

export interface FullPhysicalsChartData {
  steps: GeneralChartData;
  distance: GeneralChartData;
  meanSpeed: GeneralChartData;
}

export const obtainFullPhysicalsChartData: (
  physicals: Physical[]
) => FullPhysicalsChartData = (physicals) => {
  const dates = physicals.map((item) =>
    new Date(item.dateTime).toLocaleDateString()
  );
  const stepsChartData: GeneralChartData = {
    yData: physicals.map((item) => item.steps),
    xLabels: dates
  };
  const distanceChartData: GeneralChartData = {
    yData: physicals.map((item) => item.distanceInMetres),
    xLabels: dates
  };
  const meanSpeedChartData: GeneralChartData = {
    yData: physicals.map((item) => item.averageWalkingSpeedInMetresPerSeconds),
    xLabels: dates
  };
  return {
    steps: stepsChartData,
    distance: distanceChartData,
    meanSpeed: meanSpeedChartData
  };
};
