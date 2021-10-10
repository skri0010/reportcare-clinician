import React, { FC, useState, useEffect } from "react";
import { View, TextInput, ViewStyle, StyleProp } from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";
import { H3 } from "components/Text";
import { RootState, select, useDispatch } from "util/useRedux";
import i18n from "util/language/i18n";
import { TodoInput } from "rc_agents/model";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import { useRoute } from "@react-navigation/native";
import { ScreenName } from "web/navigation";
import { setUpdatingAlertIndicators } from "ic-redux/actions/agents/actionCreator";
import { SaveAndCancelButtons } from "components/Buttons/SaveAndCancelButtons";

interface AddTodoScreenProps {
  setModalVisible: (state: boolean) => void;
}

export const AddTodoScreen: FC<AddTodoScreenProps> = ({ setModalVisible }) => {
  const { colors, fonts, alertInfo, updatingAlert, alertUpdated } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts,
      alertInfo: state.agents.alertInfo,
      updatingAlert: state.agents.updatingAlert,
      alertUpdated: state.agents.alertUpdated
    })
  );

  const shortTodoTextInputStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryContrastTextColor,
    borderColor: colors.primaryBorderColor,
    height: ms(45)
  };

  const [titleInput, setTitleInput] = useState<string>(""); // Title input
  const [patientInput, setPatientInput] = useState<string>(
    alertInfo?.patientName || ""
  ); // Patient name input
  const [noteInput, setNoteInput] = useState<string>(""); // Notes input

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
  const route = useRoute();

  // Triggers CreateTodo procedure
  const createTodo = () => {
    const inAlertScreen = route.name === ScreenName.ALERTS;
    const todoInput: TodoInput = {
      title: titleInput,
      patientName: patientInput,
      notes: noteInput,
      completed: false,
      createdAt: new Date().toISOString(),
      _version: 1,
      // When the todo is created in the Alert screen,
      // include the patient info, alert info, alert id and risk level
      patientId: inAlertScreen && alertInfo ? alertInfo.patientID : undefined,
      alert: inAlertScreen && alertInfo ? alertInfo : undefined,
      alertId: inAlertScreen && alertInfo ? alertInfo.id : undefined,
      riskLevel: inAlertScreen && alertInfo ? alertInfo.riskLevel : undefined
    };

    AgentTrigger.triggerCreateTodo(todoInput);
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
        editable={false}
        selectTextOnFocus={false}
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
      {/* Save and Cancel buttons */}
      <SaveAndCancelButtons
        onPressSave={createTodo}
        onPressCancel={() => {
          setModalVisible(false);
        }}
        validToSave
      />
      {/* Loading Indicator while Todo is being created */}
      {updatingAlert && <LoadingIndicator />}
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
