import React, { FC } from "react";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";

interface ItemSeparatorProps {
  topSpacing?: number;
  bottomSpacing?: number;
  bottomWidth?: number;
  lowerSeparatorOpacity?: boolean;
}

export const ItemSeparator: FC<ItemSeparatorProps> = ({
  topSpacing,
  bottomSpacing,
  bottomWidth,
  lowerSeparatorOpacity
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View
      style={[
        {
          borderWidth: ms(0.1),
          borderColor: colors.separatorColor,
          backgroundColor: colors.separatorColor,
          marginTop: topSpacing || ms(0),
          marginBottom: bottomSpacing || ms(0),
          borderBottomWidth: bottomWidth || ms(1),
          opacity: lowerSeparatorOpacity ? 0.5 : 1
        }
      ]}
    />
  );
};
