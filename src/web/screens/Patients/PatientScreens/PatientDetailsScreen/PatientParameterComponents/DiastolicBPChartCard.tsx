import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { DiastolicBPChart } from "components/VisualizationComponents/DiastolicBPChart";
import { ParameterGraphsProps } from "components/VisualizationComponents/ParameterGraphs";

interface DiastolicBPChartCardProps extends ParameterGraphsProps {
  maxHeight: number;
}

export const DiastolicBPChartCard: FC<DiastolicBPChartCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <DiastolicBPChart data={data} />
    </CardWrapper>
  );
};
