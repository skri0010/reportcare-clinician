import React, { FC, useState } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockVitals } from "mock/mockVitals";
import { OxygenSaturationChart } from "components/Visualizations/OxygenSaturationChart";

interface OxygenSaturationCardProps {
  patientId: string;
  maxHeight: number;
}

export const OxygenSaturationParameterCard: FC<OxygenSaturationCardProps> = ({
  maxHeight
}) => {
  const [vitals] = useState(mockVitals);

  return (
    <CardWrapper maxHeight={maxHeight}>
      <OxygenSaturationChart data={vitals} />
    </CardWrapper>
  );
};
