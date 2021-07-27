import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { EditTodoScreenProps } from "../TodoScreenProps";
import { TodoSection, EditHistorySection } from "./TodoDetailsScreen";
import { ScreenWrapper } from "web/screens/ScreenWrapper";

export const EditTodoScreen: FC<EditTodoScreenProps> = ({
  route,
  navigation
}) => {
  const editTodoParam = route.params;
  const [titleInput, setTitleInput] = useState<string>(
    editTodoParam.mainTitleContent
  );
  const [noteInput, setNoteInput] = useState<string>(
    editTodoParam.notesContent
  );

  const onChangeTitle = (newTitle: string) => {
    setTitleInput(newTitle);
  };

  const onChangeNotes = (newNote: string) => {
    setNoteInput(newNote);
  };

  // eslint-disable-next-line no-console
  console.log(editTodoParam);
  return (
    <ScreenWrapper>
      <View style={styles.todoTitle}>
        <Text style={styles.todoTitleText}>Title</Text>
        <TextInput
          value={titleInput}
          style={styles.titleInput}
          onChangeText={onChangeTitle}
        />
      </View>
      <TodoSection mainItem="Patient" content={editTodoParam.patientContent} />
      <View style={styles.todoTitle}>
        <Text style={styles.todoTitleText}>Notes</Text>
        <TextInput
          multiline
          value={noteInput}
          style={styles.noteInput}
          onChangeText={onChangeNotes}
        />
      </View>

      <View style={styles.editHistory}>
        <EditHistorySection
          editType="Created on: "
          timeDate={editTodoParam.createdTimeDate}
        />
        <EditHistorySection
          editType="Modified on: "
          timeDate={editTodoParam.modifiedTimeDate}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              navigation.navigate("ViewTodo", editTodoParam);
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              const newDate = new Date().toLocaleString();
              const newTodo = {
                mainTitleContent: titleInput,
                patientContent: editTodoParam.patientContent,
                notesContent: noteInput,
                createdTimeDate: editTodoParam.createdTimeDate,
                modifiedTimeDate: newDate
              };
              navigation.navigate("ViewTodo", newTodo);
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
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
