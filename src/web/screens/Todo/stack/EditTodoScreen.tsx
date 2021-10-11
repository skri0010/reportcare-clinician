import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { TodoDetailsStackProps } from "web/navigation/types";
import { TodoDetailsStackScreenName } from "web/navigation";
import { TodoSection, EditHistorySection } from "./ViewTodoScreen";
import { RootState, select, useDispatch } from "util/useRedux";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import i18n from "util/language/i18n";
import { LocalTodo } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";
import { setProcedureOngoing } from "ic-redux/actions/agents/procedureActionCreator";
import {
  setSubmittingTodo,
  setUpdatedTodo
} from "ic-redux/actions/agents/todoActionCreator";
import { TextField } from "components/InputComponents/TextField";
import { notEmptyString } from "util/validation";
import { SaveAndCancelButtons } from "components/Buttons/SaveAndCancelButtons";

interface EditTodoScreenProps extends TodoDetailsStackProps.EditTodoProps {
  todo: LocalTodo;
}

export const EditTodoScreen: FC<EditTodoScreenProps> = ({
  todo,
  navigation
}) => {
  const { updatedTodo, fonts } = select((state: RootState) => ({
    updatedTodo: state.todos.updatedTodo,
    fonts: state.settings.fonts
  }));

  const dispatch = useDispatch();

  const [titleInput, setTitleInput] = useState<string>(todo.title); // Title input
  const [noteInput, setNoteInput] = useState<string>(todo.notes); // Notes input
  const [allInputValid, setAllInputValid] = useState<boolean>(false);

  const onSave = (item: LocalTodo) => {
    dispatch(setProcedureOngoing(true));
    dispatch(setSubmittingTodo(true));

    const todoToUpdate: LocalTodo = {
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

  // Disable button if some inputs are empty
  useEffect(() => {
    if (notEmptyString(titleInput) && notEmptyString(noteInput)) {
      setAllInputValid(true);
    } else {
      setAllInputValid(false);
    }
  }, [titleInput, noteInput]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Title input */}
        <TextField
          label={i18n.t("Todo.Title")}
          labelStyle={[styles.detailText, { fontSize: fonts.h3Size }]}
          inputStyle={{ height: ms(30) }}
          value={titleInput}
          onChange={setTitleInput}
          placeholder={i18n.t("Patient_ICD/CRT.TitleInputPlaceholder")}
          error={!notEmptyString(titleInput)}
          errorMessage={i18n.t("Todo.TodoTitleError")}
          errorBottomMargin={25}
        />
        {/* Patient name (not editable) */}
        <TodoSection
          mainItem={i18n.t("Todo.Patient")}
          content={todo.patientName}
        />
        {/* Notes input */}
        <TextField
          label={i18n.t("Todo.Notes")}
          labelStyle={[styles.detailText, { fontSize: fonts.h3Size }]}
          inputStyle={[{ height: ms(100), paddingTop: ms(5) }]}
          value={noteInput}
          onChange={setNoteInput}
          placeholder={i18n.t("Todo.NotesInputPlaceholder")}
          error={!notEmptyString(noteInput)}
          errorMessage={i18n.t("Todo.TodoNotesError")}
          multiline
          errorBottomMargin={25}
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
        {/* Save and cancel buttons */}
        <SaveAndCancelButtons
          onPressSave={() => {
            onSave(todo);
          }}
          onPressCancel={() => {
            navigation.goBack();
          }}
          validToSave={allInputValid}
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
  buttonContainer: {
    marginBottom: "10@ms",
    alignItem: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  button: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "80@ms",
    height: "30@ms",
    margin: "10@ms"
  },
  detailText: {
    fontWeight: "bold",
    marginBottom: "10@ms"
  }
});
