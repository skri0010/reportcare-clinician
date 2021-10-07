import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { ParameterGraphsProps } from "./ParameterGraphs";
import { LineChartComponent } from "./VictoryLineChartComponent";

export const OxygenSaturationChart: FC<ParameterGraphsProps> = ({ data }) => {
  return data ? (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.OxygenSaturation")}
      graphSubtitle={i18n.t("Parameter_Graphs.OxygenSaturationUnit")}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
