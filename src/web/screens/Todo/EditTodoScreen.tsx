import React, { FC, useState } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { EditTodoScreenProps } from "../TodoScreenProps";
import { TodoSection, EditHistorySection } from "./TodoDetailsScreen";
import { H3 } from "components/Text";
import { RootState, select } from "util/useRedux";

export const EditTodoScreen: FC<EditTodoScreenProps> = ({
  route,
  navigation
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

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
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <H3 text="Title" style={{ fontWeight: "bold", marginBottom: ms(10) }} />
        <TextInput
          value={titleInput}
          style={[
            styles.titleInput,
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryTextColor
            }
          ]}
          onChangeText={onChangeTitle}
        />
        <TodoSection
          mainItem="Patient"
          content={editTodoParam.patientContent}
        />
        <H3 text="Notes" style={{ fontWeight: "bold", marginBottom: ms(10) }} />
        <TextInput
          multiline
          value={noteInput}
          style={[
            styles.noteInput,
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryTextColor
            }
          ]}
          onChangeText={onChangeNotes}
        />

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
            style={[
              styles.cancelButton,
              { backgroundColor: colors.primaryTodoCompleteButtonColor }
            ]}
            onPress={() => {
              navigation.navigate("ViewTodo", editTodoParam);
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
            <H3 text="Save" style={{ color: colors.primaryTextColor }} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
