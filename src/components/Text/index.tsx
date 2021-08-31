import React, { FC } from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import { select, RootState } from "util/useRedux";

export { MainTitle } from "./MainTitle";

export type RNTextStyle = StyleProp<TextStyle>; // Default text style props

export interface TextProps {
  text: string;
  style?: RNTextStyle;
  translate?: boolean; // translates text by default (@see BaseText)
  numberOfLines?: number | undefined; // max number of lines before replacing with ...
}

/**
 * Text component with
 * - custom text style
 * - custom font size (from H1, H2, H3, H4,...)
 * - translated text
 */
const BaseText: FC<TextProps> = ({
  text,
  style,
  numberOfLines = undefined
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const defaultStyle = {
    color: colors.primaryTextColor
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return (
    <Text numberOfLines={numberOfLines} style={combinedStyle}>
      {text}
    </Text>
  );
};

// H1 Text
export const H1: FC<TextProps> = ({
  text,
  style,
  translate,
  numberOfLines
}) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h1Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return (
    <BaseText
      style={combinedStyle}
      text={text}
      translate={translate}
      numberOfLines={numberOfLines}
    />
  );
};

// H2 Text
export const H2: FC<TextProps> = ({
  text,
  style,
  translate,
  numberOfLines
}) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h2Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return (
    <BaseText
      style={combinedStyle}
      text={text}
      translate={translate}
      numberOfLines={numberOfLines}
    />
  );
};

// H3 Text
export const H3: FC<TextProps> = ({
  text,
  style,
  translate,
  numberOfLines
}) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h3Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return (
    <BaseText
      style={combinedStyle}
      text={text}
      translate={translate}
      numberOfLines={numberOfLines}
    />
  );
};

// H4 Text
export const H4: FC<TextProps> = ({
  text,
  style,
  translate,
  numberOfLines
}) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h4Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return (
    <BaseText
      style={combinedStyle}
      text={text}
      translate={translate}
      numberOfLines={numberOfLines}
    />
  );
};

// H5 Text
export const H5: FC<TextProps> = ({
  text,
  style,
  translate,
  numberOfLines
}) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h5Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return (
    <BaseText
      style={combinedStyle}
      text={text}
      translate={translate}
      numberOfLines={numberOfLines}
    />
  );
};

// H6 Text
export const H6: FC<TextProps> = ({
  text,
  style,
  translate,
  numberOfLines
}) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h6Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return (
    <BaseText
      style={combinedStyle}
      text={text}
      translate={translate}
      numberOfLines={numberOfLines}
    />
  );
};

// H7 Text
export const H7: FC<TextProps> = ({
  text,
  style,
  translate,
  numberOfLines
}) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h7Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return (
    <BaseText
      style={combinedStyle}
      text={text}
      translate={translate}
      numberOfLines={numberOfLines}
    />
  );
};
