import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { WeightChart } from "components/VisualizationComponents/VitalsCharts/WeightChart";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";

interface WeightChartCardProps extends VitalsChartProps {
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
