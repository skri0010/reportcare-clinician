import React, { FC, useContext } from "react";
import { TodoContext } from "./TodoScreen";
import { View, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { H5 } from "components/Text/index";
import { RootState, select } from "util/useRedux";

interface MarkAsDoneButtonProps {
  onPress: () => void;
}

export const MarkAsDoneButton: FC<MarkAsDoneButtonProps> = ({ onPress }) => {
  const todoContext = useContext(TodoContext);
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View
      style={{
        paddingRight: ms(30),
        justifyContent: "center"
      }}
    >
      <TouchableOpacity
        style={[
          styles.markAsSave,
          {
            backgroundColor: !todoContext.doneStatus
              ? colors.primaryButtonColor
              : "red"
          }
        ]}
        onPress={onPress}
      >
        <H5
          text={
            !todoContext.doneStatus
              ? i18n.t("Todo.MarkAsDone")
              : i18n.t("Todo.UndoFromCompleted")
          }
          style={{
            color: colors.primaryContrastTextColor,
            alignItems: "center",
            fontWeight: "bold"
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  markAsSave: {
    height: "30@ms",
    display: "flex",
    paddingHorizontal: "10@ms",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms"
  }
});
