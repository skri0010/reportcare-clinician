import React, { useState, useEffect } from "react";
import { TouchableOpacity, Platform, StyleProp, ViewStyle } from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet, ms } from "react-native-size-matters";
import { H3 } from "components/Text";

interface AuthButtonProps {
  inputValid: boolean;
  buttonTitle: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  inputValid,
  buttonTitle,
  onPress,
  style
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
    >
      <H3
        text={buttonTitle}
        style={[
          {
            opacity: active ? 1 : 0.3,
            color: colors.primaryContrastTextColor
          },
          styles.buttonText
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  button: {
    height: Platform.OS === "web" ? ms(40) : ms(45),
    width: Platform.OS === "web" ? ms(200) : ms(250),
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
