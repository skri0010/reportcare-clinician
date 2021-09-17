import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { ParameterGraphsProps } from "./ParameterGraphs";
import { LineChartComponent } from "./VictoryLineChartComponent";

export const WeightChart: FC<ParameterGraphsProps> = ({ data }) => {
  return data ? (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.Weight")}
      graphSubtitle={i18n.t("Parameter_Graphs.WeightUnit")}
      data={data}
      minDomainY={10}
    />
  ) : (
    <LoadingIndicator />
  );
};
