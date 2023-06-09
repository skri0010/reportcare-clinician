import React, { FC } from "react";
import { SystolicBPChart } from "components/VisualizationComponents/VitalsCharts/SystolicBPChart";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { ChartCardWrapper } from "components/VisualizationComponents/ChartCardWrapper";

export const SystolicBPChartCard: FC<VitalsChartProps> = ({
  data,
  chartFilter
}) => {
  return (
    <ChartCardWrapper>
      <SystolicBPChart data={data} chartFilter={chartFilter} />
    </ChartCardWrapper>
  );
};
