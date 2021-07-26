import React, { FC, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "./TodoCurrentTab";
import { TodoCompletedTab } from "./TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { View } from "react-native";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { TodoDetailsScreen } from "./TodoDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

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

  return (
    // JH-TODO: Replace names with i18n
    <ScreenWrapper>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ flex: 1 }}>
          <RowSelectionWrapper
            title="Todo"
            addButton={addButton}
            onPress={() => {
              null;
            }}
            isTodo
          >
            <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
              <Tab.Screen
                name="Current"
                component={TodoCurrentTab}
                listeners={{
                  tabPress: () => {
                    setAddButton(checkNeedAddButton("Todo"));
                  }
                }}
              />
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
            backgroundColor: "#E2E2E2"
          }}
        >
          <NavigationContainer independent>
            <Stack.Navigator initialRouteName="Todo Details">
              <Stack.Screen
                name="Todo Details"
                options={{
                  title: "View Todo",
                  headerStyle: {
                    height: moderateScale(45)
                  },
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: moderateScale(20),
                    paddingLeft: moderateScale(15)
                  }
                }}
              >
                {() => (
                  <TodoDetailsScreen
                    mainTitleContent="Schedule Appointment"
                    patientContent="Linda Mario"
                    notesContent="Change diet"
                    createdTimeDate="20:30 12-03-2021"
                    modifiedTimeDate="Never"
                    onViewPress={() => {
                      null;
                    }}
                    onEditPress={() => {
                      null;
                    }}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </View>
    </ScreenWrapper>

    // {/* // <View>
    // //   <Text>TODO</Text>
    // // </View> */}
  );
};
