import React, { FC } from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import { select, RootState } from "util/useRedux";
import { useTranslation } from "react-i18next";

export { MainTitle } from "./MainTitle";

export type RNTextStyle = StyleProp<TextStyle>; // Default text style props

interface TextProps {
  text: string;
  style?: RNTextStyle;
  translate?: boolean; // translates text by default (@see BaseText)
}

/**
 * Text component with
 * - custom text style
 * - custom font size (from H1, H2, H3, H4,...)
 * - translated text
 */
const BaseText: FC<TextProps> = ({ text, style, translate = true }) => {
  const { t } = useTranslation();
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const defaultStyle = {
    color: colors.primaryTextColor
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  const displayedText = translate ? t(text) : text;

  return <Text style={combinedStyle}>{displayedText}</Text>;
};

export const H1: FC<TextProps> = ({ text, style, translate }) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h1Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return <BaseText style={combinedStyle} text={text} translate={translate} />;
};

export const H2: FC<TextProps> = ({ text, style, translate }) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h2Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return <BaseText style={combinedStyle} text={text} translate={translate} />;
};

export const H3: FC<TextProps> = ({ text, style, translate }) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h3Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return <BaseText style={combinedStyle} text={text} translate={translate} />;
};

export const H4: FC<TextProps> = ({ text, style, translate }) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h4Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return <BaseText style={combinedStyle} text={text} translate={translate} />;
};

export const H5: FC<TextProps> = ({ text, style, translate }) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h5Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return <BaseText style={combinedStyle} text={text} translate={translate} />;
};

export const H6: FC<TextProps> = ({ text, style, translate }) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h6Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return <BaseText style={combinedStyle} text={text} translate={translate} />;
};

export const H7: FC<TextProps> = ({ text, style, translate }) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  const defaultStyle = {
    fontSize: fonts.h7Size
  } as RNTextStyle;

  const combinedStyle = [defaultStyle, style];

  return <BaseText style={combinedStyle} text={text} translate={translate} />;
};
