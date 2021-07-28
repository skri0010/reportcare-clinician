import React, { FC, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "util/useRedux";
import { MainNavigationStack } from "./MainNavigationStack";
import { AuthNavigationStack } from "./AuthNavigationStack";
import awsconfig from "aws/aws-exports";
import { Amplify } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import { AuthState } from "web/auth_screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import { AsyncStorageKeys } from "agents_implementation/agent_framework/AgentEnums";
import { ToastProviderComponent } from "components/IndicatorComponents/ToastProvider";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const App: FC = () => {
  const [authState, setAuthState] = useState("");

  // Checks whether user is signed in
  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      // In case local storage has been cleared
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );
      if (clinicianId) {
        agentAPI.startAgents();
        setAuthState(AuthState.SIGNED_IN);
      } else {
        setAuthState(AuthState.SIGNED_OUT);
      }
    } catch (err) {
      setAuthState(AuthState.SIGNED_OUT);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  return (
    <Provider store={store}>
      <ToastProviderComponent>
        {authState === AuthState.SIGNED_IN && (
          <MainNavigationStack setAuthState={setAuthState} />
        )}
        {authState === AuthState.SIGNED_OUT && (
          <AuthNavigationStack setAuthState={setAuthState} />
        )}
      </ToastProviderComponent>
    </Provider>
  );
};

export default App;
