import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { OxygenSaturationChart } from "components/VisualizationComponents/VitalsCharts/OxygenSaturationChart";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";

interface OxygenSaturationCardProps extends VitalsChartProps {
  maxHeight: number;
}

export const OxygenSaturationChartCard: FC<OxygenSaturationCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <OxygenSaturationChart data={data} />
    </CardWrapper>
  );
};
