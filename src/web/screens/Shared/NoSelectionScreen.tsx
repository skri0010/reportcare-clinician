import React, { FC } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "web/screens";
import Icon from "react-native-vector-icons/MaterialIcons";

interface NoSelectionScreenProps {
  screenName: ScreenName;
  subtitle: string;
}

export const NoSelectionScreen: FC<NoSelectionScreenProps> = ({
  screenName,
  subtitle
}) => {
  const ScreenContent = () => {
    const { colors } = select((state: RootState) => ({
      colors: state.settings.colors
    }));
    const iconSize: number = 150;
    switch (screenName) {
      case ScreenName.PATIENTS:
        return (
          <Icon
            name="account-circle"
            size={ms(iconSize)}
            color={colors.secondaryIconColor}
          />
        );
      case ScreenName.TODO:
        return (
          <Icon
            name="sticky-note-2"
            size={ms(iconSize)}
            color={colors.secondaryIconColor}
          />
        );
      case ScreenName.CHAT:
        return (
          <Icon
            name="message"
            size={ms(iconSize)}
            color={colors.secondaryIconColor}
          />
        );
      case ScreenName.CLINICIANS:
        return (
          <Icon
            name="local-hospital"
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

  return (
    <View style={styles.container}>
      {ScreenContent()}
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
