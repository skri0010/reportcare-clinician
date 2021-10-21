import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { ParameterGraphsProps } from "./ParameterGraphs";
import { LineChartComponent } from "./VictoryLineChartComponent";

export const FluidIntakeChart: FC<ParameterGraphsProps> = ({ data }) => {
  return data ? (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.FluidIntake")}
      graphSubtitle={`(${i18n.t("Parameter_Graphs.FluidUnit")})`}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
