import { CardWrapper, CardWrapperProps } from "components/Wrappers/CardWrapper";
import React, { FC } from "react";
import { Dimensions } from "react-native";
import { ms } from "react-native-size-matters";

export const ChartCardWrapper: FC<CardWrapperProps> = ({ children }) => {
  const maxHeight = Math.max(ms(200), Dimensions.get("window").height * 0.8);

  return (
    <CardWrapper maxWidth="50%" maxHeight={maxHeight} reduceMarginTop>
      {children}
    </CardWrapper>
  );
};
