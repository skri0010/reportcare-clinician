import React, { FC, useState } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockVitals } from "mock/mockVitals";
import { OxygenSaturationChart } from "components/visualization/OxygenSaturationChart";

interface OxygenSaturationCardProps {
  patientId: string;
  maxHeight: number;
}

export const OxygenSaturationParameterCard: FC<OxygenSaturationCardProps> = ({
  maxHeight
}) => {
  const [vitals] = useState(mockVitals);

  return (
    <CardWrapper maxHeight={maxHeight} paddingTop>
      <OxygenSaturationChart data={vitals} />
    </CardWrapper>
  );
};
