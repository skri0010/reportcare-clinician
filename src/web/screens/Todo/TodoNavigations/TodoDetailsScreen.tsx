import React, { FC, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { withTodoScreenProps } from "../../TodoScreenProps";
import { H2, H3, H4, H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { TodoContext } from "../TodoScreen";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import i18n from "util/language/i18n";
import { TodoScreenName } from "../..";

interface todoSectionProps {
  mainItem: string;
  content: string;
}

interface editHistorySectionProps {
  editType: string;
  timeDate: string;
}

export const TodoSection: FC<todoSectionProps> = ({ mainItem, content }) => {
  return (
    <View style={{ display: "flex", flexWrap: "wrap" }}>
      <H3
        text={mainItem}
        style={{ fontWeight: "bold", marginBottom: ms(10) }}
      />
      <H4 text={content} style={{ marginBottom: ms(25) }} />
    </View>
  );
};

export const EditHistorySection: FC<editHistorySectionProps> = ({
  editType,
  timeDate
}) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <H5 text={editType} style={{ fontWeight: "bold" }} />
      <H5 text={timeDate} style={{ marginBottom: ms(10) }} />
    </View>
  );
};

export const TodoDetailsScreen: FC<
  withTodoScreenProps[TodoScreenName.VIEWTODO]
> = ({ route, navigation }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  const { todo } = route.params;
  const context = useContext(TodoContext);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Title */}
        <TodoSection mainItem={i18n.t("Todo.Title")} content={todo.title} />
        {/* Patient */}
        <View style={styles.todoPatient}>
          <TodoSection
            mainItem={i18n.t("Todo.Patient")}
            content={todo.patientName}
          />
          {/* View patient details button */}
          <TouchableOpacity
            style={[
              styles.viewButton,
              {
                backgroundColor: colors.primaryContrastTextColor,
                borderColor: colors.primaryTextColor
              }
            ]}
            onPress={() => {
              null;
            }}
          >
            <H5
              text={i18n.t("Todo.ViewButton")}
              style={{ color: colors.primaryTextColor }}
            />
          </TouchableOpacity>
        </View>
        {/* Notes */}
        <View style={{ marginTop: ms(10) }}>
          <TodoSection mainItem={i18n.t("Todo.Notes")} content={todo.notes} />
        </View>
        {/* Edit history */}
        <EditHistorySection
          editType={i18n.t("Todo.CreatedOn")}
          timeDate={todo.createdAt}
        />
        <EditHistorySection
          editType={i18n.t("Todo.ModifiedOn")}
          timeDate={todo.updatedAt}
        />
        {/* Edit button */}
        <View style={styles.editButtonContainer}>
          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: colors.primaryTodoCompleteButtonColor }
            ]}
            onPress={() => {
              navigation.navigate(TodoScreenName.EDITTODO, { todo: todo });
            }}
          >
            <H2
              text={i18n.t("Todo.EditButton")}
              style={{ color: colors.primaryContrastTextColor }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: "55@ms",
    marginVertical: "30@ms"
  },
  todoPatient: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  viewButton: {
    width: "70@ms",
    height: "20@ms",
    borderWidth: "1@ms",
    borderRadius: "5@ms",
    justifyContent: "center",
    textAlign: "center",
    marginRight: "10@ms"
  },
  editButtonContainer: {
    marginTop: "10@ms",
    alignItems: "center"
  },
  editButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "80@ms",
    height: "30@ms"
  }
});
