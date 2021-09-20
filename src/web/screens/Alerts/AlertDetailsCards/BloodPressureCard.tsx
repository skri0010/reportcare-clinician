import { H4, H5 } from "components/Text";
import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";

interface BloodPressureCardProps {
  bloodPressure: string;
  maxHeight: number;
  minHeight: number;
}

export const BloodPressureCard: FC<BloodPressureCardProps> = ({
  bloodPressure,
  maxHeight,
  minHeight
}) => {
  const iconSize: number = 50;

  return (
    <CardWrapper flex={1} minHeight={minHeight} maxHeight={maxHeight}>
      <Icon name="plus-outline" size={iconSize} />
      <H5
        text={i18n.t("Patient_Overview.BloodPressure")}
        style={{ paddingLeft: ms(5), paddingBottom: ms(5), fontWeight: "bold" }}
      />
      <H4 text={bloodPressure} style={{ paddingLeft: ms(5) }} />
    </CardWrapper>
  );
};
