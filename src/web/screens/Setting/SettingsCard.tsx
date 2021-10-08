import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H5, H6 } from "components/Text";
import { ToggleButton } from "components/Buttons/ToggleButton";
import { isMobile } from "util/device";

interface SummaryCardProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: () => void;
}

export const SettingsCard: FC<SummaryCardProps> = ({
  title,
  description,
  value,
  onValueChange
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
        {
          backgroundColor: colors.primaryBackgroundColor,
          width: isMobile ? "90%" : "50%"
        }
      ]}
    >
      <View style={styles.textContainer}>
        <View style={styles.settingsContainer}>
          {/* Settings title */}
          <H5 text={title} style={[styles.title, cardTextColor]} />
          {/* Settings message */}
          <H6 style={[styles.description, cardTextColor]} text={description} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ToggleButton value={value} onValueChange={onValueChange} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10@ms",
    borderRadius: "15@ms",
    marginTop: "15@ms",
    minWidth: "220@ms"
  },
  textContainer: {
    flex: 1,
    paddingLeft: "10@ms"
  },
  settingsContainer: {
    paddingLeft: "15@ms"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: "20@ms"
  },
  title: {
    fontWeight: "600"
  },
  description: {
    paddingTop: "5@ms"
  }
});
