import React, { FC, useEffect, useState, useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "util/useRedux";
import { MainNavigationStack } from "web/MainNavigation";
import { AuthNavigationStack } from "web/navigation/navigators/AuthStackNavigator";
import awsconfig from "aws/aws-exports";
import { Amplify } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import { AuthState } from "web/auth_screens";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { Storage } from "rc_agents/storage";
import { ToastProviderComponent } from "components/Indicators/ToastProvider";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentIDs } from "rc_agents/clinician_framework";
import { subscribeAlertNotification } from "aws/TypedAPI/subscriptions";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const App: FC = () => {
  const [displayApp, setDisplayApp] = useState(false);
  const [authState, setAuthState] = useState("");

  // Checks whether agents are initialized before rendering main components
  const checkAgentsInitialized = useCallback(() => {
    const agentIDMap: { [id: string]: boolean } = {};
    // Map expected agent ids to false
    Object.values(AgentIDs).forEach((id: string) => {
      agentIDMap[id] = false;
    });
    // Update agent id map
    const registeredAgents = agentAPI.getAgents();
    if (registeredAgents) {
      registeredAgents.forEach((agent) => {
        agentIDMap[agent.getID()] = agent.getInitialized();
      });
    }
    // Ensure all values are true, ie all agents initialized
    const agentsInitialized = !Object.values(agentIDMap).includes(false);
    // Display app if all agents are initialized
    if (agentsInitialized) {
      setDisplayApp(true);
    }
    // Set a timeout to check again
    else {
      // eslint-disable-next-line no-console
      console.log("System is still setting up");
      setTimeout(() => checkAgentsInitialized(), 1000);
    }
  }, []);

  useEffect(() => {
    checkAgentsInitialized();
  }, [checkAgentsInitialized]);

  // Checks whether user is signed in
  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      // In case local storage has been cleared
      const clinicianId = await Storage.getClinicianID();
      if (clinicianId) {
        setAuthState(AuthState.SIGNED_IN);
      } else {
        setAuthState(AuthState.SIGNED_IN);
      }
    } catch (err) {
      setAuthState(AuthState.SIGNED_IN);
    }
  };

  useEffect(() => {
    // Checks for authentication state
    checkAuthState();

    // Subscribes to AlertNotification table
    subscribeAlertNotification();
  }, []);

  return (
    <Provider store={store}>
      {displayApp ? (
        <ToastProviderComponent>
          {authState === AuthState.SIGNED_IN ? (
            <MainNavigationStack setAuthState={setAuthState} />
          ) : authState === AuthState.SIGNED_OUT ? (
            <AuthNavigationStack setAuthState={setAuthState} />
          ) : null}
        </ToastProviderComponent>
      ) : (
        <LoadingIndicator overlayBackgroundColor />
      )}
    </Provider>
  );
};

export default App;
