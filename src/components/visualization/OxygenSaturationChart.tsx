import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC, useEffect, useState } from "react";
import i18n from "util/language/i18n";
import { LineChartComponent } from "./LineChartComponent";
import {
  ChartData,
  ParameterGraphsProps,
  SubParameterStat,
  subParameterStatsToChartData
} from "./ParameterGraphs";

export const OxygenSaturationChart: FC<ParameterGraphsProps> = ({ stats }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    // Obtain specific parameter to turn into chart data
    const subParameterStats: SubParameterStat[] = stats
      .filter((data) => data.oxygenSaturation && data.date)
      .map((data) => ({ parameter: data.oxygenSaturation, date: data.date }));

    setChartData(subParameterStatsToChartData(subParameterStats));
  }, [stats]);

  return chartData ? (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.OxygenSaturation")}
      graphSubtitle={i18n.t("Parameter_Graphs.OxygenSaturationUnit")}
      xLabels={chartData.xLabels}
      data={chartData}
    />
  ) : (
    <LoadingIndicator />
  );
};
