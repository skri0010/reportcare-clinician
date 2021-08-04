import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H3, H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";

interface WeightProps {
  weight: string;
  targetWeight: string;
}

export const WeightCard: FC<WeightProps> = ({ weight, targetWeight }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <CardWrapper maxHeight={ms(120)}>
      <H3
        text="Weight"
        style={{ fontWeight: "bold", color: colors.primaryTextColor }}
      />
      <View style={styles.container}>
        <View style={styles.text}>
          <H4
            text={weight}
            style={{ fontWeight: "bold", color: colors.primaryTextColor }}
          />
          <H4 text="kg" style={null} />
        </View>
      </View>
      <H4 text={`Target Weight: ${targetWeight}`} style={null} />
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15@ms"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10@ms"
  }
});
