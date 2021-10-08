import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
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
