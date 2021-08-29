import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { OxygenSaturationChart } from "components/Visualization/OxygenSaturationChart";
import { ParameterGraphsProps } from "components/Visualization/ParameterGraphs";

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
