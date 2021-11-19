import React, { FC } from "react";

import { WeightChart } from "components/VisualizationComponents/VitalsCharts/WeightChart";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { ChartCardWrapper } from "components/VisualizationComponents/ChartCardWrapper";

export const WeightChartCard: FC<VitalsChartProps> = ({
  data,
  chartFilter
}) => {
  return (
    <ChartCardWrapper>
      <WeightChart data={data} chartFilter={chartFilter} />
    </ChartCardWrapper>
  );
};
