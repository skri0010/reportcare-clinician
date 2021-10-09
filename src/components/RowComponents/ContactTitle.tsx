import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { H2 } from "components/Text";
import { PeopleAvatar } from "components/RowComponents/PeopleAvatar";

interface ContactTitleProps {
  name: string;
  image?: string; // JH-TODO: Replace with image implementation
  isPatient: boolean;
}

export const ContactTitle: FC<ContactTitleProps> = ({ name, isPatient }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View
      style={[
        styles.rowStyle,
        { backgroundColor: colors.primaryBackgroundColor }
      ]}
    >
      {/* Image (left container) */}
      <View style={styles.avatarContainer}>
        <PeopleAvatar iconType={isPatient ? "person" : "user-md"} />
      </View>
      <H2 text={name} style={{ fontWeight: "bold" }} />
    </View>
  );
};

const styles = ScaledSheet.create({
  rowStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "7@ms",
    paddingRight: "10@ms",
    paddingLeft: "10@ms"
  }
});
