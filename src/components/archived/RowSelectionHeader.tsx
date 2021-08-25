import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet, ms } from "react-native-size-matters";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface RowSelectionHeaderProps {
  title: string;
  addButton: boolean;
  onPress?: () => void;
}

export const RowSelectionHeader: FC<RowSelectionHeaderProps> = ({
  title,
  addButton = false,
  onPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View
      style={[styles.titleBar, { backgroundColor: colors.primaryBarColor }]}
    >
      <Text
        style={[styles.textStyle, { color: colors.primaryContrastTextColor }]}
      >
        {title}
      </Text>
      {addButton ? (
        <Icon
          name="add"
          color={colors.primaryContrastTextColor}
          size={ms(16)}
          style={styles.iconStyle}
          onPress={onPress}
        />
      ) : null}
    </View>
  );
};

const styles = ScaledSheet.create({
  titleBar: {
    flexDirection: "row",
    height: "45@ms",
    paddingTop: "8@ms",
    alignContent: "center"
  },
  textStyle: {
    fontSize: "20@ms",
    paddingLeft: "10@ms"
  },
  iconStyle: {
    position: "absolute",
    right: "2@ms",
    top: "15@ms",
    bottom: "15@ms",
    paddingRight: "10@ms"
  }
});
