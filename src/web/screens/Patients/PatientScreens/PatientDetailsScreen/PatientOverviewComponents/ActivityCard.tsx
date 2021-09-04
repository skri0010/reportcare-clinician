import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";

interface ActivityCardProps {
  stepsTaken: string;
  stepsRequired: string;
  minHeight: number;
  flex?: number;
}

export const ActivityCard: FC<ActivityCardProps> = ({
  stepsTaken,
  stepsRequired,
  minHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={minHeight}
      flex={flex}
      title={i18n.t("Parameter_Graphs.Steps")}
    >
      <AbsoluteParameters
        centerText={`${stepsTaken} / ${stepsRequired}`}
        bottomText={i18n.t("Parameter_Graphs.StepsUnit")}
      />
    </CardWrapper>
  );
};
