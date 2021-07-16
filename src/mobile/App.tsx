import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "util/useRedux";
import { MainNavigationStack } from "mobile/MainNavigationStack";
import awsconfig from "aws/aws-exports";
import { Amplify } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const App: FC = () => {
  return (
    <Provider store={store}>
      <MainNavigationStack />
    </Provider>
  );
};

export default App;
