import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { VitalsLineChartComponent } from "components/VisualizationComponents/VitalsCharts/VitalsLineChartComponent";
import { Unit } from "util/const";

export const OxygenSaturationChart: FC<VitalsChartProps> = ({ data }) => {
  return data ? (
    <VitalsLineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.OxygenSaturation")}
      graphSubtitle={`(${Unit.OXYGEN_SATURATION})`}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
