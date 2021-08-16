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
import { RootState, select, useDispatch } from "util/useRedux";
import { TodoContext } from "./TodoScreen";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import i18n from "util/language/i18n";
import { LocalTodo, TodoUpdateInput } from "rc_agents/model";
import { setProcedureOngoing } from "ic-redux/actions/agents/actionCreator";
import { triggerUpdateTodo } from "rc_agents/triggers";

export const EditTodoScreen: FC<EditTodoScreenProps> = ({ navigation }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const inputBarColor: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryContrastTextColor,
    borderColor: colors.primaryBorderColor
  };

  const context = useContext(TodoContext);
  const dispatch = useDispatch();

  const [titleInput, setTitleInput] = useState<string>(
    context.mainTitleContent
  );
  const [noteInput, setNoteInput] = useState<string>(context.notesContent);

  const onSave = (item: LocalTodo) => {
    dispatch(setProcedureOngoing(true));
    const todoToUpdate: TodoUpdateInput = {
      id: item.id ? item.id : undefined,
      title: item.title,
      patientName: item.patientName,
      notes: item.notes,
      _version: item._version,
      completed: item.completed,
      createdAt: item.createdAt
    };
    triggerUpdateTodo(todoToUpdate);
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
          onChangeText={setTitleInput}
        />
        <TodoSection
          mainItem={i18n.t("Todo.Patient")}
          content={context.patientContent}
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
          onChangeText={setNoteInput}
        />

        <EditHistorySection
          editType={i18n.t("Todo.CreatedOn")}
          timeDate={context.createdTimeDate}
        />
        <EditHistorySection
          editType={i18n.t("Todo.ModifiedOn")}
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
            onPress={() => null}
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
