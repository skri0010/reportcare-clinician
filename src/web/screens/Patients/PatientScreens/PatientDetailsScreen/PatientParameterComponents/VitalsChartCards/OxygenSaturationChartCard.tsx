import React, { FC } from "react";
import { OxygenSaturationChart } from "components/VisualizationComponents/VitalsCharts/OxygenSaturationChart";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { ChartCardWrapper } from "components/VisualizationComponents/ChartCardWrapper";

export const OxygenSaturationChartCard: FC<VitalsChartProps> = ({
  data,
  chartFilter
}) => {
  return (
    <ChartCardWrapper>
      <OxygenSaturationChart data={data} chartFilter={chartFilter} />
    </ChartCardWrapper>
  );
};
