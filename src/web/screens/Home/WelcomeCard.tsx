import React, { FC, useEffect, useState } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H3, H5 } from "components/Text";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import i18n from "util/language/i18n";
import { isMobile } from "util/device";

interface WelcomeCardProps {
  flex?: number;
  maxHeight: number;
}

export const WelcomeCard: FC<WelcomeCardProps> = ({ flex = 1, maxHeight }) => {
  const { colors, clinician } = select((state: RootState) => ({
    colors: state.settings.colors,
    clinician: state.clinicians.clinician
  }));

  const [clinicianName, setClinicianName] = useState<string>("");

  const cardTextColor = {
    color: colors.primaryTextColor
  } as TextStyle;

  useEffect(() => {
    if (clinician) {
      setClinicianName(clinician.name);
    }
  }, [clinician]);

  return (
    <CardWrapper
      flex={flex}
      maxHeight={isMobile ? undefined : maxHeight}
      title={i18n.t("Home.Dashboard")}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: colors.primaryBackgroundColor }
        ]}
      >
        <View style={styles.textContainer}>
          <View style={styles.messageContainer}>
            {/* Welcome title */}
            <H3
              text={`${i18n.t("Home.Welcome")}${clinicianName}`}
              style={[styles.username, cardTextColor]}
            />
            {/* Welcome message */}
            <H5
              style={[styles.message, cardTextColor]}
              text={i18n.t("Home.WelcomeMsg")}
            />
          </View>
        </View>
        <View
          style={[
            styles.logoContainer,
            { backgroundColor: colors.primaryBackgroundColor }
          ]}
        >
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: "10@ms"
  },
  textContainer: {
    flex: 1,
    paddingLeft: "10@ms",
    maxWidth: "70%"
  },
  messageContainer: {
    paddingLeft: "15@ms"
  },
  logoContainer: {
    justifyContent: "center"
  },
  username: {
    fontWeight: "600"
  },
  message: {
    paddingTop: "5@ms"
  },
  logo: {
    width: "60@ms",
    height: "60@ms"
  }
});
