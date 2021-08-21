import { H4, H5 } from "components/Text";
import React, { FC, useState } from "react";
import { ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import i18n from "util/language/i18n";
import { CardWrapper } from "web/screens/Home/CardWrapper";

interface HRVCardProps {
  HRV: number;
  maxHeight: number;
  minHeight: number;
}

export const HRVCard: FC<HRVCardProps> = ({ HRV, maxHeight, minHeight }) => {
  const hrv = HRV;

  const str = `${hrv} `;
  const iconSize: number = 50;

  return (
    <CardWrapper flex={1} maxHeight={maxHeight} minHeight={minHeight}>
      <Icon name="heart-pulse" size={iconSize} />
      <H5
        text="Heart Rate: "
        style={{ paddingLeft: ms(5), paddingBottom: ms(5), fontWeight: "bold" }}
      />
      <H4 text={str} style={{ paddingLeft: ms(5) }} />
    </CardWrapper>
  );
};
