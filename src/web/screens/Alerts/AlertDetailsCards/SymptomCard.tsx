import { H4, H5 } from "components/Text";
import React, { FC, useState } from "react";
import { ms, StringifiedStyles } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import i18n from "util/language/i18n";
import { CardWrapper } from "web/screens/Home/CardWrapper";

interface SymptomCardProps {
  symptom: number | string;
  minHeight: number;
  maxHeight: number;
  signs: string;
}

export const SymptomCard: FC<SymptomCardProps> = ({
  symptom,
  minHeight,
  maxHeight,
  signs
}) => {
  const iconSize: number = 50;

  return (
    <CardWrapper flex={1} minHeight={minHeight} maxHeight={maxHeight}>
      <Icon name="clipboard-alert-outline" size={iconSize} />
      <H5
        text="Symptoms: "
        style={{ paddingLeft: ms(5), paddingBottom: ms(5), fontWeight: "bold" }}
      />
      <H4
        text={`${symptom}`}
        style={{ paddingLeft: ms(5), paddingBottom: ms(10) }}
      />
      <H5
        text="Signs: "
        style={{ paddingLeft: ms(5), paddingBottom: ms(5), fontWeight: "bold" }}
      />
      <H4 text={`${signs}`} style={{ paddingLeft: ms(5) }} />
    </CardWrapper>
  );
};
