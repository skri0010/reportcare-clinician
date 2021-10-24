import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text";
import { isMobile } from "react-device-detect";

interface AuthButtonProps {
  inputValid: boolean;
  buttonTitle: string;
  noTextTransform?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  inputValid,
  buttonTitle,
  onPress,
  style,
  noTextTransform
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(inputValid);
  }, [inputValid]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: active
            ? colors.acceptButtonColor
            : colors.primaryDeactivatedButtonColor
        },
        styles.button,
        style
      ]}
      disabled={!inputValid}
    >
      <H4
        text={buttonTitle}
        style={[
          styles.buttonText,
          {
            opacity: active ? 1 : 0.3,
            color: colors.primaryContrastTextColor,
            ...(noTextTransform ? { textTransform: "none" } : {})
          }
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  button: {
    height: "35@ms",
    width: isMobile ? "200@ms" : "150@ms",
    marginTop: "15@ms",
    borderRadius: "10@ms",
    justifyContent: "center",
    alignSelf: "center"
  },
  buttonText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold"
  }
});
