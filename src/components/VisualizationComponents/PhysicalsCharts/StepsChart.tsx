import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import {
  BaseLineChartDataProps,
  GeneralLineChartComponent
} from "components/VisualizationComponents/GeneralLineChartComponent";

export const StepsChart: FC<BaseLineChartDataProps> = ({ data }) => {
  return data ? (
    <GeneralLineChartComponent
      graphTitle={`${i18n.t("Parameter_Graphs.Steps")} (${i18n.t(
        "Parameter_Graphs.StepsUnit"
      )})`}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
