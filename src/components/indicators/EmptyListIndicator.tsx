import { H5, RNTextStyle } from "components/text";
import React, { FC } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface EmptyListIndicatorProps {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: RNTextStyle;
}

export const EmptyListIndicator: FC<EmptyListIndicatorProps> = ({
  text,
  containerStyle,
  textStyle
}) => {
  return (
    <View style={containerStyle || styles.container}>
      <H5 text={text} style={textStyle || styles.text} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "30@ms"
  },
  text: {
    textAlign: "center"
  }
});
