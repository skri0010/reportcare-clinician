import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { TouchableOpacity, View } from "react-native";
import i18n from "util/language/i18n";

interface RowButtonProps {
  title: string;
  onPress: () => void;
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
}

export const RowButton: FC<RowButtonProps> = ({
  title,
  onPress,
  fontSize,
  backgroundColor,
  textColor
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
            backgroundColor: backgroundColor || colors.primaryButtonColor
          }
        ]}
        onPress={onPress}
      >
        <H5
          text={i18n.t(title)}
          style={[
            styles.buttonText,
            {
              color: textColor || colors.primaryContrastTextColor,
              ...(fontSize ? { fontSize: fontSize } : {})
            }
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    borderRadius: "5@ms",
    alignItems: "center",
    margin: "5@ms",
    paddingVertical: "2@ms",
    paddingHorizontal: "5@ms"
  },
  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    opacity: 0.9
  }
});
