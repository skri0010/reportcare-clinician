import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { StepsChart } from "components/VisualizationComponents/PhysicalsCharts/StepsChart";
import { BaseLineChartDataProps } from "components/VisualizationComponents/GeneralLineChartComponent";

interface StepsChartCardProps extends BaseLineChartDataProps {
  maxHeight: number;
}

export const StepsChartCard: FC<StepsChartCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <StepsChart data={data} />
    </CardWrapper>
  );
};
