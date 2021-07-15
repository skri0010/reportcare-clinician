import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigationBar } from "mobile/BottomNavigationBar";
import { ScreenName, RootStackParamList } from "mobile/screens";
import { RootState, select } from "util/useRedux";

const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigationStack: FC = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const screenHeaderStyle = {
    backgroundColor: colors.primaryBarColor,
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0 // Remove shadow on iOS
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Main Tabs */}
        <Stack.Screen
          name={ScreenName.MAIN}
          component={BottomNavigationBar}
          options={{
            headerTitle: () => null,
            headerStyle: screenHeaderStyle
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
