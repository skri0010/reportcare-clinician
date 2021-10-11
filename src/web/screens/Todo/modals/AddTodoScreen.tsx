import React, { FC, useState, useEffect } from "react";
import { View, ViewStyle, TextStyle, StyleProp } from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";
import { RootState, select, useDispatch } from "util/useRedux";
import i18n from "util/language/i18n";
import { LocalTodo } from "rc_agents/model";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import {
  setProcedureOngoing,
  setProcedureSuccessful
} from "ic-redux/actions/agents/procedureActionCreator";
import { setUpdatingAlertIndicators } from "ic-redux/actions/agents/alertActionCreator";
import { setUpdatingTodoOfAlert } from "ic-redux/actions/agents/todoActionCreator";
import { TextField } from "components/InputComponents/TextField";
import { notEmptyString } from "util/validation";
import { SaveAndCancelButtons } from "components/Buttons/SaveAndCancelButtons";

interface AddTodoScreenProps {
  setModalVisible: (state: boolean) => void;
}

export const AddTodoScreen: FC<AddTodoScreenProps> = ({ setModalVisible }) => {
  const {
    colors,
    fonts,
    alertInfo,
    updatingAlert,
    alertUpdated,
    updatingTodo,
    procedureSuccessful,
    procedureOngoing
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts,
    alertInfo: state.alerts.alertInfo,
    updatingAlert: state.alerts.updatingAlert,
    alertUpdated: state.alerts.alertUpdated,
    updatingTodo: state.todos.updatingTodo,
    procedureOngoing: state.procedures.procedureOngoing,
    procedureSuccessful: state.procedures.procedureSuccessful
  }));

  const todoInputFieldStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryBackgroundColor,
    width: "100%",
    paddingHorizontal: ms(10)
  };

  const todoInputTextStyle: StyleProp<TextStyle> = {
    fontSize: fonts.h4Size,
    color: colors.primaryTextColor
  };

  const [titleInput, setTitleInput] = useState<string>(""); // Title input
  const [patientInput, setPatientInput] = useState<string>(
    alertInfo?.patientName || ""
  ); // Patient name input
  const [noteInput, setNoteInput] = useState<string>(""); // Notes input
  const [allInputValid, setAllInputValid] = useState<boolean>(false);

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
    const todoInput: LocalTodo = {
      title: titleInput,
      patientName: patientInput,
      notes: noteInput,
      completed: false,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      _version: 1,
      // Alert related information: patient info, alert info, alert id and risk level
      patientId: alertInfo ? alertInfo.patientID : undefined,
      alert: alertInfo || undefined,
      alertId: alertInfo ? alertInfo.id : undefined,
      riskLevel: alertInfo ? alertInfo.riskLevel : undefined
    };

    if (alertInfo) {
      // If the alert status is completed, trigger UpdateTodo procedure
      if (alertInfo.completed) {
        dispatch(setProcedureOngoing(true));
        dispatch(setUpdatingTodoOfAlert(true));
        AgentTrigger.triggerUpdateTodo(todoInput);
      } else if (alertInfo.pending) {
        // If the alert status is pending, trigger CreateTodo
        AgentTrigger.triggerCreateTodo(todoInput);
      }
    }
  };

  // Detects completion of CreateTodo procedure and shows the appropriate toast.
  useEffect(() => {
    if (!updatingAlert && alertUpdated) {
      // Dispatch to store to reset indicators
      dispatch(
        setUpdatingAlertIndicators({
          updatingAlert: false,
          alertUpdated: false
        })
      );

      // Operation should always be successful since it works offline
      toast.show(i18n.t("Todo.TodoCreateSuccessful"), { type: "success" });
      setModalVisible(false);
    }
  }, [updatingAlert, alertUpdated, dispatch, setModalVisible, toast]);

  useEffect(() => {
    if (updatingTodo && !procedureOngoing) {
      dispatch(setUpdatingTodoOfAlert(false));
      if (procedureSuccessful) {
        // Operation successful
        toast.show(i18n.t("Todo.TodoUpdateSuccessful"), { type: "success" });
        dispatch(setProcedureSuccessful(false));
      } else {
        // Operation failed
        toast.show(i18n.t("UnexpectedError"), { type: "danger" });
      }
      setModalVisible(false);
    }
  }, [
    dispatch,
    procedureOngoing,
    procedureSuccessful,
    toast,
    updatingTodo,
    setModalVisible
  ]);

  // Disable button if some inputs are empty
  useEffect(() => {
    if (notEmptyString(titleInput) && notEmptyString(noteInput)) {
      setAllInputValid(true);
    } else {
      setAllInputValid(false);
    }
  }, [titleInput, noteInput]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryBackgroundColor
        }
      ]}
    >
      {/* Title input */}
      <TextField
        label={i18n.t("Todo.Title")}
        labelStyle={[
          styles.inputTitle,
          { fontSize: fonts.h3Size, color: colors.primaryTextColor }
        ]}
        inputStyle={[
          todoInputFieldStyle,
          todoInputTextStyle,
          { height: ms(30) }
        ]}
        value={titleInput}
        onChange={onChangeTitle}
        placeholder={i18n.t("Patient_ICD/CRT.TitleInputPlaceholder")}
        error={!notEmptyString(titleInput)}
        errorMessage={i18n.t("Todo.TodoTitleError")}
      />
      {/* Patient name input */}
      <TextField
        label={i18n.t("Todo.Patient")}
        labelStyle={[
          styles.inputTitle,
          { fontSize: fonts.h3Size, color: colors.primaryTextColor }
        ]}
        inputStyle={[
          todoInputFieldStyle,
          todoInputTextStyle,
          { height: ms(30) }
        ]}
        value={patientInput}
        onChange={onChangePatient}
        placeholder={i18n.t("Todo.PatientInputPlaceholder")}
        editable={false}
        selectTextOnFocus={false}
      />
      {/* Notes input */}
      <TextField
        label={i18n.t("Todo.Notes")}
        labelStyle={[
          styles.inputTitle,
          { fontSize: fonts.h3Size, color: colors.primaryTextColor }
        ]}
        inputStyle={[
          todoInputFieldStyle,
          todoInputTextStyle,
          { height: ms(100), paddingTop: ms(5) }
        ]}
        value={noteInput}
        onChange={onChangeNotes}
        placeholder={i18n.t("Todo.NotesInputPlaceholder")}
        error={!notEmptyString(noteInput)}
        errorMessage={i18n.t("Todo.TodoNotesError")}
        multiline
      />
      {/* Save and cancel buttons */}
      <SaveAndCancelButtons
        onPressSave={createTodo}
        onPressCancel={() => {
          setModalVisible(false);
        }}
        validToSave={allInputValid}
      />

      {/* Loading Indicator while Todo is being created */}
      {updatingAlert || (updatingTodo && <LoadingIndicator />)}
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
