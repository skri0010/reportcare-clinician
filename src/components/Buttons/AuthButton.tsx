import React, { useState, useEffect } from "react";
import { TouchableOpacity, Platform, StyleProp, ViewStyle } from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet, ms } from "react-native-size-matters";
import { H3 } from "components/Text";

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
            ? colors.primaryButtonColor
            : colors.primaryDeactivatedButtonColor
        },
        styles.button,
        style
      ]}
      disabled={!inputValid}
    >
      <H3
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
    height: ms(35),
    width: Platform.OS === "web" ? ms(150) : ms(200),
    marginTop: ms(15),
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
