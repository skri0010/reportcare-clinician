import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { H1, H5 } from ".";

interface AbsoluteParametersProps {
  topText?: string;
  centerText?: string;
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
      <H5 text={topText} style={styles.label} />
      <H1
        text={centerText}
        style={{ fontWeight: "bold", color: colors.primaryTextColor }}
      />
      <H5 text={bottomText} style={styles.label} />
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
  label: {
    opacity: 0.8
  }
});
