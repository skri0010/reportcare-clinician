import React, { FC } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "..";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface NoSelectionScreenProps {
  screenName: ScreenName;
  subtitle: string;
}

const getScreenContent: FC<ScreenName> = (screenName: ScreenName) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  const iconSize: number = 150;
  switch (screenName) {
    // TODO-jy: Resolve runtime error where enum is undefined
    // https://stackoverflow.com/questions/50365598/typescript-runtime-error-cannot-read-property-of-undefined-enum
    case "Todo":
      return (
        <Icon
          name="sticky-note-2"
          size={ms(iconSize)}
          color={colors.secondaryIconColor}
        />
      );
    case "Chat":
      return (
        <Icon
          name="message"
          size={ms(iconSize)}
          color={colors.secondaryIconColor}
        />
      );
      case "Clinicians":
        return (
          <Icon
            name="stethoscope"
            size={ms(iconSize)}
            color={colors.secondaryIconColor}
            />
        );
    default:
      return (
        <Icon
          name="error"
          size={ms(iconSize)}
          color={colors.secondaryIconColor}
        />
      );
  }
};

export const NoSelectionScreen: FC<NoSelectionScreenProps> = ({
  screenName,
  subtitle
}) => {
  return (
    <View style={styles.container}>
      {getScreenContent(screenName)}
      <H4 text={subtitle} style={{ marginTop: ms(20) }} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
});
