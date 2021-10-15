import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { ParameterGraphsProps } from "./ParameterGraphs";
import { LineChartComponent } from "./VictoryLineChartComponent";

export const SystolicBPChart: FC<ParameterGraphsProps> = ({ data }) => {
  return <LoadingIndicator />;
};
