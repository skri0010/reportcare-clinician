import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import {
  BaseLineChartDataProps,
  GeneralLineChartComponent
} from "components/VisualizationComponents/GeneralLineChartComponent";
import { Unit } from "util/const";

export const DistanceChart: FC<BaseLineChartDataProps> = ({ data }) => {
  return data ? (
    <GeneralLineChartComponent
      graphTitle={`${i18n.t("Parameter_Graphs.Distance")} (${
        Unit.DISTANCE_METRES
      })`}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
