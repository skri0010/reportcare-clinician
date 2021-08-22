/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { RootState, select, useDispatch } from "util/useRedux";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName, TodoListName } from "web/navigation";
import { View, Modal } from "react-native";
import { RowSelectionTab } from "../RowSelectionTab";
import { ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { NavigationContainer } from "@react-navigation/native";
import { AddTodoScreen } from "./AddTodoScreen";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import i18n from "util/language/i18n";
import { TodoListTabNavigation } from "./TodoNavigations/TodoListTabNavigation";
import { TodoDetailsStackNavigation } from "./TodoNavigations/TodoDetailsStackNavigation";
import { LocalTodo } from "rc_agents/model";
import { LoadingIndicator } from "components/indicators/LoadingIndicator";
import { useToast } from "react-native-toast-notifications";
import {
  setProcedureSuccessful,
  setSubmittingTodo,
  setUpdatedTodo
} from "ic-redux/actions/agents/actionCreator";

// Determines if the add button is needed in the header of left tab
function checkNeedAddButton(tabName: TodoListName) {
  let needAddButton = true;
  if (tabName === TodoListName.COMPLETED) {
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
    procedureOngoing,
    procedureSuccessful,
    updatedTodo,
    submittingTodo
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    // Used to detect completion of updateTodo procedure
    procedureOngoing: state.agents.procedureOngoing,
    procedureSuccessful: state.agents.procedureSuccessful,
    updatedTodo: state.agents.updatedTodo,
    submittingTodo: state.agents.submittingTodo
  }));

  // console.log(route.params);
  // Todo that has been selected by the user from the list of todos *****
  // const [selectedTodo] = useState(mockCurrentTodo[0]);

  // For pointer events
  const [modalVisible, setModalVisible] = useState(false);

  // For add button visibility in the header of left tab
  const [addButton, setAddButton] = useState(true);

  // Selected todo details
  const [todoSelected, setTodoSelected] = useState<LocalTodo>({
    id: "",
    title: "",
    patientName: "",
    notes: "",
    completed: false,
    alertId: "",
    patientId: "",
    createdAt: "",
    lastModified: "",
    toSync: false,
    _version: -1
  });

  // Records if a todo item has been selected
  const [isEmptyTodo, setEmptyTodo] = useState(true);
  const toast = useToast();
  const dispatch = useDispatch();

  // Render the right screen when todo item from todos card in Home screen is pressed
  useEffect(() => {
    if (route.params !== undefined) {
      setEmptyTodo(false);
      setTodoSelected(route.params);
    }
  }, [route.params]);

  // Function to save the selected todo details to be displayed in the right screen
  // JQ-TODO To be integrated with redux store for todo item details display on the right screen
  function onRowClick(item: LocalTodo) {
    setEmptyTodo(false);
    setTodoSelected(item);
  }

  // Compares dispatched updatedTodo with current Todo displayed in the TodoDetailsScreen
  useEffect(() => {
    // Updates the TodoDetailsScreen with the newly updated Todo
    if (updatedTodo && updatedTodo.id === todoSelected.id) {
      onRowClick(updatedTodo);
      dispatch(setUpdatedTodo(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedTodo]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, procedureOngoing, procedureSuccessful, toast, submittingTodo]);

  return (
    <ScreenWrapper fixed>
      <View
        style={styles.container}
        pointerEvents={modalVisible || submittingTodo ? "none" : "auto"}
      >
        {/* Left tab */}
        <View style={styles.rowSelection}>
          <RowSelectionTab
            title={i18n.t("ScreenName.Todo")}
            addButton={addButton}
            onPress={() => {
              setModalVisible(true);
            }}
            isTodo
          />
          {/* Left tab navigator */}
          <TodoListTabNavigation
            tabPressCurrent={() => {
              setAddButton(checkNeedAddButton(TodoListName.CURRENT));
            }}
            tabPressCompleted={() => {
              setAddButton(checkNeedAddButton(TodoListName.COMPLETED));
            }}
            setTodoSelected={onRowClick}
          />
        </View>

        {/* Right screen */}
        <View
          style={{
            flex: 2,
            backgroundColor: colors.primaryWebBackgroundColor
          }}
        >
          {!isEmptyTodo ? (
            <NavigationContainer independent>
              {/* Todo details navigation stack */}
              <TodoDetailsStackNavigation
                todo={todoSelected}
                navigation={navigation}
              />
            </NavigationContainer>
          ) : (
            // No todo selected
            <NoSelectionScreen
              screenName={ScreenName.TODO}
              subtitle={i18n.t("Todo.NoSelection")}
            />
          )}
        </View>
      </View>

      {/* ADD TODO modal */}
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
