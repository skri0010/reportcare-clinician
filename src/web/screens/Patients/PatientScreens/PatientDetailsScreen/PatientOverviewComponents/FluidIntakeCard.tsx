import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";

interface FluidIntakeCardProps {
  fluidTaken: string;
  fluidRequired: string;
  minHeight: number;
  flex?: number;
}

export const FluidIntakeCard: FC<FluidIntakeCardProps> = ({
  fluidTaken,
  fluidRequired,
  minHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={minHeight}
      flex={flex}
      title={i18n.t("Parameter_Graphs.FluidIntake")}
    >
      <AbsoluteParameters
        centerText={`${fluidTaken} / ${fluidRequired}`}
        bottomText={i18n.t("Parameter_Graphs.FluidUnit")}
      />
    </CardWrapper>
  );
};
