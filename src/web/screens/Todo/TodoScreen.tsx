import React, { FC, useEffect, useState } from "react";
import { RootState, select, useDispatch } from "util/useRedux";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName, TodoListTabName } from "web/navigation";
import { View, Modal } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { NavigationContainer } from "@react-navigation/native";
import { AddTodoScreen } from "./modals/AddTodoScreen";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import i18n from "util/language/i18n";
import { TodoDetailsStackNavigator } from "../../navigation/navigators/TodoDetailsStackNavigator";
import {
  FetchTodosMode,
  LocalTodo,
  RetrieveTodoDetailsMethod
} from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { useToast } from "react-native-toast-notifications";
import { AgentTrigger } from "rc_agents/trigger";
import { TodosList } from "web/screens/Todo/TodosList";
import { setProcedureSuccessful } from "ic-redux/actions/agents/procedureActionCreator";
import {
  setFetchingTodoDetails,
  setSubmittingTodo,
  setUpdatedTodo
} from "ic-redux/actions/agents/todoActionCreator";
import { AdaptiveTwoScreenWrapper } from "components/Wrappers/AdaptiveTwoScreenWrapper";

// Determines if the add button is needed in the header of left tab
function checkNeedAddButton(tabName: TodoListTabName) {
  let needAddButton = true;
  if (tabName === TodoListTabName.COMPLETED) {
    needAddButton = false;
  }
  return needAddButton;
}

export const TodoScreen: FC<MainScreenProps[ScreenName.TODO]> = ({
  route,
  navigation
}) => {
  const {
    colors,
    fetchingTodoDetails,
    procedureOngoing,
    procedureSuccessful,
    updatedTodo,
    todoDetails,
    submittingTodo
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    todoDetails: state.todos.todoDetails,
    fetchingTodoDetails: state.todos.fetchingTodoDetails,
    // Used to detect completion of updateTodo procedure
    procedureOngoing: state.procedures.procedureOngoing,
    procedureSuccessful: state.procedures.procedureSuccessful,
    updatedTodo: state.todos.updatedTodo,
    submittingTodo: state.todos.submittingTodo
  }));

  const { todoToShow, selectedListTab, selectedStackScreen } = route.params;

  // For pointer events
  const [modalVisible, setModalVisible] = useState(false);

  // For add button visibility in the header of left tab
  const [, setAddButton] = useState(true);

  // Selected todo details
  const [todoSelected, setTodoSelected] = useState<LocalTodo | undefined>(
    undefined
  );

  const toast = useToast();
  const dispatch = useDispatch();

  // Display a todo if passed in route.params
  useEffect(() => {
    if (todoToShow) {
      setTodoSelected(todoToShow);
    }
  }, [todoToShow]);

  // Display a todo if todo details is updated
  useEffect(() => {
    if (todoDetails) {
      setTodoSelected(todoDetails);
    }
  }, [todoDetails]);

  // Function to save the selected todo details to be displayed in the right screen
  const onRowClick = (item: LocalTodo): void => {
    dispatch(setFetchingTodoDetails(true));
    // If the todo has an ID
    if (item.id) {
      AgentTrigger.triggerRetrieveTodoDetails(
        item.id,
        RetrieveTodoDetailsMethod.TODO_ID
      );
    } else if (item.alertId) {
      // If todo does not have an ID (ie created offline), use alert ID instead
      AgentTrigger.triggerRetrieveTodoDetails(
        item.alertId,
        RetrieveTodoDetailsMethod.ALERT_ID
      );
    }
  };

  // Compares dispatched updatedTodo with current Todo displayed in the TodoDetailsScreen
  useEffect(() => {
    // Updates the TodoDetailsScreen with the newly updated Todo
    if (updatedTodo && todoSelected && updatedTodo.id === todoSelected.id) {
      onRowClick(updatedTodo);
      dispatch(setUpdatedTodo(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedTodo]);

  useEffect(() => {
    if (todoDetails) {
      setTodoSelected(todoDetails);
    }
  }, [todoDetails]);

  // Detects completion of UpdateTodo procedure and shows the appropriate toast.
  useEffect(() => {
    if (submittingTodo && !procedureOngoing) {
      dispatch(setSubmittingTodo(false));
      if (procedureSuccessful) {
        // Operation successful
        toast.show(i18n.t("Todo.TodoUpdateSuccessful"), { type: "success" });
        dispatch(setProcedureSuccessful(false));
      } else {
        // Operation failed
        toast.show(i18n.t("UnexpectedError"), { type: "danger" });
      }
    }
  }, [dispatch, procedureOngoing, procedureSuccessful, toast, submittingTodo]);

  // Triggers the retrieval of ALL todos
  useEffect(() => {
    AgentTrigger.triggerRetrieveTodos(FetchTodosMode.ALL);
  }, []);
  return (
    <ScreenWrapper fixed>
      <View
        style={styles.container}
        pointerEvents={modalVisible || submittingTodo ? "none" : "auto"}
      >
        <AdaptiveTwoScreenWrapper
          // Left side: List of todos
          LeftComponent={
            <TodosList
              selectedTab={selectedListTab}
              tabPressCurrent={() => {
                setAddButton(checkNeedAddButton(TodoListTabName.CURRENT));
              }}
              tabPressCompleted={() => {
                setAddButton(checkNeedAddButton(TodoListTabName.COMPLETED));
              }}
              onRowClick={onRowClick}
            />
          }
          // Right side: Todo details
          RightComponent={
            <View
              style={{
                flex: 2,
                backgroundColor: colors.primaryWebBackgroundColor
              }}
            >
              {fetchingTodoDetails ? (
                <LoadingIndicator flex={1} />
              ) : todoSelected ? (
                <NavigationContainer independent>
                  {/* Todo details */}
                  <TodoDetailsStackNavigator
                    todo={todoSelected}
                    parentNavigation={navigation}
                    selectedScreen={selectedStackScreen}
                  />
                </NavigationContainer>
              ) : (
                <NoSelectionScreen
                  screenName={ScreenName.TODO}
                  subtitle={i18n.t("Todo.NoSelection")}
                />
              )}
            </View>
          }
        />
      </View>

      {/* ADD todo modal */}
      <View style={styles.modalView}>
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.overlayColor }
            ]}
          >
            {/* Add todo modal */}
            <AddTodoScreen setModalVisible={setModalVisible} />
          </View>
        </Modal>
      </View>

      {/* Loading Indicator overlays the entire screen when Todo is being updated */}
      {submittingTodo && <LoadingIndicator />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "row", height: "100%" },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  rowSelection: { flex: 1 },
  modalContainer: {
    justifyContent: "center",
    height: "100%",
    width: "100%"
  }
});
