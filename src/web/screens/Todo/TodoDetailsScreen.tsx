import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { TodoScreenProps } from "../TodoScreenProps";
import { ScreenWrapper } from "web/screens/ScreenWrapper";

interface todoSectionProps {
  mainItem: string;
  content: string;
}

interface editHistorySectionProps {
  editType: string;
  timeDate: string;
}
interface TodoDetailsProps {
  mainTitleContent: string;
  patientContent: string;
  notesContent: string;
  createdTimeDate: string;
  modifiedTimeDate: string;
  onViewPress?: () => void;
  onEditPress?: () => void;
}

export const TodoSection: FC<todoSectionProps> = ({ mainItem, content }) => {
  return (
    <View style={styles.todoTitle}>
      <Text style={styles.todoTitleText}>{mainItem}</Text>
      <Text style={styles.todoContentText}>{content}</Text>
    </View>
  );
};

export const EditHistorySection: FC<editHistorySectionProps> = ({
  editType,
  timeDate
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.editHistoryText}>{editType}</Text>
      <Text>{timeDate}</Text>
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
  const todoParam = route.params;
  return (
    <ScreenWrapper>
      {/* Title */}
      <TodoSection mainItem="Title" content={todoParam.mainTitleContent} />
      {/* Patient */}
      <View style={styles.todoPatient}>
        <TodoSection mainItem="Patient" content={todoParam.patientContent} />
        {/* View patient details button */}
        <View style={styles.viewTodoPatient}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => {
              null;
            }}
          >
            <Text>View</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Notes */}
      <TodoSection mainItem="Notes" content={todoParam.notesContent} />
      {/* Edit history */}
      <View style={styles.editHistory}>
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
            style={styles.editButton}
            onPress={() => {
              navigation.navigate("EditTodo", todoParam);
            }}
          >
            <Text style={styles.editButtonText}>Edit</Text>
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
  editButtonContainer: {
    marginTop: "10@ms",
    alignItems: "center"
  },
  editButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    backgroundColor: "#A484FF",
    width: "80@ms",
    height: "30@ms"
  },
  editButtonText: {
    color: "white",
    fontSize: "16@ms"
  }
});
