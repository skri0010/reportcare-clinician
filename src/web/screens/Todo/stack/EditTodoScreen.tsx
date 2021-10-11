import React, { FC, useState, useEffect } from "react";
import { View, TextInput, StyleProp, ViewStyle, TextStyle } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { TodoDetailsStackProps } from "web/navigation/types";
import { TodoDetailsStackScreenName } from "web/navigation";
import { TodoSection, EditHistorySection } from "./ViewTodoScreen";
import { H3 } from "components/Text";
import { RootState, select, useDispatch } from "util/useRedux";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import i18n from "util/language/i18n";
import { LocalTodo, TodoInput } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";
import { setProcedureOngoing } from "ic-redux/actions/agents/procedureActionCreator";
import {
  setSubmittingTodo,
  setUpdatedTodo
} from "ic-redux/actions/agents/todoActionCreator";
import { SaveAndCancelButtons } from "components/Buttons/SaveAndCancelButtons";

interface EditTodoScreenProps extends TodoDetailsStackProps.EditTodoProps {
  todo: LocalTodo;
}

export const EditTodoScreen: FC<EditTodoScreenProps> = ({
  todo,
  navigation
}) => {
  const { colors, updatedTodo } = select((state: RootState) => ({
    colors: state.settings.colors,
    updatedTodo: state.todos.updatedTodo
  }));

  const inputBarColor: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryBackgroundColor,
    borderColor: colors.primaryBorderColor
  };

  const inputTextColor: StyleProp<TextStyle> = {
    color: colors.primaryTextColor
  };

  const dispatch = useDispatch();

  const [titleInput, setTitleInput] = useState<string>(todo.title); // Title input
  const [noteInput, setNoteInput] = useState<string>(todo.notes); // Notes input

  const onSave = (item: LocalTodo) => {
    dispatch(setProcedureOngoing(true));
    dispatch(setSubmittingTodo(true));

    const todoToUpdate: TodoInput = {
      ...item,
      title: titleInput,
      notes: noteInput,
      lastModified: new Date().toISOString()
    };
    AgentTrigger.triggerUpdateTodo(todoToUpdate);
  };

  useEffect(() => {
    if (updatedTodo) {
      navigation.navigate(TodoDetailsStackScreenName.VIEW_TODO);
      dispatch(setUpdatedTodo(undefined));
    }
  }, [dispatch, navigation, updatedTodo]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Title input */}
        <H3 text={i18n.t("Todo.Title")} style={styles.detailText} />
        <TextInput
          value={titleInput}
          style={[
            styles.input,
            inputBarColor,
            inputTextColor,
            {
              height: ms(30),
              paddingLeft: ms(10)
            }
          ]}
          onChangeText={setTitleInput}
        />
        {/* Patient name (not editable) */}
        <TodoSection
          mainItem={i18n.t("Todo.Patient")}
          content={todo.patientName}
        />
        {/* Notes input */}
        <H3 text={i18n.t("Todo.Notes")} style={styles.detailText} />
        <TextInput
          multiline
          value={noteInput}
          style={[
            styles.input,
            inputBarColor,
            inputTextColor,
            {
              height: ms(100),
              paddingLeft: ms(10),
              paddingTop: ms(5),
              color: colors.primaryTextColor
            }
          ]}
          onChangeText={setNoteInput}
        />

        {/* Edit history (created and modified datetime) */}
        <EditHistorySection
          editType={i18n.t("Todo.CreatedOn")}
          timeDate={todo.createdAt}
        />
        <EditHistorySection
          editType={i18n.t("Todo.ModifiedOn")}
          timeDate={todo.lastModified}
        />

        {/* Save and Cancel Buttons */}
        <SaveAndCancelButtons
          onPressSave={() => {
            onSave(todo);
          }}
          onPressCancel={() => {
            navigation.goBack();
          }}
          validToSave
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: "45@ms",
    marginTop: "30@ms"
  },
  input: {
    borderWidth: "1@ms",
    borderRadius: "2@ms",
    marginBottom: "20@ms"
  },
  detailText: {
    fontWeight: "bold",
    marginBottom: "10@ms"
  }
});
