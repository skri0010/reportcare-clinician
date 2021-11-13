import React, { FC } from "react";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";

interface VerticalItemSeparatorProps {
  leftSpacing?: number;
  rightSpacing?: number;
  lowerSeparatorOpacity?: boolean;
}

export const VerticalItemSeparator: FC<VerticalItemSeparatorProps> = ({
  leftSpacing,
  rightSpacing,
  lowerSeparatorOpacity
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View
      style={[
        {
          width: ms(1),
          borderWidth: ms(0.1),
          borderColor: colors.separatorColor,
          backgroundColor: colors.separatorColor,
          marginLeft: leftSpacing || ms(0),
          marginRight: rightSpacing || ms(0),
          opacity: lowerSeparatorOpacity ? 0.5 : 1
        }
      ]}
    />
  );
};
