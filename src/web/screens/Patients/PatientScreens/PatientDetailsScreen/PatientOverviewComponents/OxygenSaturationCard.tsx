import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";

interface OxygenSaturationProps {
  oxySatValue: string;
  minHeight: number;
  flex?: number;
}

export const OxygenSaturationCard: FC<OxygenSaturationProps> = ({
  oxySatValue,
  minHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={minHeight}
      flex={flex}
      minWidth={ms(100)}
      title={i18n.t("Patient_Overview.OxygenSaturation")}
      noChildrenPaddingHorizontal
    >
      <AbsoluteParameters centerText={oxySatValue} bottomText="%" />
    </CardWrapper>
  );
};
