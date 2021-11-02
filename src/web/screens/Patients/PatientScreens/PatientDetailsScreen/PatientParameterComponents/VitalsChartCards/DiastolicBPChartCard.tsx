import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { DiastolicBPChart } from "components/VisualizationComponents/VitalsCharts/DiastolicBPChart";
import { VitalsChartProps } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";

interface DiastolicBPChartCardProps extends VitalsChartProps {
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
