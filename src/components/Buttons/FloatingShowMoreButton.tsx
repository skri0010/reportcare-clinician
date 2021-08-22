import { H6 } from "components/text";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { select, RootState } from "util/useRedux";
import i18n from "util/language/i18n";

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

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={[{ backgroundColor: colors.primaryButtonColor }, styles.button]}
      >
        <H6
          text={title || i18n.t("Home.ShowMoreButton")}
          style={[
            { color: colors.primaryContrastTextColor },
            styles.buttonText
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    borderRadius: "5@ms",
    width: "50%",
    padding: "5@ms"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "10@ms",
    width: "100%"
  },
  buttonText: {
    textAlign: "center"
  }
});
