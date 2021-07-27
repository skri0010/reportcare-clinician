import React, { FC, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "./TodoCurrentTab";
import { TodoCompletedTab } from "./TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { View, Dimensions } from "react-native";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { ms } from "react-native-size-matters";
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

  const [addButton, setAddButton] = useState(true);
  const [todoSelected, setTodoSelected] = useState<ITodoDetails | null>(null);
  const [addButtonPressed, setAddButtonPressed] = useState(false);

  function onRowClick(item: ITodoDetails | null) {
    setTodoSelected(item);
    // if (todoSelected === null ){
    //   setTodoSelected(item);
    // }
    // else{
    //   setTodoSelected(null);
    // }
    // // eslint-disable-next-line no-console
    // console.log(todoSelected);
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
                component={TodoCompletedTab}
                listeners={{
                  tabPress: () => {
                    setAddButton(checkNeedAddButton("Completed"));
                  }
                }}
              />
            </Tab.Navigator>
          </RowSelectionWrapper>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: colors.primaryWebBackgroundColor
          }}
        >
          {todoSelected ? (
            <NavigationContainer independent>
              <Stack.Navigator initialRouteName="NoSelection">
                <Stack.Screen
                  name="ViewTodo"
                  component={TodoDetailsScreen}
                  initialParams={{
                    mainTitleContent: todoSelected.title,
                    patientContent: todoSelected.name,
                    notesContent: todoSelected.description,
                    createdTimeDate: "20:30 12-03-2021",
                    modifiedTimeDate: "never"
                  }}
                  options={{
                    title: "View Todo",
                    headerStyle: {
                      height: ms(45)
                    },
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: ms(20),
                      paddingLeft: ms(15)
                    }
                  }}
                />
                <Stack.Screen name="AddTodo" component={AddTodoScreen} />
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

    // {/* // <View>
    // //   <Text>TODO</Text>
    // // </View> */}
  );
};
