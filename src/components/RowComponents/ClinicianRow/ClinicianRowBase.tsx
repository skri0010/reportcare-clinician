import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { Avatar } from "react-native-elements";

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
      <Text
        numberOfLines={1}
        style={[styles.subtitleTextStyle, { color: colors.secondaryTextColor }]}
      >
        {value ? `${value}` : ""}
      </Text>
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
        <Avatar
          rounded
          icon={{
            name: "user-md",
            type: "font-awesome",
            color: "black"
          }}
          containerStyle={styles.avatar}
        />
        {/* Content (middle container) */}
        <TouchableOpacity style={styles.container} onPress={onRowPress}>
          {/* Title */}
          {/* TODO-JH: Use custom text component */}
          <Text
            style={[styles.titleTextStyle, { color: colors.primaryTextColor }]}
          >
            {title}
          </Text>
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
    height: "45@ms"
  },
  rowStyle: {
    flexDirection: "row"
  },
  container: {
    paddingTop: "5@ms",
    flexDirection: "column",
    flex: 1
  },
  titleTextStyle: {
    fontWeight: "bold",
    fontSize: "10@ms"
  },
  subtitleTextStyle: {
    fontSize: "9@ms"
  },
  subtitleContainer: {
    paddingBottom: "10@ms"
  }
});
