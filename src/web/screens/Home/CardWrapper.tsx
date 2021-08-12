import React, { FC } from "react";
import { View } from "react-native";
import { ms } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { H4 } from "components/Text/index";

interface CardWrapperProps {
  flex?: number;
  minHeight?: number;
  maxHeight?: number;
  firstItem?: boolean;
  minWidthRequired?: boolean;
  paddingTop?: boolean;
  title?: string;
}

export const CardWrapper: FC<CardWrapperProps> = ({
  children,
  flex = 1,
  maxHeight,
  minHeight,
  minWidthRequired = true,
  firstItem = false,
  paddingTop,
  title
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
          ...(minHeight ? { minHeight: minHeight } : { minHeight: ms(100) }),
          ...(paddingTop ? { paddingTop: ms(20) } : {}),
          ...(minWidthRequired ? { minWidth: ms(200) } : {}),
          ...(maxHeight ? { maxHeight: maxHeight } : {}),
          shadowRadius: ms(1),
          shadowOpacity: 0.1
        }
      ]}
    >
      {title ? (
        <H4
          text={title}
          style={{
            fontWeight: "bold",
            color: colors.primaryTextColor,
            paddingLeft: ms(5),
            flexWrap: "wrap"
          }}
        />
      ) : null}
      {children}
    </View>
  );
};
