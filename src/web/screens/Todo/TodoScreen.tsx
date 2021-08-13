/* eslint-disable no-console */
import React, { FC, useState, createContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "./TodoCurrentTab";
import { TodoCompletedTab } from "./TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import {
  ScreenName,
  WithSideTabsProps,
  TodoLeftTabName,
  TodoScreenName
} from "web/screens";
import { View, Modal } from "react-native";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { TodoDetailsScreen } from "./TodoDetailsScreen";
import { EditTodoScreen } from "./EditTodoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AddTodoScreen } from "./AddTodoScreen";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import { ITodoDetails } from "models/TodoDetails";
import i18n from "util/language/i18n";
import { MarkAsDoneButton } from "./MarkAsDoneButton";
import { TodoLeftTabNavigator } from "./TodoLeftTabNavigator";
import { TodoDetailsNavigationStack } from "./TodoDetailsNavigationStack";
import { mockCurrentTodo } from "mock/mockTodoDetails";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// Todo context
export const TodoContext = createContext({
  mainTitleContent: "",
  patientContent: "",
  notesContent: "",
  doneStatus: false,
  createdTimeDate: "",
  modifiedTimeDate: ""
});

// Determines if the add button is needed in the header of left tab
function checkNeedAddButton(tabName: TodoLeftTabName) {
  let needAddButton = true;
  if (tabName === TodoLeftTabName.COMPLETED) {
    needAddButton = false;
  }
  return needAddButton;
}

export const TodoScreen: FC<WithSideTabsProps[ScreenName.TODO]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Patient that has been selected by the user from the list of patients
  const [selectedTodo] = useState(mockCurrentTodo[0]);

  // For pointer events
  const [modalVisible, setModalVisible] = useState(false);

  // For add button visibility in the header of left tab
  const [addButton, setAddButton] = useState(true);

  // Selected todo details
  const [todoSelected, setTodoSelected] = useState<ITodoDetails>({
    title: "",
    name: "",
    description: "",
    doneStatus: false,
    created: "",
    modified: "",
    id: ""
  });

  // Records if a todo item has been selected
  const [isEmptyTodo, setEmptyTodo] = useState(true);

  // Function to save the selected todo details to be displayed in the right screen
  function onRowClick(item: ITodoDetails) {
    const currentSelected = todoSelected;
    const emptyTodo: ITodoDetails = {
      title: "",
      name: "",
      description: "",
      doneStatus: false,
      created: "",
      modified: "",
      id: ""
    };

    // If the currently selected todo is different from the newly selected todo and is not an empty todo
    if (currentSelected !== item && item !== emptyTodo) {
      setEmptyTodo(false);
      setTodoSelected(item);
    } else if (item === emptyTodo) {
      setEmptyTodo(true);
    }
  }

  // Initial todo object to be used by the context
  const initialTodo = {
    mainTitleContent: todoSelected.title,
    patientContent: todoSelected.name,
    notesContent: todoSelected.description,
    doneStatus: todoSelected.doneStatus,
    createdTimeDate: todoSelected.created,
    modifiedTimeDate: todoSelected.modified
  };

  return (
    // JH-TODO: Replace names with i18n
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
          {/* <TodoLeftTabNavigator
            tabPressCurrent={() => {
              setAddButton(checkNeedAddButton(TodoLeftTabName.CURRENT));
            }}
            tabPressCompleted={() => {
              setAddButton(checkNeedAddButton(TodoLeftTabName.COMPLETED));
            }}
            setTodoSelected={onRowClick}
          /> */}
          <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
            {/* CURRENT todo tab */}
            <Tab.Screen
              name={TodoLeftTabName.CURRENT}
              options={{ title: i18n.t("Todo.Current") }}
              listeners={{
                tabPress: () => {
                  setAddButton(checkNeedAddButton(TodoLeftTabName.CURRENT));
                }
              }}
            >
              {() => <TodoCurrentTab setTodoSelected={onRowClick} />}
            </Tab.Screen>
            {/* COMPLETED todo tab */}
            <Tab.Screen
              name={TodoLeftTabName.COMPLETED}
              options={{ title: i18n.t("Todo.Completed") }}
              listeners={{
                tabPress: () => {
                  setAddButton(checkNeedAddButton(TodoLeftTabName.COMPLETED));
                }
              }}
            >
              {() => <TodoCompletedTab setTodoSelected={onRowClick} />}
            </Tab.Screen>
          </Tab.Navigator>
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
              <TodoDetailsNavigationStack todo={selectedTodo} />
              {/* <TodoContext.Provider value={initialTodo}> */}
              {/* <Stack.Navigator>
                <Stack.Screen
                  name={TodoScreenName.VIEWTODO}
                  component={TodoDetailsScreen}
                  initialParams={{ todo: selectedTodo }}
                  options={() => ({
                    title: i18n.t("Todo.ViewTodo"),
                    headerStyle: {
                      height: ms(45)
                    },
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: ms(20),
                      paddingLeft: ms(15)
                    },
                    headerRight: () => <MarkAsDoneButton onPress={() => null} />
                  })}
                />
                <Stack.Screen
                  name={TodoScreenName.EDITTODO}
                  component={EditTodoScreen}
                  initialParams={{ todo: selectedTodo }}
                  options={{
                    title: i18n.t("Todo.EditTodo"),
                    headerStyle: {
                      height: ms(45)
                    },
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: ms(20)
                    }
                  }}
                />
              </Stack.Navigator> */}
              {/* </TodoContext.Provider> */}
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
