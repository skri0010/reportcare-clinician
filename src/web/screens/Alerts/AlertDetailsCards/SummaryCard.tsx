import { H4, H5 } from "components/Text";
import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { CardWrapper } from "web/screens/Home/CardWrapper";

interface SummaryCardProps {
  summary: number | string;
  minHeight: number;
  maxHeight: number;
  risk: string;
}

export const SummaryCard: FC<SummaryCardProps> = ({
  summary,
  minHeight,
  maxHeight,
  risk
}) => {
  const iconSize: number = 50;

  return (
    <CardWrapper
      flex={1}
      minHeight={minHeight}
      maxHeight={maxHeight}
      title={i18n.t("Alert Summary")}
    >
      <H4
        text={`${summary}`}
        style={{
          paddingLeft: ms(5),
          paddingBottom: ms(10),
          paddingTop: ms(10)
        }}
      />
      <H5
        text="Severity: "
        style={{ paddingLeft: ms(5), paddingBottom: ms(5), fontWeight: "bold" }}
      />
      <H4 text={`${risk}`} style={{ paddingLeft: ms(5) }} />
    </CardWrapper>
  );
};
