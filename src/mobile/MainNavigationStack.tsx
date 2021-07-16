import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigationBar } from "./BottomNavigationBar";
import { ScreenName, RootStackParamList } from "mobile/screens";
import { RootState, select } from "util/useRedux";
import { Auth } from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ms } from "react-native-size-matters";

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

  const signOut = async (): Promise<void> => {
    await Auth.signOut().then(async () => {
      await DataStore.stop();
      await AsyncStorage.multiRemove(["UserId", "ClinicianId"]);
    });
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
            headerStyle: screenHeaderStyle,
            headerRight: () => (
              <Icon
                name="logout"
                color={colors.primaryContrastTextColor}
                size={ms(25)}
                style={{ paddingEnd: ms(10) }}
                onPress={signOut}
              />
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
