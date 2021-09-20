import { AlertListTabName, AlertListTabParamList } from "web/navigation";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { AlertScreenNavigation } from "./MainScreenProps";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

// Navigation and route for Alert list tabs

export type CurrentTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      AlertListTabParamList,
      AlertListTabName.CURRENT
    >,
    AlertScreenNavigation
  >;
  route: RouteProp<AlertListTabParamList, AlertListTabName.CURRENT>;
};

export type CompletedTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      AlertListTabParamList,
      AlertListTabName.COMPLETED
    >,
    AlertScreenNavigation
  >;
  route: RouteProp<AlertListTabParamList, AlertListTabName.COMPLETED>;
};
