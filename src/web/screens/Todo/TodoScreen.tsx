/* eslint-disable no-console */
import React, { FC, useState, createContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "./TodoCurrentTab";
import { TodoCompletedTab } from "./TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
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

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const TodoContext = createContext({
  mainTitleContent: "",
  patientContent: "",
  notesContent: "",
  createdTimeDate: "",
  modifiedTimeDate: ""
});

function checkNeedAddButton(tabName: string) {
  let needAddButton = true;
  if (tabName === "Completed") {
    needAddButton = false;
  }
  return needAddButton;
}

export const TodoScreen: FC<WithSideTabsProps[ScreenName.TODO]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [modalVisible, setModalVisible] = useState(false);
  const [addButton, setAddButton] = useState(true);
  const [todoSelected, setTodoSelected] = useState<ITodoDetails>({
    title: "",
    name: "",
    description: "",
    doneStatus: false,
    created: "",
    modified: "",
    id: ""
  });
  const [isEmptyTodo, setEmptyTodo] = useState(true);

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
    if (currentSelected !== item && item !== emptyTodo) {
      setEmptyTodo(false);
      setTodoSelected(item);
    } else if (item === emptyTodo) {
      setEmptyTodo(true);
    }
  }

  const initialTodo = {
    mainTitleContent: todoSelected.title,
    patientContent: todoSelected.name,
    notesContent: todoSelected.description,
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
        <View style={styles.rowSelection}>
          <RowSelectionWrapper
            title="Todo"
            addButton={addButton}
            onPress={() => {
              setModalVisible(true);
            }}
            isTodo
          >
            <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
              <Tab.Screen
                name="Current"
                listeners={{
                  tabPress: () => {
                    setAddButton(checkNeedAddButton("Todo"));
                  }
                }}
              >
                {() => <TodoCurrentTab setTodoSelected={onRowClick} />}
              </Tab.Screen>
              <Tab.Screen
                name="Completed"
                listeners={{
                  tabPress: () => {
                    setAddButton(checkNeedAddButton("Completed"));
                  }
                }}
              >
                {() => <TodoCompletedTab setTodoSelected={onRowClick} />}
              </Tab.Screen>
            </Tab.Navigator>
          </RowSelectionWrapper>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: colors.primaryWebBackgroundColor
          }}
        >
          {!isEmptyTodo ? (
            <NavigationContainer independent>
              <TodoContext.Provider value={initialTodo}>
                <Stack.Navigator>
                  <Stack.Screen
                    name="ViewTodo"
                    component={TodoDetailsScreen}
                    options={() => ({
                      title: "View Todo",
                      headerStyle: {
                        height: ms(45)
                      },
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: ms(20),
                        paddingLeft: ms(15)
                      }
                    })}
                  />
                  <Stack.Screen
                    name="EditTodo"
                    component={EditTodoScreen}
                    options={{
                      title: "Edit Todo",
                      headerStyle: {
                        height: ms(45)
                      },
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: ms(20)
                      }
                    }}
                  />
                </Stack.Navigator>
              </TodoContext.Provider>
            </NavigationContainer>
          ) : (
            <NoSelectionScreen
              screenName={ScreenName.TODO}
              subtitle="Select a Todo item to view its details"
            />
          )}
        </View>
      </View>

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
