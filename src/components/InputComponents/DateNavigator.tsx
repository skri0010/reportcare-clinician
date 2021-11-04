import { IconButton, IconType } from "components/Buttons/IconButton";
import { H4 } from "components/Text";
import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { modifyDate } from "util/utilityFunctions";

interface DateNavigatorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const DateNavigator: FC<DateNavigatorProps> = ({
  currentDate,
  setCurrentDate
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={styles.container}>
      <IconButton
        name="caret-left"
        iconStyle={{ color: colors.primaryIconColor }}
        containerStyle={styles.iconContainerStyle}
        onPress={() =>
          setCurrentDate(modifyDate({ date: currentDate, action: "PREVIOUS" }))
        }
        type={IconType.FONTAWESOME}
      />
      <H4
        text={`${
          new Date().toLocaleDateString() === currentDate.toLocaleDateString()
            ? `Today (${currentDate.toLocaleDateString()})`
            : `${currentDate.toLocaleDateString()}`
        }`}
        style={styles.textStyle}
      />
      <IconButton
        name="caret-right"
        iconStyle={{ color: colors.primaryIconColor }}
        containerStyle={styles.iconContainerStyle}
        onPress={() =>
          setCurrentDate(modifyDate({ date: currentDate, action: "NEXT" }))
        }
        type={IconType.FONTAWESOME}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    paddingVertical: "4@ms"
  },
  iconContainerStyle: {
    paddingHorizontal: "6@ms"
  },
  textStyle: {
    minWidth: "150@ms",
    textAlign: "center"
  }
});
