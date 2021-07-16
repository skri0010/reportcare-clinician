import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { H3, H5, H6, H7 } from "components/Text/index";
import { PeopleAvatar } from "../PeopleAvatar";

interface SubtitleItemProps {
  value: string;
}

export interface ClinicianRowBaseProps {
  title: string;
  image?: string; // JH-TODO: Replace with image implementation
  subtitleOne?: SubtitleItemProps;
  subtitleTwo?: SubtitleItemProps;
  onRowPress?: () => void;
}

export const ClinicianRowBase: React.FC<ClinicianRowBaseProps> = ({
  title,
  subtitleOne,
  subtitleTwo,
  children,
  onRowPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const SubtitleItem: FC<SubtitleItemProps> = ({ value }) => {
    return (
      <H6
        text={value ? `${value}` : ""}
        style={[styles.subtitleTextStyle, { color: colors.secondaryTextColor }]}
      />
    );
  };
  return (
    <View>
      <View
        style={[
          styles.rowStyle,
          { backgroundColor: colors.primaryBackgroundColor }
        ]}
      >
        {/* Image (left container) */}
        <View style={styles.avatarContainer}>
          <PeopleAvatar iconType="user-md" />
        </View>
        {/* Content (middle container) */}
        <TouchableOpacity style={styles.container} onPress={onRowPress}>
          {/* Title */}
          {/* TODO-JH: Use custom text component */}
          <H5
            text={title}
            style={[styles.titleTextStyle, { color: colors.primaryTextColor }]}
          />
          <View style={styles.subtitleContainer}>
            {/* Subtitles */}
            {subtitleOne ? <SubtitleItem value={subtitleOne.value} /> : null}
            {subtitleTwo ? <SubtitleItem value={subtitleTwo.value} /> : null}
          </View>
          {/* Bottom Button */}
        </TouchableOpacity>
        {/* Side component (right component). Insert as children components*/}
        {children}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  avatar: {
    backgroundColor: "#FFFFFF",
    width: "45@ms",
    height: "45@ms",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  rowStyle: {
    flexDirection: "row"
  },
  container: {
    paddingTop: "5@ms",
    flexDirection: "column",
    paddingLeft: "5@ms",
    flex: 1
  },
  titleTextStyle: {
    fontWeight: "bold"
    // fontSize: "10@ms"
  },
  subtitleTextStyle: {
    // fontSize: "9@ms"
  },
  subtitleContainer: {
    paddingBottom: "10@ms"
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "7@ms",
    width: "80@ms0.1"
  }
});
