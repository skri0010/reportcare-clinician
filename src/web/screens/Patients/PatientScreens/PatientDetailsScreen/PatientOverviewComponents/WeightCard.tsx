import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import {
  CardWrapper,
  FixedHeightCardWrapperProps
} from "components/Wrappers/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";
import { Unit } from "util/const";

interface WeightProps extends FixedHeightCardWrapperProps {
  weight: number | string;
  targetWeight: number | string;
}

export const WeightCard: FC<WeightProps> = ({
  weight,
  targetWeight,
  fixedHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={fixedHeight}
      maxHeight={fixedHeight}
      flex={flex}
      minWidth={ms(100)}
      title={i18n.t("Patient_Overview.Weight")}
      bottomText={`${i18n.t("Patient_Overview.TargetWeight")}: ${targetWeight}${
        Unit.WEIGHT
      }`}
      noChildrenPaddingHorizontal
    >
      <AbsoluteParameters
        centerText={`${weight}`}
        bottomText={`(${Unit.WEIGHT})`}
      />
    </CardWrapper>
  );
};
