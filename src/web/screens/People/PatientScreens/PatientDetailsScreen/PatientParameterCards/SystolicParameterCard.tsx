import React, { FC, useState } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockVitals } from "mock/mockVitals";
import { SystolicPressureChart } from "components/visualization/SystolicPressureChart";

interface SystolicCardProps {
  patientId: string;
  maxHeight: number;
}

export const SystolicParameterCard: FC<SystolicCardProps> = ({ maxHeight }) => {
  const [vitals] = useState(mockVitals);

  return (
    <CardWrapper maxHeight={maxHeight} paddingTop>
      <SystolicPressureChart data={vitals} />
    </CardWrapper>
  );
};
