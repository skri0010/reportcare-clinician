import React, { FC, useState, useContext } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { EditTodoScreenProps } from "../TodoScreenProps";
import { TodoSection, EditHistorySection } from "./TodoDetailsScreen";
import { H3 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { TodoContext } from "./TodoScreen";

export const EditTodoScreen: FC<EditTodoScreenProps> = ({
  route,
  navigation
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const editTodoParam = route.params;
  const context = useContext(TodoContext);

  const [titleInput, setTitleInput] = useState<string>(
    context.mainTitleContent
  );
  const [noteInput, setNoteInput] = useState<string>(context.notesContent);

  const onChangeTitle = (newTitle: string) => {
    setTitleInput(newTitle);
  };

  const onChangeNotes = (newNote: string) => {
    setNoteInput(newNote);
  };

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
        <TodoSection mainItem="Patient" content={context.patientContent} />
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
          timeDate={context.createdTimeDate}
        />
        <EditHistorySection
          editType="Modified on: "
          timeDate={context.modifiedTimeDate}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.cancelButton,
              { backgroundColor: colors.primaryTodoCompleteButtonColor }
            ]}
            onPress={() => {
              navigation.navigate("ViewTodo", editTodoParam);
              // editTodoParam is undefined (no params anymore??)
              // eslint-disable-next-line no-console
              console.log(editTodoParam);
              // eslint-disable-next-line no-console
              console.log(navigation);
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
              // Should pass in new item into db
              // const newDate = new Date().toLocaleString();
              // const newTodo = {
              //   mainTitleContent: titleInput,
              //   patientContent: context.patientContent,
              //   notesContent: noteInput,
              //   createdTimeDate: context.createdTimeDate,
              //   modifiedTimeDate: newDate
              // };
              // navigation.navigate("ViewTodo", newTodo);
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
