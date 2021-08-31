import React, { FC } from "react";
import i18n from "util/language/i18n";
import { LineChartComponent } from "./LineChart";
import {
  getAverageStats,
  getXLabels,
  ParameterGraphsProps
} from "./ParameterGraphs";

export const OxygenSaturationChart: FC<ParameterGraphsProps> = ({ data }) => {
  const averageStats = getAverageStats(data);

  const xLabels = getXLabels(averageStats);

  return (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.OxygenSaturation")}
      graphSubtitle={i18n.t("Parameter_Graphs.OxygenSaturationUnit")}
      xLabels={xLabels}
      data={Object.keys(averageStats).map((key) => {
        return averageStats[key].averageOxySat;
      })}
    />
  );
};
