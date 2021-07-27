import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { TodoScreenProps } from "../TodoScreenProps";
import { H2, H3, H4, H5 } from "components/Text";
import { RootState, select } from "util/useRedux";

interface todoSectionProps {
  mainItem: string;
  content: string;
}

interface editHistorySectionProps {
  editType: string;
  timeDate: string;
}
// interface TodoDetailsProps {
//   mainTitleContent: string;
//   patientContent: string;
//   notesContent: string;
//   createdTimeDate: string;
//   modifiedTimeDate: string;
//   onViewPress?: () => void;
//   onEditPress?: () => void;
// }

export const TodoSection: FC<todoSectionProps> = ({ mainItem, content }) => {
  return (
    <View>
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

export const TodoDetailsScreen: FC<TodoScreenProps> = ({
  //   mainTitleContent,
  //   patientContent,
  //   notesContent,
  //   createdTimeDate,
  //   modifiedTimeDate,
  //   onViewPress,
  //   onEditPress
  route,
  navigation
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  const todoParam = route.params;
  return (
    <View style={styles.container}>
      {/* Title */}
      <TodoSection mainItem="Title" content={todoParam.mainTitleContent} />
      {/* Patient */}
      <View style={styles.todoPatient}>
        <TodoSection mainItem="Patient" content={todoParam.patientContent} />
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
          <H5 text="View" style={{ color: colors.primaryTextColor }} />
        </TouchableOpacity>
      </View>
      {/* Notes */}
      <View style={{ marginTop: ms(10) }}>
        <TodoSection mainItem="Notes" content={todoParam.notesContent} />
      </View>
      {/* Edit history */}
      <EditHistorySection
        editType="Created on: "
        timeDate={todoParam.createdTimeDate}
      />
      <EditHistorySection
        editType="Modified on: "
        timeDate={todoParam.modifiedTimeDate}
      />
      <View style={styles.editButtonContainer}>
        <TouchableOpacity
          style={[
            styles.editButton,
            { backgroundColor: colors.primaryTodoCompleteButtonColor }
          ]}
          onPress={() => {
            navigation.navigate("EditTodo", todoParam);
          }}
        >
          <H2 text="Edit" style={{ color: colors.primaryContrastTextColor }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "30@ms",
    marginLeft: "40@ms"
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
