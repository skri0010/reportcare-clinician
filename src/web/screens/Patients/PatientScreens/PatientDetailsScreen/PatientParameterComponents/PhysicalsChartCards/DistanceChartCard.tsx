import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { DistanceChart } from "components/VisualizationComponents/PhysicalsCharts/DistanceChart";
import { BaseLineChartDataProps } from "components/VisualizationComponents/GeneralLineChartComponent";

interface DistanceChartCardProps extends BaseLineChartDataProps {
  maxHeight: number;
}

export const DistanceChartCard: FC<DistanceChartCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <DistanceChart data={data} />
    </CardWrapper>
  );
};
