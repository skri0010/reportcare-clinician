import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { WeightChart } from "components/Visualization/WeightChart";
import { ParameterGraphsProps } from "components/Visualization/ParameterGraphs";

interface WeightChartCardProps extends ParameterGraphsProps {
  maxHeight: number;
}

export const WeightChartCard: FC<WeightChartCardProps> = ({
  stats,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <WeightChart stats={stats} />
    </CardWrapper>
  );
};
