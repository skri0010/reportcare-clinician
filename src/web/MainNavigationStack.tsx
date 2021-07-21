import React, { FC } from "react";
import { View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SideNavigationBar } from "./SideNavigationBar";
import { ScreenName, RootStackParamList } from "./screens";
import { RootState, select } from "util/useRedux";
import { Auth } from "@aws-amplify/auth";
// import { DataStore } from "@aws-amplify/datastore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ms } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import i18n from "util/language/i18n";
import { AuthState } from "./auth_screens";

interface MainNavigationStackProps {
  setAuthState: (state: string) => void;
}

const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigationStack: FC<MainNavigationStackProps> = ({
  setAuthState
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const toast = useToast();

  const screenHeaderStyle = {
    backgroundColor: colors.primaryBarColor
  };

  const signOut = async (): Promise<void> => {
    await Auth.signOut().then(async () => {
      // await DataStore.clear();
      await AsyncStorage.multiRemove(["UserId", "ClinicianId"]);
      toast.show(i18n.t("SignOutSuccessful"), { type: "success" });
      setAuthState(AuthState.SIGNED_OUT);
    });
  };

  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Main Tabs */}
          <Stack.Screen
            name={ScreenName.MAIN}
            component={SideNavigationBar}
            options={{
              headerTitle: () => null,
              headerStyle: screenHeaderStyle,
              headerRight: () => (
                <Icon
                  name="logout"
                  color={colors.primaryContrastTextColor}
                  size={ms(20)}
                  style={{ paddingEnd: ms(10) }}
                  onPress={signOut}
                />
              )
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
