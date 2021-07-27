import React, { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigationBar } from "./BottomNavigationBar";
import { ScreenName, RootStackParamList } from "mobile/screens";
import { RootState, select } from "util/useRedux";
import { Auth } from "@aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ms } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import i18n from "util/language/i18n";
import { AuthState } from "./auth_screens";
import {
  AppAttributes,
  BeliefKeys
} from "agents_implementation/agent_framework/AgentEnums";
import Belief from "agents_implementation/agent_framework/base/Belief";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import { useNetInfo } from "@react-native-community/netinfo";

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
  const netInfo = useNetInfo();

  // States related to internet connection
  const [successToastShown, setSuccessToast] = useState(false);
  const [warningToastShown, setWarningToast] = useState(false);

  const screenHeaderStyle = {
    backgroundColor: colors.primaryBarColor,
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0 // Remove shadow on iOS
  };

  const signOut = async (): Promise<void> => {
    await Auth.signOut().then(async () => {
      const keys = await AsyncStorage.getAllKeys();
      if (keys && keys.length > 0) {
        await AsyncStorage.multiRemove(keys);
      }
      toast.show(i18n.t("Auth_SignOut.SignOutSuccessful"), { type: "success" });
      setAuthState(AuthState.SIGNED_OUT);
    });
  };

  // Detects changes in internet connection
  useEffect(() => {
    // Internet connection detected
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      // Broadcast the fact to trigger data syncing
      agentAPI.addFact(new Belief(BeliefKeys.APP, AppAttributes.ONLINE, true));

      // Was previously offline
      if (warningToastShown && !successToastShown) {
        toast.show(i18n.t("Internet_Connection.OnlineNotice"), {
          type: "success"
        });
        setSuccessToast(true);
        setWarningToast(false);
      }
    }
    // No internet connection
    else if (
      netInfo.isConnected === false ||
      netInfo.isInternetReachable === false
    ) {
      // Removes online broadcast from facts
      agentAPI.addFact(
        new Belief(BeliefKeys.APP, AppAttributes.ONLINE, null),
        false
      );
      if (!warningToastShown) {
        toast.show(i18n.t("Internet_Connection.OfflineNotice"), {
          type: "warning"
        });
        setWarningToast(true);
        setSuccessToast(false);
      }
    }
  }, [
    netInfo.isConnected,
    netInfo.isInternetReachable,
    toast,
    successToastShown,
    warningToastShown
  ]);

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
