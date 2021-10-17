import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { ParameterGraphsProps } from "components/VisualizationComponents/ParameterGraphs";
import { NumberOfStepsChart } from "components/VisualizationComponents/NumberOfStepsChart";

interface NumberOfStepsChartCardProps extends ParameterGraphsProps {
  maxHeight: number;
}

export const NumberOfStepsChartCard: FC<NumberOfStepsChartCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <NumberOfStepsChart data={data} />
    </CardWrapper>
  );
};
