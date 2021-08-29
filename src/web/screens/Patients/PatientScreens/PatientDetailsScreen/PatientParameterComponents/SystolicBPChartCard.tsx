import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { SystolicBPChart } from "components/VisualizationComponents/SystolicBPChart";
import { ParameterGraphsProps } from "components/VisualizationComponents/ParameterGraphs";

interface SystolicBPChartCardProps extends ParameterGraphsProps {
  maxHeight: number;
}

export const SystolicBPChartCard: FC<SystolicBPChartCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <SystolicBPChart data={data} />
    </CardWrapper>
  );
};
