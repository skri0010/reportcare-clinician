import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";

interface WeightProps {
  weight: string;
  targetWeight: string;
  minHeight: number;
  flex?: number;
}

export const WeightCard: FC<WeightProps> = ({
  weight,
  targetWeight,
  minHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={minHeight}
      flex={flex}
      minWidth={ms(100)}
      title={i18n.t("Patient_Overview.Weight")}
      bottomText={`${i18n.t(
        "Patient_Overview.TargetWeight"
      )}: ${targetWeight}kg`}
      noChildrenPaddingHorizontal
    >
      <AbsoluteParameters centerText={weight} bottomText="kg" />
    </CardWrapper>
  );
};