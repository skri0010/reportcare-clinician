import React, { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainDrawerNavigator } from "./MainDrawerNavigator";
import { Auth } from "@aws-amplify/auth";
import { useToast } from "react-native-toast-notifications";
import i18n from "util/language/i18n";
import { AuthState } from "web/auth_screens";
import { useNetInfo } from "@react-native-community/netinfo";
import agentAPI from "rc_agents/framework/AgentAPI";
import Belief from "rc_agents/framework/base/Belief";
import { AppAttributes, BeliefKeys } from "rc_agents/AgentEnums";
import { Storage } from "rc_agents/storage";

interface MainNavigationStackProps {
  setAuthState: (state: string) => void;
}

export const MainNavigationStack: FC<MainNavigationStackProps> = ({
  setAuthState
}) => {
  const toast = useToast();
  const netInfo = useNetInfo();

  // States related to internet connection
  const [successToastShown, setSuccessToast] = useState(false);
  const [warningToastShown, setWarningToast] = useState(false);

  // Sign out function
  const signOut = async (): Promise<void> => {
    await Auth.signOut().then(async () => {
      await Storage.removeAll();
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
      agentAPI.addFact(new Belief(BeliefKeys.APP, AppAttributes.ONLINE, false));
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
      <MainDrawerNavigator signOut={signOut} />
    </NavigationContainer>
  );
};
