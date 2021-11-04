import React, { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainDrawerNavigator } from "web/navigation/navigators/MainDrawerNavigator";
import { Auth } from "@aws-amplify/auth";
import { useToast } from "react-native-toast-notifications";
import i18n from "util/language/i18n";
import { AuthState } from "web/auth_screens";
import { useNetInfo } from "@react-native-community/netinfo";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { Belief } from "agents-framework";
import { AppAttributes, BeliefKeys } from "rc_agents/clinician_framework";
import { LocalStorage } from "rc_agents/storage";
import { RootState, select } from "util/useRedux";

interface MainNavigationProps {
  setAuthState: (state: string) => void;
}

export const MainNavigation: FC<MainNavigationProps> = ({ setAuthState }) => {
  const { language } = select((state: RootState) => ({
    colors: state.settings.colors,
    language: state.settings.language
  }));

  const toast = useToast();
  const netInfo = useNetInfo();

  // States related to internet connection
  const [successToastShown, setSuccessToast] = useState(false);
  const [warningToastShown, setWarningToast] = useState(false);
  const [networkStateReady, setNetworkStateReady] = useState(false);

  // Sign out function
  const signOut = async (): Promise<void> => {
    await Auth.signOut().then(async () => {
      await LocalStorage.removeAll();
      toast.show(i18n.t("Auth_SignOut.SignOutSuccessful"), { type: "success" });
      setAuthState(AuthState.SIGNED_OUT);
    });
  };

  // Change the language of the main navigation screens
  useEffect(() => {
    // Required to make sure language is changed upon load
    i18n.changeLanguage(language.toString());
  }, [language]);

  // Detects changes in internet connection
  useEffect(() => {
    // Internet connection detected
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      // Broadcast the fact to trigger data syncing
      agentAPI.addFact(new Belief(BeliefKeys.APP, AppAttributes.ONLINE, true));
      setNetworkStateReady(true);

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
      agentAPI.addFact(new Belief(BeliefKeys.APP, AppAttributes.ONLINE, false));
      setNetworkStateReady(true);
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

  // Ensures that navigation stack is only rendered after network state is added to facts
  return networkStateReady ? (
    <NavigationContainer>
      <MainDrawerNavigator signOut={signOut} />
    </NavigationContainer>
  ) : null;
};
