import React, { FC } from "react";
import { View, ScrollView, StyleProp, ViewStyle } from "react-native";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";

interface ScreenWrapperProps {
  showScrollBar?: boolean;
  padding?: boolean;
  fixed?: boolean;
  style?: StyleProp<ViewStyle>;
  pointerEvents?: "auto" | "none" | "box-none" | "box-only" | undefined;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined; // Cannot directly apply to ScrollView
}

export const ScreenWrapper: FC<ScreenWrapperProps> = ({
  children,
  showScrollBar = false,
  padding = false,
  fixed = false,
  style,
  pointerEvents,
  justifyContent
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
    <View style={[backgroundStyle, style]} pointerEvents={pointerEvents}>
      {children}
    </View>
  ) : (
    <ScrollView
      style={[backgroundStyle, style]}
      showsVerticalScrollIndicator={showScrollBar}
      pointerEvents={pointerEvents}
      contentContainerStyle={{ justifyContent: justifyContent }}
    >
      {children}
    </ScrollView>
  );
};
