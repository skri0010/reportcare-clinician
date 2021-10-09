import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import i18n from "util/language/i18n";
import { H3 } from "components/Text";

interface InfoTitleBarProps {
  title: string;
}

export const InfoTitleBar: FC<InfoTitleBarProps> = ({ title }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View
      style={[
        styles.titleBarContainer,
        {
          backgroundColor: colors.primaryBackgroundColor,
          borderBottomColor: colors.primaryBorderColor,
          borderLeftColor: colors.primaryBarColor
        }
      ]}
    >
      <H3 text={i18n.t(title)} style={{ fontWeight: "bold" }} />
    </View>
  );
};

const styles = ScaledSheet.create({
  titleBarContainer: {
    width: "100%",
    marginTop: "20@ms",
    justifyContent: "space-evenly",
    paddingVertical: "5@ms",
    paddingLeft: "10@ms",
    borderLeftWidth: "3@ms",
    borderBottomRightRadius: "5@ms",
    borderTopRightRadius: "5@ms",
    borderBottomWidth: "1@ms"
  }
});
