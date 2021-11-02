import React, { FC } from "react";
import { DiastolicBPChart } from "components/VisualizationComponents/VitalsCharts/DiastolicBPChart";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { ChartCardWrapper } from "components/VisualizationComponents/ChartCardWrapper";

export const DiastolicBPChartCard: FC<VitalsChartProps> = ({ data }) => {
  return (
    <ChartCardWrapper>
      <DiastolicBPChart data={data} />
    </ChartCardWrapper>
  );
};
