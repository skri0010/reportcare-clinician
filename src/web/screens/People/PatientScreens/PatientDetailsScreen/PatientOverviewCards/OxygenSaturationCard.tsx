import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H1, H3, H5 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";

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
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <CardWrapper minHeight={minHeight} minWidthRequired={false} flex={flex}>
      <H3
        text={i18n.t("Patient_Overview.OxygenSaturation")}
        style={{
          fontWeight: "bold",
          color: colors.primaryTextColor,
          paddingLeft: ms(5),
          flexWrap: "wrap"
        }}
      />
      <View style={styles.container}>
        <View style={styles.text}>
          <H1
            text={oxySatValue}
            style={{ fontWeight: "bold", color: colors.primaryTextColor }}
          />
          <H5 text="%" style={styles.label} />
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: "6@ms"
  },
  label: {
    opacity: 0.8
  }
});
