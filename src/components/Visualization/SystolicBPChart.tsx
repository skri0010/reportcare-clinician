import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC, useState, useEffect } from "react";
import i18n from "util/language/i18n";
import { LineChartComponent } from "./LineChartComponent";
import {
  ChartData,
  ParameterGraphsProps,
  SubParameterStat,
  subParameterStatsToChartData
} from "./ParameterGraphs";

export const SystolicBPChart: FC<ParameterGraphsProps> = ({ stats }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    // Obtain specific parameter to turn into chart data
    const subParameterStats: SubParameterStat[] = stats
      .filter((data) => data.systolic && data.date)
      .map((data) => ({ parameter: data.systolic, date: data.date }));

    setChartData(subParameterStatsToChartData(subParameterStats));
  }, [stats]);

  return chartData ? (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.SystolicBP")}
      graphSubtitle={i18n.t("Parameter_Graphs.BPUnit")}
      xLabels={chartData.xLabels}
      data={chartData.min}
    />
  ) : (
    <LoadingIndicator />
  );
};
