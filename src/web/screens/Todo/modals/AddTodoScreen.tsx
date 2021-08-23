import React, { FC, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  StyleProp
} from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";
import { H3 } from "components/Text";
import { RootState, select, useDispatch } from "util/useRedux";
import i18n from "util/language/i18n";
import { TodoCreateInput } from "rc_agents/model";
import {
  setProcedureOngoing,
  setProcedureSuccessful
} from "ic-redux/actions/agents/actionCreator";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";

interface AddTodoScreenProps {
  setModalVisible: (state: boolean) => void;
}

export const AddTodoScreen: FC<AddTodoScreenProps> = ({ setModalVisible }) => {
  const { colors, fonts, procedureSuccessful, procedureOngoing } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts,
      procedureOngoing: state.agents.procedureOngoing,
      procedureSuccessful: state.agents.procedureSuccessful
    })
  );

  const shortTodoTextInputStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryContrastTextColor,
    borderColor: colors.primaryBorderColor,
    height: ms(45)
  };

  const [titleInput, setTitleInput] = useState<string>(""); // Title input
  const [patientInput, setPatientInput] = useState<string>(""); // Patient name input
  const [noteInput, setNoteInput] = useState<string>(""); // Notes input
  const [creating, setCreating] = useState(false); // Used locally for detecting ongoing procedure

  // Functions that allow user inputs to be shown in the text inputs
  const onChangeTitle = (newTitle: string) => {
    setTitleInput(newTitle);
  };
  const onChangePatient = (newPatient: string) => {
    setPatientInput(newPatient);
  };
  const onChangeNotes = (newNote: string) => {
    setNoteInput(newNote);
  };

  const dispatch = useDispatch();
  const toast = useToast();

  // Triggers CreateTodo procedure
  const createTodo = () => {
    const todoInput: TodoCreateInput = {
      title: titleInput,
      patientName: patientInput,
      notes: noteInput,
      completed: false
    };

    dispatch(setProcedureOngoing(true));
    setCreating(true);
    AgentTrigger.triggerCreateTodo(todoInput);
  };

  // Detects completion of CreateTodo procedure and shows the appropriate toast.
  useEffect(() => {
    if (creating && !procedureOngoing) {
      setCreating(false);
      setModalVisible(false);

      if (procedureSuccessful) {
        // Operation successful
        toast.show(i18n.t("Todo.TodoCreateSuccessful"), { type: "success" });
        dispatch(setProcedureSuccessful(false));
      } else {
        // Operation failed
        toast.show(i18n.t("UnexpectedError"), { type: "danger" });
      }
    }
  }, [
    dispatch,
    creating,
    procedureSuccessful,
    setModalVisible,
    procedureOngoing,
    toast
  ]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryContrastTextColor
        }
      ]}
    >
      {/* Title input */}
      <H3 text={i18n.t("Todo.Title")} style={styles.inputTitle} />
      <TextInput
        value={titleInput}
        placeholder={i18n.t("Todo.TitleInputPlaceholder")}
        style={[
          styles.input,
          shortTodoTextInputStyle,
          { fontSize: fonts.h4Size }
        ]}
        onChangeText={onChangeTitle}
      />
      {/* Patient name input */}
      <H3 text={i18n.t("Todo.Patient")} style={styles.inputTitle} />
      <TextInput
        value={patientInput}
        placeholder={i18n.t("Todo.PatientInputPlaceholder")}
        style={[
          styles.input,
          shortTodoTextInputStyle,
          { fontSize: fonts.h4Size }
        ]}
        onChangeText={onChangePatient}
      />
      {/* Notes input */}
      <H3 text={i18n.t("Todo.Notes")} style={styles.inputTitle} />
      <TextInput
        multiline
        value={noteInput}
        placeholder={i18n.t("Todo.NotesInputPlaceholder")}
        style={[
          styles.input,
          {
            backgroundColor: colors.primaryContrastTextColor,
            borderColor: colors.primaryBorderColor,
            fontSize: fonts.h4Size,
            height: ms(100),
            paddingTop: ms(5)
          }
        ]}
        onChangeText={onChangeNotes}
      />
      {/* Save button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.primaryTodoCompleteButtonColor }
          ]}
          onPress={createTodo}
        >
          <H3
            text={i18n.t("Todo.SaveButton")}
            style={{ color: colors.primaryContrastTextColor }}
          />
        </TouchableOpacity>
        {/* Cancel button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryTextColor,
              borderWidth: ms(1)
            }
          ]}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <H3
            text={i18n.t("Todo.CancelButton")}
            style={{ color: colors.primaryTextColor }}
          />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator while Todo is being created */}
      {creating && <LoadingIndicator />}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignSelf: "center",
    marginTop: "20@ms",
    paddingHorizontal: "30@ms",
    paddingVertical: "20@ms",
    height: "80%",
    width: "50%",
    borderRadius: "10@ms"
  },
  input: {
    width: "100%",
    borderWidth: "1@ms",
    borderRadius: "5@ms",
    marginBottom: "10@ms",
    paddingHorizontal: "10@ms"
  },
  buttonContainer: {
    alignItem: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  button: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "60@ms",
    height: "25@ms",
    margin: "10@ms"
  },
  inputTitle: {
    fontWeight: "bold",
    marginBottom: "5@ms"
  }
});
