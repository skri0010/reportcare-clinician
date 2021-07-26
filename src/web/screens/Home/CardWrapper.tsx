import React, { FC } from "react";
import { View } from "react-native";
import { ms } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";

interface CardWrapperProps {
  maxHeight?: number;
  firstItem?: boolean;
}

export const CardWrapper: FC<CardWrapperProps> = ({
  children,
  maxHeight,
  firstItem = false
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor,
        padding: ms(10),
        marginTop: firstItem ? ms(0) : ms(20),
        marginHorizontal: ms(10, 0.2),
        borderRadius: ms(5),
        minWidth: ms(200),
        ...(maxHeight ? { maxHeight: maxHeight } : {})
      }}
    >
      {children}
    </View>
  );
};
