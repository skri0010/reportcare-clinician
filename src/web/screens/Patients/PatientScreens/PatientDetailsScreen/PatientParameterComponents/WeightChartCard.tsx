import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { WeightChart } from "components/VisualizationComponents/WeightChart";
import { ParameterGraphsProps } from "components/VisualizationComponents/ParameterGraphs";

interface WeightChartCardProps extends ParameterGraphsProps {
  maxHeight: number;
}

export const WeightChartCard: FC<WeightChartCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <WeightChart data={data} />
    </CardWrapper>
  );
};
