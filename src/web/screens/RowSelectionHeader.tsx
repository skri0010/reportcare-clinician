import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
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
      <Text style={styles.textStyle}>{title}</Text>
      {addButton ? (
        <Icon
          name="add"
          color="white"
          size={moderateScale(16)}
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
    paddingTop: "5@ms",
    paddingBottom: "5@ms",
    alignContent: "center"
  },
  textStyle: {
    color: "white",
    fontSize: "20@ms",
    paddingLeft: "10@ms"
  },
  iconStyle: {
    position: "absolute",
    right: 2,
    top: 15,
    bottom: 15,
    paddingRight: 10
  }
});
