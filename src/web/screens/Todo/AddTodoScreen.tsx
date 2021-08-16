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
import { agentDTA } from "rc_agents/agents";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import { agentAPI, Belief } from "rc_agents/framework";
import { TodoCreateInput } from "rc_agents/model";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import {
  setProcedureOngoing,
  setProcedureSuccessful
} from "ic-redux/actions/agents/actionCreator";
import { useToast } from "react-native-toast-notifications";

interface AddTodoScreenProps {
  setModalVisible: (state: boolean) => void;
}

export const AddTodoScreen: FC<AddTodoScreenProps> = ({ setModalVisible }) => {
  const { colors, fonts, procedureOngoing, procedureSuccessful } = select(
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

  const [titleInput, setTitleInput] = useState<string>("");
  const [patientInput, setPatientInput] = useState<string>("");
  const [noteInput, setNoteInput] = useState<string>("");
  const [submittingTodo, setSubmittingTodo] = useState(false);

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

  // Triggers the start of procedure SRD-II to insert Todo
  const createTodo = () => {
    const todoInput: TodoCreateInput = {
      title: titleInput,
      patientName: patientInput,
      notes: noteInput,
      completed: false
    };

    dispatch(setProcedureOngoing(true));
    setSubmittingTodo(true);
    agentAPI.addFact(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODO, todoInput),
      false
    );
    agentDTA.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.CREATE_TODO, true)
    );
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD_II,
        ProcedureConst.ACTIVE
      )
    );
  };

  useEffect(() => {
    if (submittingTodo && !procedureOngoing) {
      setSubmittingTodo(false);
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
    procedureOngoing,
    procedureSuccessful,
    setModalVisible,
    submittingTodo,
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
      {submittingTodo && <LoadingIndicator />}
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
