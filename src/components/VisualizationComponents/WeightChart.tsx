import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { LineChartComponent } from "./LineChartComponent";
import { ParameterGraphsProps } from "./ParameterGraphs";

export const WeightChart: FC<ParameterGraphsProps> = ({ data }) => {
  return data ? (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.Weight")}
      graphSubtitle={i18n.t("Parameter_Graphs.WeightUnit")}
      xLabels={data.xLabels}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
