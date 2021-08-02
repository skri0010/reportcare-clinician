import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, Image, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H1, H2, H4 } from "components/Text/index";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";

interface WelcomeCardProps {
  name: string;
}

export const WelcomeCard: FC<WelcomeCardProps> = ({ name }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const cardTextColor = {
    color: colors.primaryTextColor
  } as TextStyle;

  return (
    <CardWrapper firstItem>
      <H1
        text={i18n.t("Home.Dashboard")}
        style={[styles.username, styles.dashboard]}
      />
      <View
        style={[
          styles.card,
          { backgroundColor: colors.primaryContrastTextColor }
        ]}
      >
        <View>
          <H2
            text={`${i18n.t("Home.Welcome")}${name}`}
            style={[styles.username, cardTextColor]}
          />
          <H4
            style={[styles.message, cardTextColor]}
            text={i18n.t("Home.WelcomeMsg")}
          />
        </View>
        <View>
          <Image
            style={styles.logo}
            source={require("assets/heart-icon.png")}
          />
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  card: {
    padding: "6@ms",
    margin: "20@ms",
    borderRadius: "5@ms",
    marginBottom: "-5@ms",
    marginTop: "15@ms",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  username: {
    fontWeight: "bold"
  },
  message: {
    paddingTop: "4@ms"
  },
  dashboard: {
    margin: "10@ms",
    marginBottom: "-10@ms"
  },
  logo: {
    width: "60@ms",
    height: "60@ms"
  }
});
