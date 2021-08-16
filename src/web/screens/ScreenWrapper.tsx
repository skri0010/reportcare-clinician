import React, { FC } from "react";
import { View, ScrollView, StyleProp, ViewStyle } from "react-native";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";

interface ScreenWrapperProps {
  showScrollBar?: boolean;
  padding?: boolean;
  fixed?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const ScreenWrapper: FC<ScreenWrapperProps> = ({
  children,
  showScrollBar = false,
  padding = false,
  fixed = false,
  style
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const backgroundStyle = {
    flex: 1,
    backgroundColor: colors.primaryWebBackgroundColor,
    paddingVertical: ms(padding ? 10 : 0),
    paddingHorizontal: ms(padding ? 20 : 0)
  } as StyleProp<ViewStyle>;

  return fixed ? (
    <View style={[backgroundStyle, style]}>{children}</View>
  ) : (
    <ScrollView
      style={[backgroundStyle, style]}
      showsVerticalScrollIndicator={showScrollBar}
    >
      {children}
    </ScrollView>
  );
};
