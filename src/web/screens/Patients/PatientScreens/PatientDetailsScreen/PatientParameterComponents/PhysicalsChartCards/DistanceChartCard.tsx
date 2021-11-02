import React, { FC } from "react";
import { DistanceChart } from "components/VisualizationComponents/PhysicalsCharts/DistanceChart";
import { ChartCardWrapper } from "components/VisualizationComponents/ChartCardWrapper";
import { BaseLineChartDataProps } from "components/VisualizationComponents/GeneralLineChartComponent";

export const DistanceChartCard: FC<BaseLineChartDataProps> = ({ data }) => {
  return (
    <ChartCardWrapper>
      <DistanceChart data={data} />
    </ChartCardWrapper>
  );
};
