import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { FluidIntakeChart } from "components/VisualizationComponents/VitalsCharts/FluidIntakeChart";

interface FluidIntakeChartCardProps extends VitalsChartProps {
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
