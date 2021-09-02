/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, FC, SetStateAction } from "react";
import { RootState, select } from "util/useRedux";
import { AlertDetailsScreen } from "web/screens/Alerts/AlertDetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ms } from "react-native-size-matters";
import { AlertDetailsStackScreenName } from "../navigatorScreenNames";
import { AlertDetailsStackParamList } from "..";

const Stack = createStackNavigator<AlertDetailsStackParamList>();

interface AlertListTabNavigatorProps {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const AlertDetailsStackNavigator: FC<AlertListTabNavigatorProps> = ({
  setModalVisible
}) => {
  const { alertInfo } = select((state: RootState) => ({
    alertInfo: state.agents.alertInfo
  }));

  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name={AlertDetailsStackScreenName.VIEWALERT}
          options={() => ({
            title: alertInfo?.patientName,
            headerStyle: {
              height: ms(45)
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: ms(20),
              paddingLeft: ms(15)
            }
          })}
        >
          {() => <AlertDetailsScreen setModalVisible={setModalVisible} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
