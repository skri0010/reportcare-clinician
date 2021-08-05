import React, { FC, useState } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockVitals } from "mock/mockVitals";
import { WeightChart } from "components/Visualizations/WeightChart";

interface WeightCardProps {
  patientId: string;
  maxHeight: number;
}

export const WeightParameterCard: FC<WeightCardProps> = ({ maxHeight }) => {
  const [vitals] = useState(mockVitals);

  return (
    <CardWrapper maxHeight={maxHeight}>
      <WeightChart data={vitals} />
    </CardWrapper>
  );
};
