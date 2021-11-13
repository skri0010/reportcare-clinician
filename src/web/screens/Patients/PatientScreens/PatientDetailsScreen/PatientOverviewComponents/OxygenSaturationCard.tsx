import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import {
  CardWrapper,
  FixedHeightCardWrapperProps
} from "components/Wrappers/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";
import { Unit } from "util/const";

interface OxygenSaturationProps extends FixedHeightCardWrapperProps {
  oxygenSaturation: number | string;
}

export const OxygenSaturationCard: FC<OxygenSaturationProps> = ({
  oxygenSaturation,
  fixedHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={fixedHeight}
      maxHeight={fixedHeight}
      flex={flex}
      minWidth={ms(100)}
      title={i18n.t("Patient_Overview.OxygenSaturation")}
      noChildrenPaddingHorizontal
    >
      <AbsoluteParameters
        centerText={oxygenSaturation}
        bottomText={`(${Unit.OXYGEN_SATURATION})`}
      />
    </CardWrapper>
  );
};
