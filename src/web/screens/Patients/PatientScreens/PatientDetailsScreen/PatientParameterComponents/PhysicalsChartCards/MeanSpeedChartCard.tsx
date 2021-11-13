import React, { FC } from "react";
import { MeanSpeedChart } from "components/VisualizationComponents/PhysicalsCharts/MeanSpeedChart";
import { BaseLineChartDataProps } from "components/VisualizationComponents/GeneralLineChartComponent";
import { ChartCardWrapper } from "components/VisualizationComponents/ChartCardWrapper";

export const MeanSpeedChartCard: FC<BaseLineChartDataProps> = ({ data }) => {
  return (
    <ChartCardWrapper>
      <MeanSpeedChart data={data} />
    </ChartCardWrapper>
  );
};
