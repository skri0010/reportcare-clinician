import React, { FC, useState } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockVitals } from "mock/mockVitals";
import { DiastolicPressureChart } from "components/Visualization/DiastolicPressureChart";

interface DiastolicBPChartCardProps {
  patientId: string;
  maxHeight: number;
}

export const DiastolicBPChartCard: FC<DiastolicBPChartCardProps> = ({
  maxHeight
}) => {
  const [vitals] = useState(mockVitals);

  return (
    <CardWrapper maxHeight={maxHeight}>
      <DiastolicPressureChart data={vitals} />
    </CardWrapper>
  );
};
