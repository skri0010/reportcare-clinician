import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { OxygenSaturationChart } from "components/VisualizationComponents/OxygenSaturationChart";
import { ParameterGraphsProps } from "components/VisualizationComponents/ParameterGraphs";

interface OxygenSaturationCardProps extends ParameterGraphsProps {
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
