import React, { FC, useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleProp,
  ViewStyle
} from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { TodoScreenProps } from "../TodoScreenProps";
import { TodoScreenName } from "..";
import { TodoSection, EditHistorySection } from "./TodoDetailsScreen";
import { H3 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { TodoContext } from "./TodoScreen";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import i18n from "util/language/i18n";

export const EditTodoScreen: FC<TodoScreenProps[TodoScreenName.EDITTODO]> = ({
  route,
  navigation
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const inputBarColor: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryContrastTextColor,
    borderColor: colors.primaryBorderColor
  };

  const { todo } = route.params;
  const context = useContext(TodoContext);

  const [titleInput, setTitleInput] = useState<string>(todo.title);
  const [noteInput, setNoteInput] = useState<string>(todo.notes);

  const onChangeTitle = (newTitle: string) => {
    setTitleInput(newTitle);
  };

  const onChangeNotes = (newNote: string) => {
    setNoteInput(newNote);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <H3 text={i18n.t("Todo.Title")} style={styles.detailText} />
        <TextInput
          value={titleInput}
          style={[
            styles.input,
            inputBarColor,
            {
              height: ms(30),
              paddingLeft: ms(10)
            }
          ]}
          onChangeText={onChangeTitle}
        />
        <TodoSection
          mainItem={i18n.t("Todo.Patient")}
          content={todo.patientName}
        />
        <H3 text={i18n.t("Todo.Notes")} style={styles.detailText} />
        <TextInput
          multiline
          value={noteInput}
          style={[
            styles.input,
            inputBarColor,
            {
              height: ms(100),
              paddingLeft: ms(10),
              paddingTop: ms(5)
            }
          ]}
          onChangeText={onChangeNotes}
        />

        <EditHistorySection
          editType={i18n.t("Todo.CreatedOn")}
          timeDate={todo.createdAt}
        />
        <EditHistorySection
          editType={i18n.t("Todo.ModifiedOn")}
          timeDate={todo.updatedAt}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.primaryTodoCompleteButtonColor }
            ]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <H3
              text={i18n.t("Todo.CancelButton")}
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
              // JY/JQ-TODO Make API call to pass new Todo item into db
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
            <H3
              text={i18n.t("Todo.SaveButton")}
              style={{ color: colors.primaryTextColor }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: "45@ms",
    marginTop: "30@ms"
  },
  input: {
    borderWidth: "1@ms",
    borderRadius: "2@ms",
    marginBottom: "20@ms"
  },
  buttonContainer: {
    marginBottom: "10@ms",
    alignItem: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  button: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "80@ms",
    height: "30@ms",
    margin: "10@ms"
  },
  detailText: {
    fontWeight: "bold",
    marginBottom: "10@ms"
  }
});
