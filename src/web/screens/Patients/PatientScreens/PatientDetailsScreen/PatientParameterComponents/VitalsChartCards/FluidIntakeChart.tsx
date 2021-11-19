import React, { FC } from "react";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { FluidIntakeChart } from "components/VisualizationComponents/VitalsCharts/FluidIntakeChart";
import { ChartCardWrapper } from "components/VisualizationComponents/ChartCardWrapper";

export const FluidIntakeChartCard: FC<VitalsChartProps> = ({
  data,
  chartFilter
}) => {
  return (
    <ChartCardWrapper>
      <FluidIntakeChart data={data} chartFilter={chartFilter} />
    </ChartCardWrapper>
  );
};
