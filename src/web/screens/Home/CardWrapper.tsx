import React, { FC } from "react";
import { View } from "react-native";
import { ms } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";

interface CardWrapperProps {
  flex?: number;
  maxHeight?: number;
  firstItem?: boolean;
  minWidthRequired?: boolean;
}

export const CardWrapper: FC<CardWrapperProps> = ({
  children,
  flex = 1,
  maxHeight,
  minWidthRequired = true,
  firstItem = false
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View
      style={[
        {
          flex: flex,
          backgroundColor: colors.primaryBackgroundColor,
          padding: ms(10),
          marginTop: firstItem ? ms(0) : ms(20),
          marginHorizontal: ms(10, 0.2),
          borderRadius: ms(5),
          minHeight: ms(100),
          ...(minWidthRequired ? { minWidth: ms(200) } : {}),
          ...(maxHeight ? { maxHeight: maxHeight } : {}),
          shadowRadius: ms(1),
          shadowOpacity: 0.1
        }
      ]}
    >
      {children}
    </View>
  );
};
