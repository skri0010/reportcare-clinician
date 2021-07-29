import React, { FC } from "react";
import { ScrollView } from "react-native";
import { RootState, select } from "util/useRedux";

export const ScreenWrapper: FC = ({ children }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <ScrollView
      style={{
        backgroundColor: colors.primaryWebBackgroundColor
      }}
    >
      {children}
    </ScrollView>
  );
};
