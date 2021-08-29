import React, { FC } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { H4, H6 } from "components/Text";

interface CardWrapperProps {
  flex?: number;
  minHeight?: number;
  maxHeight?: number;
  firstItem?: boolean;
  minWidth?: number;
  minWidthRequired?: boolean;
  noChildrenPaddingHorizontal?: boolean;
  title?: string;
  bottomText?: string;
}

export const CardWrapper: FC<CardWrapperProps> = ({
  children,
  flex = 1,
  maxHeight,
  minHeight,
  minWidth = ms(200),
  minWidthRequired = true,
  firstItem = false,
  noChildrenPaddingHorizontal = false,
  title,
  bottomText
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
          marginTop: firstItem ? ms(0) : ms(20),
          marginHorizontal: ms(10, 0.2),
          borderRadius: ms(5),
          paddingTop: ms(title ? 0 : 10), // Title will use its own padding top
          ...(minHeight ? { minHeight: minHeight } : { minHeight: ms(100) }),
          ...(minWidthRequired ? { minWidth: minWidth } : {}),
          ...(maxHeight ? { maxHeight: maxHeight } : {}),
          shadowRadius: ms(1),
          shadowOpacity: 0.1
        }
      ]}
    >
      {
        // Main title
        title ? (
          <View style={styles.textContainer}>
            <H4
              text={title}
              style={[
                styles.mainText,
                {
                  color: colors.primaryTextColor
                }
              ]}
            />
          </View>
        ) : null
      }
      {
        // Content
        noChildrenPaddingHorizontal ? (
          children
        ) : (
          <View style={styles.item}>{children}</View>
        )
      }
      {
        // Bottom text
        bottomText ? (
          <View style={[styles.textContainer, styles.bottomTextContainer]}>
            <H6
              text={bottomText}
              style={{
                color: colors.primaryTextColor,
                paddingLeft: ms(5),
                textAlign: "center",
                flexWrap: "wrap"
              }}
            />
          </View>
        ) : null
      }
    </View>
  );
};

const styles = ScaledSheet.create({
  textContainer: {
    padding: "10@ms"
  },
  mainText: {
    paddingLeft: "5@ms",
    fontWeight: "600",
    flexWrap: "wrap"
  },
  bottomTextContainer: {
    position: "absolute",
    width: "100%",
    bottom: "10@ms"
  },
  item: {
    paddingHorizontal: "10@ms"
  }
});
