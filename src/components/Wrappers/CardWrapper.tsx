import React, { FC } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { H4, H6 } from "components/Text";
import { BaseWrapperProps } from "components/Wrappers/BaseWrapperProps";

export interface FixedHeightCardWrapperProps {
  fixedHeight: number;
  flex?: number;
}

export interface CardWrapperProps extends BaseWrapperProps {
  flex?: number;
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  minWidthRequired?: boolean;
  maxWidth?: number | string;
  reduceMarginTop?: boolean;
  noChildrenPaddingHorizontal?: boolean;
  title?: string;
  subtitle?: string;
  ComponentNextToTitle?: FC;
  bottomText?: string;
}

export const CardWrapper: FC<CardWrapperProps> = ({
  children,
  flex = 1,
  maxHeight,
  minHeight,
  minWidth = ms(200),
  minWidthRequired = true,
  maxWidth,
  reduceMarginTop = false,
  noChildrenPaddingHorizontal = false,
  title,
  subtitle,
  ComponentNextToTitle,
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
          marginTop: reduceMarginTop ? ms(10) : ms(20),
          marginBottom: reduceMarginTop ? ms(10) : ms(0), // Compensate for reduced top margin
          marginHorizontal: ms(10, 0.2),
          borderRadius: ms(5),
          paddingTop: ms(title ? 0 : 10), // Title will use its own padding top
          paddingBottom: ms(10),
          paddingHorizontal: ms(noChildrenPaddingHorizontal ? 0 : 5),
          ...(minHeight ? { minHeight: minHeight } : { minHeight: ms(100) }),
          ...(maxHeight ? { maxHeight: maxHeight } : {}),
          ...(minWidthRequired ? { minWidth: minWidth } : {}),
          ...(maxWidth ? { maxWidth: maxWidth } : {}),
          shadowRadius: ms(1),
          shadowOpacity: 0.1
        }
      ]}
    >
      {
        // Main title
        title ? (
          <View style={styles.titleContainer}>
            <H4
              text={title}
              style={[
                styles.title,
                {
                  color: colors.primaryTextColor
                }
              ]}
            />
            {subtitle ? (
              <H6
                text={subtitle}
                style={[
                  styles.subtitle,
                  {
                    color: colors.secondaryTextColor
                  }
                ]}
              />
            ) : null}
            {ComponentNextToTitle ? <ComponentNextToTitle /> : null}
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
          <View style={[styles.titleContainer, styles.bottomTextContainer]}>
            <H6
              text={bottomText}
              style={{
                flex: 1,
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
  titleContainer: {
    flexDirection: "row",
    padding: "10@ms",
    width: "100%"
  },
  title: {
    fontWeight: "bold",
    flexWrap: "wrap"
  },
  subtitle: {
    alignSelf: "center",
    paddingLeft: "5@ms"
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: "10@ms",
    width: "100%"
  },
  item: {
    flex: 1,
    paddingHorizontal: "10@ms"
  }
});
