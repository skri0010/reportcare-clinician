/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { RootState, select, useDispatch } from "util/useRedux";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName, TodoListTabName } from "web/navigation";
import { View, Modal } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { NavigationContainer } from "@react-navigation/native";
import { AddTodoScreen } from "./modals/AddTodoScreen";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import i18n from "util/language/i18n";
import { TodoDetailsStackNavigator } from "../../navigation/navigators/TodoDetailsStackNavigator";
import { LocalTodo } from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { useToast } from "react-native-toast-notifications";
import {
  setProcedureOngoing,
  setProcedureSuccessful,
  setSubmittingTodo,
  setFetchingTodoDetails,
  setUpdatedTodo
} from "ic-redux/actions/agents/actionCreator";
import { AgentTrigger } from "rc_agents/trigger";
import { TodosList } from "web/screens/Todo/TodosList";
import { AdaptiveTwoScreenWrapper } from "../AdaptiveTwoScreenWrapper";

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
    todoDetails: state.agents.todoDetails,
    fetchingTodoDetails: state.agents.fetchingTodoDetails,
    // Used to detect completion of updateTodo procedure
    procedureOngoing: state.agents.procedureOngoing,
    procedureSuccessful: state.agents.procedureSuccessful,
    updatedTodo: state.agents.updatedTodo,
    submittingTodo: state.agents.submittingTodo
  }));

  const { todoToShow, selectedListTab, selectedStackScreen } = route.params;

  // For pointer events
  const [modalVisible, setModalVisible] = useState(false);

  // For add button visibility in the header of left tab
  const [addButton, setAddButton] = useState(true);

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
  // JQ-TODO To be integrated with redux store for todo item details display on the right screen
  function onRowClick(item: LocalTodo) {
    //dispatch(setProcedureOngoing(true));
    // dispatch(setTodoDetails(item));
    dispatch(setFetchingTodoDetails(true));
    if (item.id) {
      AgentTrigger.triggerRetrieveTodoDetails(item.id);
    }
    //setTodoSelected(item);
  }

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
      console.log(todoDetails);
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
