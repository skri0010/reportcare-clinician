import React, { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";
import { AddTodoScreenProps } from "../TodoScreenProps";
import { TodoSection, EditHistorySection } from "./TodoDetailsScreen";
import { H3 } from "components/Text";
import { RootState, select } from "util/useRedux";

export const AddTodoScreen: FC<AddTodoScreenProps> = ({ navigation }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

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
    <View style={styles.container}>
      <H3 text="Title" style={{ fontWeight: "bold", marginBottom: ms(10) }} />
      <TextInput
        value={titleInput}
        placeholder="What's this todo about?"
        style={[
          styles.titleInput,
          {
            backgroundColor: colors.primaryContrastTextColor,
            borderColor: colors.primaryTextColor
          }
        ]}
        onChangeText={onChangeTitle}
      />
      <H3 text="Patient" style={{ fontWeight: "bold", marginBottom: ms(10) }} />
      <TextInput
        value={patientInput}
        placeholder="What's the patient's name?"
        style={[
          styles.titleInput,
          {
            backgroundColor: colors.primaryContrastTextColor,
            borderColor: colors.primaryTextColor
          }
        ]}
        onChangeText={onChangePatient}
      />
      <H3 text="Notes" style={{ fontWeight: "bold", marginBottom: ms(10) }} />
      <TextInput
        multiline
        value={noteInput}
        placeholder="Anything notable?"
        style={[
          styles.noteInput,
          {
            backgroundColor: colors.primaryContrastTextColor,
            borderColor: colors.primaryTextColor
          }
        ]}
        onChangeText={onChangeNotes}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.cancelButton,
            { backgroundColor: colors.primaryTodoCompleteButtonColor }
          ]}
          onPress={() => {
            null;
          }}
        >
          <H3
            text="Cancel"
            style={{ color: colors.primaryContrastTextColor }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryTextColor
            }
          ]}
          onPress={() => {
            // Sends API call to save new Todo data
          }}
        >
          <H3 text="Save" style={{ color: colors.primaryTextColor }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    margin: "30@ms",
    marginTop: "20@ms"
  },
  titleInput: {
    height: "30@ms",
    borderWidth: "1@ms",
    borderRadius: "2@ms",
    marginBottom: "20@ms",
    paddingLeft: "10@ms"
  },
  noteInput: {
    height: "100@ms",
    borderWidth: "1@ms",
    borderRadius: "2@ms",
    paddingLeft: "10@ms",
    marginBottom: "20@ms",
    paddingTop: "5@ms"
  },
  buttonContainer: {
    marginBottom: "10@ms",
    alignItem: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  cancelButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "80@ms",
    height: "30@ms",
    margin: "10@ms"
  },
  saveButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "80@ms",
    height: "30@ms",
    borderWidth: "1@ms",
    margin: "10@ms"
  }
});
