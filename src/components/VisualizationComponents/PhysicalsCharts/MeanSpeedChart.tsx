import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import {
  BaseLineChartDataProps,
  GeneralLineChartComponent
} from "components/VisualizationComponents/GeneralLineChartComponent";
import { Unit } from "util/const";

export const MeanSpeedChart: FC<BaseLineChartDataProps> = ({ data }) => {
  return data ? (
    <GeneralLineChartComponent
      graphTitle={`${i18n.t("Parameter_Graphs.MeanSpeed")} (${
        Unit.SPEED_METRES_PER_SECOND
      })`}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
