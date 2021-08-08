import React, { FC, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  StyleProp
} from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";
import { H3 } from "components/Text";
import { RootState, select } from "util/useRedux";
import i18n from "util/language/i18n";

interface AddTodoScreenProps {
  setModalVisible: (state: boolean) => void;
}

export const AddTodoScreen: FC<AddTodoScreenProps> = ({ setModalVisible }) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const shortTodoTextInputStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryContrastTextColor,
    borderColor: colors.primaryBorderColor,
    height: ms(45)
  };

  const [titleInput, setTitleInput] = useState<string>("");
  const [patientInput, setPatientInput] = useState<string>("");
  const [noteInput, setNoteInput] = useState<string>("");

  const onChangeTitle = (newTitle: string) => {
    setTitleInput(newTitle);
  };
  const onChangePatient = (newPatient: string) => {
    setPatientInput(newPatient);
  };
  const onChangeNotes = (newNote: string) => {
    setNoteInput(newNote);
  };

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
          onPress={() => {
            // Sends API call to save new Todo data
          }}
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
