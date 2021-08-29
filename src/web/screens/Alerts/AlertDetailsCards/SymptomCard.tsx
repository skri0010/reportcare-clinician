import { H4, H5 } from "components/Text";
import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
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
      <H5 text={`${i18n.t("Alerts.Symptoms")}: `} style={styles.title} />
      <H4
        text={`${symptom}`}
        style={{ paddingLeft: ms(5), paddingBottom: ms(10) }}
      />
      <H5 text={`${i18n.t("Alerts.Signs")}: `} style={styles.title} />
      <H4 text={`${signs}`} style={{ paddingLeft: ms(5) }} />
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  title: {
    fontWeight: "bold",
    paddingLeft: "5@ms",
    paddingBottom: "5@ms"
  }
});
