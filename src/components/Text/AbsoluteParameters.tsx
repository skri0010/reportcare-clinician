import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { H4, H5, H6 } from ".";

interface AbsoluteParametersProps {
  topText?: string;
  centerText?: number | string;
  bottomText?: string;
}

export const AbsoluteParameters: FC<AbsoluteParametersProps> = ({
  topText = "",
  centerText = "",
  bottomText = ""
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View style={styles.container}>
      <H5 text={topText} style={[styles.label, styles.topText]} />
      <H4 text={`${centerText}`} style={{ color: colors.primaryTextColor }} />
      <H6 text={bottomText} style={styles.label} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  topText: {
    paddingBottom: "10@ms"
  },
  label: {
    opacity: 0.8,
    textAlign: "center"
  }
});
