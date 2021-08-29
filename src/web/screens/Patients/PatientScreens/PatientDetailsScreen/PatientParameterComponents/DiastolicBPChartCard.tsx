import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { DiastolicPressureChart } from "components/Visualization/DiastolicPressureChart";
import { ParameterGraphsProps } from "components/Visualization/ParameterGraphs";

interface DiastolicBPChartCardProps extends ParameterGraphsProps {
  maxHeight: number;
}

export const DiastolicBPChartCard: FC<DiastolicBPChartCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <DiastolicPressureChart data={data} />
    </CardWrapper>
  );
};
