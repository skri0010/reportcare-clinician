import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { DiastolicBPChart } from "components/Visualization/DiastolicBPChart";
import { ParameterGraphsProps } from "components/Visualization/ParameterGraphs";

interface DiastolicBPChartCardProps extends ParameterGraphsProps {
  maxHeight: number;
}

export const DiastolicBPChartCard: FC<DiastolicBPChartCardProps> = ({
  vitals,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <DiastolicBPChart vitals={vitals} />
    </CardWrapper>
  );
};
