import React, { FC, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "util/useRedux";
import { MainNavigationStack } from "./MainNavigationStack";
import { AuthNavigationStack } from "./AuthNavigationStack";
import awsconfig from "aws/aws-exports";
import { Amplify } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import { LogBox } from "react-native";
import { AuthState } from "./auth_screens";
import { Storage } from "rc_agents/storage";
import { ToastProviderComponent } from "components/Indicators/ToastProvider";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

/**
 * Currently used to suppress a warning of "Setting a timer..." that
 * is periodically logged at the console.
 * Discussion of this issue can be found here: https://github.com/facebook/react-native/issues/12981
 */
LogBox.ignoreLogs(["Setting a timer"]);

const App: FC = () => {
  const [authState, setAuthState] = useState("");

  // Checks whether user is signed in
  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      // In case local storage has been cleared
      const clinicianId = await Storage.getClinicianID();
      if (clinicianId) {
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
