import React, { FC, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "util/useRedux";
import { MainNavigationStack } from "./MainNavigationStack";
import { AuthNavigationStack } from "./AuthNavigationStack";
import awsconfig from "aws/aws-exports";
import { Amplify } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import { ToastProvider } from "react-native-toast-notifications";
import { ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import { AuthState } from "web/auth_screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
// import Test from "shared/Test";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const App: FC = () => {
  const [authState, setAuthState] = useState("");

  // Checks whether user is signed in
  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      // In case local storage has been cleared
      const [[, userId], [, clinicianId]] = await AsyncStorage.multiGet([
        "UserId",
        "ClinicianId"
      ]);
      if (userId && clinicianId) {
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
      <ToastProvider
        placement="top"
        offset={ms(15)}
        duration={4000}
        successColor="#229c00"
        successIcon={
          <Icon
            name="check-square"
            color="white"
            size={ms(15)}
            style={{ marginLeft: ms(5), marginRight: ms(10) }}
          />
        }
        dangerIcon={
          <Icon
            name="times-circle"
            color="white"
            size={ms(15)}
            style={{ marginLeft: ms(5), marginRight: ms(10) }}
          />
        }
        dangerColor="#b30c00"
        textStyle={{ fontSize: ms(12), color: "white" }}
        style={{
          paddingVertical: ms(10),
          paddingRight: ms(20),
          borderRadius: ms(5),
          maxWidth: Dimensions.get("window").width / 4
        }}
      >
        {authState === AuthState.SIGNED_IN && (
          <MainNavigationStack setAuthState={setAuthState} />
          // <Test />
        )}
        {authState === AuthState.SIGNED_OUT && (
          <AuthNavigationStack setAuthState={setAuthState} />
        )}
      </ToastProvider>
    </Provider>
  );
};

export default App;
