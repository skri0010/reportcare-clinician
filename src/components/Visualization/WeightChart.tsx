import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC, useEffect, useState } from "react";
import i18n from "util/language/i18n";
import { LineChartComponent } from "./LineChartComponent";
import { ChartData, ParameterGraphsProps } from "./ParameterGraphs";

export const WeightChart: FC<ParameterGraphsProps> = ({ vitals }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const tempData: number[] = [];
    const tempXLabels: string[] = [];
    vitals.forEach((report) => {
      const value = parseFloat(report.Weight);
      const dateStr = new Date(report.DateTime).toLocaleDateString();
      if (value && dateStr) {
        tempData.push(value);
        tempXLabels.push(dateStr);
      }
    });
    setChartData({ data: tempData, xLabels: tempXLabels });
  }, [vitals]);

  return chartData ? (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.Weight")}
      graphSubtitle={i18n.t("Parameter_Graphs.WeightUnit")}
      xLabels={chartData.xLabels}
      data={chartData.data}
    />
  ) : (
    <LoadingIndicator />
  );
};
