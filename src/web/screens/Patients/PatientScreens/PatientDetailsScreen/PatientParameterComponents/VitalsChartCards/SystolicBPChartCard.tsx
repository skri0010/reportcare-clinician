import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { SystolicBPChart } from "components/VisualizationComponents/VitalsCharts/SystolicBPChart";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";

interface SystolicBPChartCardProps extends VitalsChartProps {
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
