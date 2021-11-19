import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { VitalsLineChartComponent } from "components/VisualizationComponents/VitalsCharts/VitalsLineChartComponent";
import { Unit } from "util/const";

export const FluidIntakeChart: FC<VitalsChartProps> = ({
  data,
  chartFilter
}) => {
  return data ? (
    <VitalsLineChartComponent
      graphTitle={i18n.t("Parameter_Graphs.FluidIntake")}
      graphSubtitle={`(${Unit.FLUID})`}
      data={data}
      chartFilter={chartFilter}
    />
  ) : (
    <LoadingIndicator />
  );
};
