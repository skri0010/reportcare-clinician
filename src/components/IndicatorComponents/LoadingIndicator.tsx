import React, { FC } from "react";
import { ActivityIndicator, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";

interface LoadingIndicatorProps {
  flex?: number;
}

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({ flex }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const flexStyle = flex ? { flex: flex } : {};

  return (
    <View
      style={[
        styles.overlay,
        { backgroundColor: colors.overlayColor },
        flexStyle
      ]}
    >
      <ActivityIndicator
        animating
        color={colors.primaryBarColor}
        size={ms(40)}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});
