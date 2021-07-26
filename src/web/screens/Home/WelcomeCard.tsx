import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, useWindowDimensions } from "react-native";
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
      <View style={{ maxHeight: useWindowDimensions().height * 0.3 }}>
        <H1 text="Dashboard" style={[styles.username, styles.dashboard]} />
        <View style={styles.card}>
          <H2
            text={`Welcome Dr. ${name}`}
            style={[styles.username, cardTextColor]}
          />
          <H4
            text={`Check on your patients health, ${"\n"}monitor their vitals and chat with ${"\n"}them.`}
            style={[styles.message, cardTextColor]}
          />
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  card: {
    backgroundColor: "white",
    padding: "10@ms",
    margin: "20@ms",
    borderRadius: "5@ms",
    marginBottom: "-5@ms"
  },
  username: {
    fontWeight: "bold"
  },
  message: {
    paddingTop: "4@ms"
  },
  dashboard: {
    margin: "10@ms",
    marginBottom: "-9@ms"
  }
});
