import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H4, H6 } from "components/text/index";
import { TouchableOpacity, View } from "react-native";
import i18n from "util/language/i18n";

interface RowButtonProps {
  onRowPress: () => void;
  title: string;
  backgroundColor?: string;
}

export const RowButton: FC<RowButtonProps> = ({
  onRowPress,
  title,
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
        onPress={onRowPress}
      >
        {backgroundColor ? (
          // Smaller text header for Todo row buttons
          <H6
            text={i18n.t(title)}
            style={[
              styles.buttonText,
              {
                color: colors.primaryContrastTextColor,
                margin: ms(5),
                paddingBottom: ms(0.8),
                paddingRight: ms(0.2)
              }
            ]}
          />
        ) : (
          // Larger text header for patient alert history and medical record row
          <H4
            text={i18n.t(title)}
            style={[
              styles.buttonText,
              {
                color: colors.primaryTextColor,
                marginBottom: ms(1.5)
              }
            ]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    borderRadius: "5@ms",
    alignItems: "center"
  },
  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center"
  }
});
