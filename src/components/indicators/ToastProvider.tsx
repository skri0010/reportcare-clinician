import React from "react";
import { Platform, Dimensions } from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet, ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome";
import { ToastProvider } from "react-native-toast-notifications";

export const ToastProviderComponent: React.FC = ({ children }) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const iconSize = Platform.OS === "web" ? ms(15) : ms(20);

  return (
    <ToastProvider
      placement="top"
      offset={ms(15)}
      duration={4000}
      successColor="#229c00"
      successIcon={
        <Icon
          name="check-square"
          color="white"
          size={iconSize}
          style={styles.iconStyle}
        />
      }
      dangerColor="#b30c00"
      dangerIcon={
        <Icon
          name="times-circle"
          color="white"
          size={iconSize}
          style={styles.iconStyle}
        />
      }
      warningColor="#bd8e00"
      warningIcon={
        <Icon
          name="exclamation-triangle"
          color="white"
          size={iconSize}
          style={styles.iconStyle}
        />
      }
      textStyle={{
        fontSize: Platform.OS === "web" ? fonts.h4Size : fonts.h5Size,
        color: colors.primaryContrastTextColor
      }}
      style={styles.containerStyle}
    >
      {children}
    </ToastProvider>
  );
};

const styles = ScaledSheet.create({
  containerStyle: {
    paddingVertical: ms(10),
    paddingRight: Platform.OS === "web" ? ms(20) : ms(30),
    borderRadius: ms(5),
    maxWidth:
      Platform.OS === "web"
        ? Dimensions.get("window").width / 4
        : (Dimensions.get("window").width * 4) / 5
  },
  iconStyle: { marginLeft: ms(5), marginRight: ms(10) }
});
