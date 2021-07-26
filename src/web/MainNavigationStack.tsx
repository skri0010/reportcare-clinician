import React, { FC } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SideNavigationBar } from "./SideNavigationBar";
import { ScreenName, RootStackParamList } from "./screens";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";

const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigationStack: FC = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const screenHeaderStyle = {
    backgroundColor: colors.primaryBarColor
  };

  return (
    <View style={styles.mainContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Main Tabs */}
          <Stack.Screen
            name={ScreenName.MAIN}
            component={SideNavigationBar}
            options={{
              headerTitle: () => null,
              headerStyle: screenHeaderStyle
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1
  }
});
