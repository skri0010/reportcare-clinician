import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H5, H6 } from "components/Text";
import { DarkModeButton } from "./DarkModeButton";
import { LanguageButton } from "./LanguageButton";

interface SummaryCardProps {
  title: string;
  description: string;
  type: boolean;
}

export const SettingsCard: FC<SummaryCardProps> = ({
  title,
  description,
  type
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const cardTextColor = {
    color: colors.primaryTextColor
  } as TextStyle;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.primaryContrastTextColor }
      ]}
    >
      <View style={styles.textContainer}>
        <View style={styles.settingsContainer}>
          {/* Welcome title */}
          <H5 text={title} style={[styles.title, cardTextColor]} />
          {/* Welcome message */}
          <H6 style={[styles.description, cardTextColor]} text={description} />
        </View>
        <View style={styles.buttonContainer}>
          {type ? <DarkModeButton /> : <LanguageButton />}
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: "10@ms",
    borderRadius: "15@ms"
  },
  textContainer: {
    flex: 1,
    paddingLeft: "10@ms",
    maxWidth: "70%"
  },
  settingsContainer: {
    paddingLeft: "15@ms"
  },
  buttonContainer: {
    justifyContent: "center"
  },
  title: {
    fontWeight: "600"
  },
  description: {
    paddingTop: "5@ms"
  }
});
