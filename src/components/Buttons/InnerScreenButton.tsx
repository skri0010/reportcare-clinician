import React, { FC } from "react";
import {
  View,
  TouchableOpacity,
  ColorValue,
  StyleProp,
  ViewStyle
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { RootState, select } from "util/useRedux";

interface InnerScreenButtonProps {
  title: string;
  onPress: () => void;
  buttonColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
}

export const InnerScreenButton: FC<InnerScreenButtonProps> = ({
  title,
  onPress,
  buttonColor,
  style
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: buttonColor || colors.innerScreenButtonColor
          },
          style
        ]}
        onPress={onPress}
      >
        <H5
          text={title}
          style={{
            color: colors.primaryContrastTextColor
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: {
    height: "30@ms",
    width: "100@ms",
    display: "flex",
    paddingHorizontal: "10@ms",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms"
  }
});
