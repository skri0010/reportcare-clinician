/* eslint-disable no-console */
import React, { FC, useState, createContext, useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "./TodoCurrentTab";
import { TodoCompletedTab } from "./TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps, TodoStackParamList } from "web/screens";
import { View, Dimensions } from "react-native";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { ms } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { TodoDetailsScreen } from "./TodoDetailsScreen";
import { EditTodoScreen } from "./EditTodoScreen";
import {
  createStackNavigator,
  HeaderBackButton
} from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
const testing: FC = () => {
  return <View />;
};
export const TodoScreen: FC<WithSideTabsProps[ScreenName.TODO]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

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
  const [addButtonPressed, setAddButtonPressed] = useState(false);
  const [selectedChange, setSelectedChanged] = useState<boolean>(false);
  const [queue, setQueue] = useState<string[]>([]);

  const initialTodo = {
    mainTitleContent: todoSelected.title,
    patientContent: todoSelected.name,
    notesContent: todoSelected.description,
    createdTimeDate: todoSelected.created,
    modifiedTimeDate: todoSelected.modified
  };

  function onRowClick(item: ITodoDetails) {
    const currentSelected = todoSelected;
    const changed: boolean = false;
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
      if (queue.includes("ViewTodo") === false) {
        queue.push("ViewTodo");
      }
      setQueue(queue);
      setSelectedChanged(!changed);
      setTodoSelected(item);
    }
    // setTodoSelected(item);
    // if (todoSelected === null ){
    //   setTodoSelected(item);
    // }
    // else{
    //   setTodoSelected(null);
    // }
    // // eslint-disable-next-line no-console
    // console.log(todoSelected);
  }

  function checkInitialRoute() {
    let initialRoute: string = "";
    if (queue.length === 1) {
      if (queue[0] === "ViewTodo") {
        initialRoute = "ViewTodo";
      } else {
        initialRoute = "AddTodo";
      }
    } else if (queue.length === 2) {
      if (queue[0] === "ViewTodo") {
        initialRoute = "AddTodo";
      } else {
        queue.shift();
        setQueue(queue);
      }
    }
    return initialRoute;
  }

  return (
    // JH-TODO: Replace names with i18n
    <ScreenWrapper>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ flex: 1, height: Dimensions.get("window").height }}>
          <RowSelectionWrapper
            title="Todo"
            addButton={addButton}
            onPress={() => {
              if (queue.includes("AddTodo") === false) {
                queue.push("AddTodo");
              }
              setQueue(queue);
              setAddButtonPressed(true);
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
          {selectedChange || addButtonPressed ? (
            <NavigationContainer independent>
              <TodoContext.Provider value={initialTodo}>
                <Stack.Navigator initialRouteName={checkInitialRoute()}>
                  <Stack.Screen
                    name="ViewTodo"
                    component={TodoDetailsScreen}
                    options={({ navigation, route }) => ({
                      title: "View Todo",
                      headerStyle: {
                        height: ms(45)
                      },
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: ms(20),
                        paddingLeft: ms(15)
                      }
                      // headerLeft: () => null
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
                  <Stack.Screen
                    name="AddTodo"
                    component={AddTodoScreen}
                    options={({ navigation, route }) => ({
                      title: "Add Todo",
                      headerStyle: {
                        height: ms(45)
                      },
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: ms(20),
                        paddingLeft: ms(15)
                      },
                      headerLeft: () => (
                        <HeaderBackButton
                          onPress={() => {
                            navigation.navigate("ViewTodo", route.params);
                            setAddButtonPressed(false);
                          }}
                        />
                      )
                    })}
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
    </ScreenWrapper>
  );
};
