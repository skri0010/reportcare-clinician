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
        borderWidth: ms(0.1),
        borderColor: colors.separatorColor
        // height: ms(1),
        // backgroundColor: colors.separatorColor
      }}
    />
  );
};
