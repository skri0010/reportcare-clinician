/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps, TodoLeftTabName } from "web/screens";
import { View, Modal } from "react-native";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { AddTodoScreen } from "./AddTodoScreen";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import i18n from "util/language/i18n";
import { TodoLeftTabNavigator } from "./TodoNavigations/TodoLeftTabNavigator";
import { TodoDetailsNavigationStack } from "./TodoNavigations/TodoDetailsNavigationStack";
import { LocalTodo } from "rc_agents/model";

// Determines if the add button is needed in the header of left tab
function checkNeedAddButton(tabName: TodoLeftTabName) {
  let needAddButton = true;
  if (tabName === TodoLeftTabName.COMPLETED) {
    needAddButton = false;
  }
  return needAddButton;
}

export const TodoScreen: FC<WithSideTabsProps[ScreenName.TODO]> = ({
  route,
  navigation
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
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
    pendingSync: false,
    _version: -1
  });

  // Records if a todo item has been selected
  const [isEmptyTodo, setEmptyTodo] = useState(true);

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

  return (
    <ScreenWrapper fixed>
      <View
        style={styles.container}
        pointerEvents={modalVisible ? "none" : "auto"}
      >
        {/* Left tab */}
        <View style={styles.rowSelection}>
          <RowSelectionWrapper
            title={i18n.t("TabTitle.Todo")}
            addButton={addButton}
            onPress={() => {
              setModalVisible(true);
            }}
            isTodo
          />
          {/* Left tab navigator */}
          <TodoLeftTabNavigator
            tabPressCurrent={() => {
              setAddButton(checkNeedAddButton(TodoLeftTabName.CURRENT));
            }}
            tabPressCompleted={() => {
              setAddButton(checkNeedAddButton(TodoLeftTabName.COMPLETED));
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
              <TodoDetailsNavigationStack
                todo={todoSelected}
                mainNavigation={navigation}
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
