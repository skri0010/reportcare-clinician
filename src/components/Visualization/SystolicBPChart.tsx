import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { LineChartComponent } from "./LineChartComponent";
import { ParameterGraphsProps } from "./ParameterGraphs";

export const SystolicBPChart: FC<ParameterGraphsProps> = ({ data }) => {
  return data ? (
    <LineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.SystolicBP")}
      graphSubtitle={i18n.t("Parameter_Graphs.BPUnit")}
      xLabels={data.xLabels}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
