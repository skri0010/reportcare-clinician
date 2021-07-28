import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H1, H2, H4 } from "components/Text/index";
import { CardWrapper } from "./CardWrapper";

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
      <H1 text="Dashboard" style={[styles.username, styles.dashboard]} />
      <View
        style={[
          styles.card,
          { backgroundColor: colors.primaryContrastTextColor }
        ]}
      >
        <View>
          <H2
            text={`Welcome Dr. ${name}`}
            style={[styles.username, cardTextColor]}
          />
          <H4
            text={`Check on your patients health, ${"\n"}monitor their vitals and chat with ${"\n"}them.`}
            style={[styles.message, cardTextColor]}
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
