import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { MeanSpeedChart } from "components/VisualizationComponents/PhysicalsCharts/MeanSpeedChart";
import { BaseLineChartDataProps } from "components/VisualizationComponents/GeneralLineChartComponent";

interface MeanSpeedChartCardProps extends BaseLineChartDataProps {
  maxHeight: number;
}

export const MeanSpeedChartCard: FC<MeanSpeedChartCardProps> = ({
  data,
  maxHeight
}) => {
  return (
    <CardWrapper maxHeight={maxHeight}>
      <MeanSpeedChart data={data} />
    </CardWrapper>
  );
};
