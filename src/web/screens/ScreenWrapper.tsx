import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import { RootState, select } from "util/useRedux";
import { ms } from "react-native-size-matters";

export const ScreenWrapper: FC = ({ children }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <ScrollView
      style={{
        backgroundColor: colors.primaryWebBackgroundColor,
        paddingVertical: ms(20),
        paddingHorizontal: ms(10)
      }}
    >
      {children}
    </ScrollView>
    // <View
    //   style={{
    //     backgroundColor: colors.primaryWebBackgroundColor,
    //     flex: 1
    //   }}
    // >
    //   {children}
    // </View>
  );
};
