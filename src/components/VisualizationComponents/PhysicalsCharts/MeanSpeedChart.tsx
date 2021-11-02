import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import {
  BaseLineChartDataProps,
  GeneralLineChartComponent
} from "components/VisualizationComponents/GeneralLineChartComponent";

export const MeanSpeedChart: FC<BaseLineChartDataProps> = ({ data }) => {
  return data ? (
    <GeneralLineChartComponent
      graphTitle={`${i18n.t("Parameter_Graphs.MeanSpeed")} (${i18n.t(
        "Parameter_Graphs.MeanSpeedUnit"
      )})`}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
