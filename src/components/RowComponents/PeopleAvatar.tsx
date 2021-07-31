import React, { FC } from "react";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { ms, ScaledSheet } from "react-native-size-matters";

interface PeopleAvatarProps {
  iconType: string;
}

export const PeopleAvatar: FC<PeopleAvatarProps> = ({ iconType }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  const isPatient = iconType === "person";
  const getAvatarBackgroundColor = (checkPatient: boolean) => {
    let color = colors.primaryAvatarBackgroundColor;
    if (!checkPatient) {
      color = colors.primaryBackgroundColor;
    }
    return color;
  };
  return (
    <View
      style={[
        styles.avatarPatient,
        { backgroundColor: getAvatarBackgroundColor(isPatient) }
      ]}
    >
      {isPatient ? (
        <MaterialIcon
          name={iconType}
          color={colors.primaryTextColor}
          size={ms(20)}
        />
      ) : (
        <FontAwesomeIcon
          name={iconType}
          color={colors.primaryTextColor}
          size={ms(20)}
        />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  avatarPatient: {
    width: "45@ms",
    height: "45@ms",
    borderRadius: "50@ms",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
