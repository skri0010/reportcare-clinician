import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { LocalTodo } from "rc_agents/model";

interface MarkAsDoneButtonProps {
  todo: LocalTodo;
  onPress: () => void;
}

export const MarkAsDoneButton: FC<MarkAsDoneButtonProps> = ({
  todo,
  onPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View
      style={{
        paddingRight: !todo.completed ? ms(52) : ms(30),
        justifyContent: "center"
      }}
    >
      <TouchableOpacity
        style={[
          styles.markAsSave,
          {
            backgroundColor: !todo.completed ? colors.acceptButtonColor : "red"
          }
        ]}
        onPress={onPress}
      >
        <H5
          text={
            !todo.completed
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
