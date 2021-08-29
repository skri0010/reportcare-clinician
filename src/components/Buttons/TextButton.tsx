import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { TouchableOpacity, View } from "react-native";
import i18n from "util/language/i18n";

interface RowButtonProps {
  title: string;
  onPress: () => void;
  fontSize?: number;
  backgroundColor?: string;
}

export const RowButton: FC<RowButtonProps> = ({
  title,
  onPress,
  fontSize,
  backgroundColor
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
            borderWidth: backgroundColor ? ms(0) : ms(1),
            backgroundColor: backgroundColor || colors.primaryBackgroundColor
          }
        ]}
        onPress={onPress}
      >
        <H5
          text={i18n.t(title)}
          style={[
            styles.buttonText,
            {
              color: backgroundColor
                ? colors.primaryContrastTextColor
                : colors.primaryTextColor,
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
    textAlignVertical: "center"
  }
});
