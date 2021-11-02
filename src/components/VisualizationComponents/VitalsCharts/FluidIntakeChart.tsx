import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { VitalsLineChartComponent } from "components/VisualizationComponents/VitalsCharts/VitalsLineChartComponent";

export const FluidIntakeChart: FC<VitalsChartProps> = ({ data }) => {
  return data ? (
    <VitalsLineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.FluidIntake")}
      graphSubtitle={`(${i18n.t("Parameter_Graphs.FluidUnit")})`}
      data={data}
    />
  ) : (
    <LoadingIndicator />
  );
};
