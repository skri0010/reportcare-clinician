import React, { FC } from "react";
import i18n from "util/language/i18n";
import { LineChartComponent } from "./LineChartComponent";
import {
  getAverageStats,
  getXLabels,
  ParameterGraphsProps
} from "./ParameterGraphs";

export const DiastolicBPChart: FC<ParameterGraphsProps> = ({ data }) => {
  const averageStats = getAverageStats(data);

  const xLabels = getXLabels(averageStats);

  return (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.DiastolicBP")}
      graphSubtitle={i18n.t("Parameter_Graphs.BPUnit")}
      xLabels={xLabels}
      data={Object.keys(averageStats).map((key) => {
        return averageStats[key].averageDiastolic;
      })}
    />
  );
};
