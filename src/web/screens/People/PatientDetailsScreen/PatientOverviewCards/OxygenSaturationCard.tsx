import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H3, H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";

interface OxygenSaturationProps {
  oxySatValue: string;
}

export const OxygenSaturationCard: FC<OxygenSaturationProps> = ({
  oxySatValue
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <CardWrapper maxHeight={ms(120)}>
      <H3
        text="Oxygen Saturation"
        style={{ fontWeight: "bold", color: colors.primaryTextColor }}
      />
      <View style={styles.container}>
        <View style={styles.text}>
          <H4
            text={oxySatValue}
            style={{ fontWeight: "bold", color: colors.primaryTextColor }}
          />
          <H4 text="%" style={null} />
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15@ms",
    marginBottom: "15@ms"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
