import React, { FC, useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleProp,
  ViewStyle
} from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { EditTodoScreenProps } from "../TodoScreenProps";
import { TodoSection, EditHistorySection } from "./TodoDetailsScreen";
import { H3 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { TodoContext } from "./TodoScreen";
import { ScreenWrapper } from "web/screens/ScreenWrapper";

export const EditTodoScreen: FC<EditTodoScreenProps> = ({
  // route,
  navigation
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const inputBarColor: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryContrastTextColor,
    borderColor: colors.primaryBorderColor
  };

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
    <ScreenWrapper>
      <View style={styles.container}>
        <H3 text="Title" style={styles.detailText} />
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
        <TodoSection mainItem="Patient" content={context.patientContent} />
        <H3 text="Notes" style={styles.detailText} />
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
              styles.button,
              { backgroundColor: colors.primaryTodoCompleteButtonColor }
            ]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <H3
              text="Cancel"
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
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    margin: "30@ms",
    marginTop: "20@ms"
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
