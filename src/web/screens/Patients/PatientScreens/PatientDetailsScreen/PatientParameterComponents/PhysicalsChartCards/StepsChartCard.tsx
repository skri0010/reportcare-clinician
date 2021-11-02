import React, { FC } from "react";
import { StepsChart } from "components/VisualizationComponents/PhysicalsCharts/StepsChart";
import { BaseLineChartDataProps } from "components/VisualizationComponents/GeneralLineChartComponent";
import { ChartCardWrapper } from "components/VisualizationComponents/ChartCardWrapper";

export const StepsChartCard: FC<BaseLineChartDataProps> = ({ data }) => {
  return (
    <ChartCardWrapper>
      <StepsChart data={data} />
    </ChartCardWrapper>
  );
};
