import React, { FC, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "util/useRedux";
import { MainNavigationStack } from "./MainNavigationStack";
import { AuthNavigationStack } from "./AuthNavigationStack";
import awsconfig from "aws/aws-exports";
import { Amplify, Hub } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import { LogBox } from "react-native";
// import Test from "shared/Test";

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
      setAuthState("signedIn");
    } catch (err) {
      setAuthState("signedOut");
    }
  };

  // Listens to Auth events
  const setAuthListener = async () => {
    Hub.listen("auth", async (data) => {
      switch (data.payload.event) {
        case "signIn":
          setAuthState("signedIn");
          break;
        case "signOut":
          setAuthState("signedOut");
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    checkAuthState();
    setAuthListener();
  }, []);

  return (
    <Provider store={store}>
      {authState === "signedIn" && (
        <MainNavigationStack />
        // <Test />
      )}
      {authState === "signedOut" && <AuthNavigationStack />}
    </Provider>
  );
};

export default App;
