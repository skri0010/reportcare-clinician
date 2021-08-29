import React, { FC, useState } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { SystolicPressureChart } from "components/Visualization/SystolicPressureChart";
import { ReportVitals } from "aws/API";

interface SystolicBPChartCardProps {
  vitals: ReportVitals[];
  maxHeight: number;
}

export const SystolicBPChartCard: FC<SystolicBPChartCardProps> = ({
  vitals,
  maxHeight
}) => {

  return (
    <CardWrapper maxHeight={maxHeight}>
      <SystolicPressureChart data={vitals} />
    </CardWrapper>
  );
};
