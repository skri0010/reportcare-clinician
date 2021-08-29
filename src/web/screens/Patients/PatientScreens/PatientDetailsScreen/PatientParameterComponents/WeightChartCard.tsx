import React, { FC, useState } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockVitals } from "mock/mockVitals";
import { WeightChart } from "components/Visualization/WeightChart";

interface WeightChartCardProps {
  patientId: string;
  maxHeight: number;
}

export const WeightChartCard: FC<WeightChartCardProps> = ({ maxHeight }) => {
  const [vitals] = useState(mockVitals);

  return (
    <CardWrapper maxHeight={maxHeight}>
      <WeightChart data={vitals} />
    </CardWrapper>
  );
};
