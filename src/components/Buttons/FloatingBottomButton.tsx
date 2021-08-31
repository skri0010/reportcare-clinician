/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { H3, H6, TextProps } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import { select, RootState } from "util/useRedux";
import i18n from "util/language/i18n";
import { isMobile } from "util/device";

interface FloatingBottomButtonProps {
  title?: string;
  onPress?: () => void;
}

export const FloatingBottomButton: FC<FloatingBottomButtonProps> = ({
  title,
  onPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const textProps: TextProps = {
    text: title || i18n.t("Home.ShowMoreButton"),
    style: [{ color: colors.primaryContrastTextColor }, styles.buttonText]
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={[{ backgroundColor: colors.acceptButtonColor }, styles.button]}
      >
        {isMobile ? <H3 {...textProps} /> : <H6 {...textProps} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    borderRadius: "5@ms",
    width: "70%",
    padding: "6@ms"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "15@ms",
    width: "100%"
  },
  buttonText: {
    textAlign: "center"
  }
});
