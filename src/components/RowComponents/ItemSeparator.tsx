import React, { FC } from "react";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";

export const ItemSeparator: FC = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View
      style={{
        borderWidth: ms(0.6),
        borderColor: colors.separatorColor
      }}
    />
  );
};
