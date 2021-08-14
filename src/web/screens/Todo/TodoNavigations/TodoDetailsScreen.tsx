/* eslint-disable no-console */
import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { withTodoScreenProps } from "../../TodoScreenProps";
import { H2, H3, H4, H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import i18n from "util/language/i18n";
import { ScreenName, TodoScreenName } from "../..";
import { useNavigation } from "@react-navigation/native";
import { mockPatients } from "mock/mockPatients";

interface todoSectionProps {
  mainItem: string;
  content: string;
}

interface editHistorySectionProps {
  editType: string;
  timeDate?: string;
}

// Todo section component (title, patient and notes)
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

// Edit history section component (created and modified datetime)
export const EditHistorySection: FC<editHistorySectionProps> = ({
  editType,
  timeDate
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
        flexWrap: "wrap"
      }}
    >
      <H5 text={editType} style={{ fontWeight: "bold" }} />
      <H5 text={timeDate || "Never"} style={{ marginBottom: ms(10) }} />
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
  const { mainNavigation } = route.params;

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
          <View
            style={{
              paddingLeft: ms(20),
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              style={[
                styles.viewButton,
                {
                  backgroundColor: colors.primaryContrastTextColor,
                  borderColor: colors.primaryTextColor
                }
              ]}
              onPress={() => {
                if (todo.patientId !== undefined) {
                  mainNavigation?.navigate(ScreenName.PATIENT, {
                    patientId: todo.patientId
                  });
                }
              }}
            >
              <H5
                text={i18n.t("Todo.ViewButton")}
                style={{ color: colors.primaryTextColor }}
              />
            </TouchableOpacity>
          </View>
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
          timeDate={todo.lastModified}
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
    alignItems: "center",
    flexWrap: "wrap"
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
