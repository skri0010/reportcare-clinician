import React, { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { AddTodoScreenProps } from "../TodoScreenProps";
import { TodoSection, EditHistorySection } from "./TodoDetailsScreen";

export const AddTodoScreen: FC<AddTodoScreenProps> = ({
  route,
  navigation
}) => {
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
    <View>
      <View style={styles.todoTitle}>
        <Text style={styles.todoTitleText}>Title</Text>
        <TextInput
          value={titleInput}
          style={styles.titleInput}
          onChangeText={onChangeTitle}
          placeholder="What's this todo about?"
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  todoTitle: {
    flexDirection: "column",
    paddingLeft: "40@ms",
    paddingTop: "30@ms",
    width: "85%"
  },
  titleInput: {
    backgroundColor: "white",
    height: "30@ms",
    width: "100%",
    borderColor: "black",
    borderWidth: "1@ms",
    borderRadius: "2@ms",
    paddingLeft: "10@ms"
  },
  noteInput: {
    backgroundColor: "white",
    height: "100@ms",
    width: "100%",
    borderColor: "black",
    borderWidth: "1@ms",
    borderRadius: "2@ms",
    paddingLeft: "10@ms"
  },
  todoTitleText: {
    paddingBottom: "10@ms",
    fontWeight: "bold",
    fontSize: "14@ms"
  },
  todoContentText: {
    fontSize: "10@ms",
    flexWrap: "wrap",
    flex: 1,
    marginRight: "40@ms"
  },
  todoPatient: {
    flexDirection: "row"
  },
  viewTodoPatient: {
    alignItems: "center",
    paddingTop: "40@ms"
  },
  viewButton: {
    width: "50@ms",
    height: "20@ms",
    borderColor: "black",
    borderWidth: "1@ms",
    borderRadius: "5@ms",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "white"
  },
  editHistory: {
    paddingLeft: "40@ms",
    flexDirection: "column",
    position: "relative",
    top: "60@ms"
  },
  editHistoryText: {
    fontWeight: "bold",
    fontSize: "10@ms"
  },
  buttonContainer: {
    marginTop: "10@ms",
    marginBottom: "10@ms",
    alignItem: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  cancelButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    backgroundColor: "#A484FF",
    width: "80@ms",
    height: "30@ms",
    margin: "10@ms"
  },
  saveButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    backgroundColor: "#FFFFFF",
    width: "80@ms",
    height: "30@ms",
    borderColor: "black",
    borderWidth: "1@ms",
    margin: "10@ms"
  },
  cancelButtonText: {
    color: "white",
    fontSize: "16@ms"
  },
  saveButtonText: {
    color: "grey",
    fontSize: "16@ms"
  }
});
