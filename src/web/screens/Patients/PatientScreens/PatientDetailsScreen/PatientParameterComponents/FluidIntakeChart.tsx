import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { ParameterGraphsProps } from "components/VisualizationComponents/ParameterGraphs";
import { FluidIntakeChart } from "components/VisualizationComponents/FluidIntakeChart";

interface FluidIntakeChartCardProps extends ParameterGraphsProps {
  maxHeight: number;
}

export const FluidIntakeChartCard: FC<FluidIntakeChartCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <FluidIntakeChart data={data} />
    </CardWrapper>
  );
};
