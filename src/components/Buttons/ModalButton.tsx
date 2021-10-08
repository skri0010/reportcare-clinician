import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text";
import { StyleProp, TouchableOpacity, View, ViewProps } from "react-native";
import i18n from "util/language/i18n";

interface ModalButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewProps>;
  disabled?: boolean;
}

export const ModalButton: FC<ModalButtonProps> = ({
  title,
  onPress,
  style = {},
  disabled
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors.primaryContrastTextColor
          },
          style
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <H4 text={i18n.t(title)} style={{ color: colors.primaryTextColor }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    textAlign: "center",
    width: "60@ms",
    borderRadius: "5@ms",
    justifyContent: "space-evenly",
    height: "25@ms",
    margin: "10@ms"
  }
});
