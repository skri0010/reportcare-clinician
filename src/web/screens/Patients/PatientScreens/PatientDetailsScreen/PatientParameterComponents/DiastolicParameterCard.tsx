import React, { FC, useState } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockVitals } from "mock/mockVitals";
import { DiastolicPressureChart } from "components/Visualization/DiastolicPressureChart";

interface DiastolicCardProps {
  patientId: string;
  maxHeight: number;
}

export const DiastolicParameterCard: FC<DiastolicCardProps> = ({
  maxHeight
}) => {
  const [vitals] = useState(mockVitals);

  return (
    <CardWrapper maxHeight={maxHeight}>
      <DiastolicPressureChart data={vitals} />
    </CardWrapper>
  );
};
