import React, { FC } from "react";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";

export const ScreenWrapper: FC = ({ children }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={{ backgroundColor: colors.primaryBackgroundColor, flex: 1 }}>
      {children}
    </View>
  );
};
