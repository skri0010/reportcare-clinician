/* eslint-disable */
export {};
/* eslint-disable react/jsx-props-no-spreading */
// import React, { FC } from "react";
// import { select, RootState } from "util/useRedux";
// import {
//   PatientDetailsTabName,
//   PatientDetailsTabParamList
// } from "web/navigation";
// import i18n from "util/language/i18n";
// import { PatientDetails } from "rc_agents/model";
// import { getStackOptions } from "util/getStyles";
// import { createStackNavigator } from "@react-navigation/stack";

// // JH-NEW-CONFIG: Add type
// const Stack = createStackNavigator();

// // JH-NEW-CONFIG: Add interface
// export interface PatientConfigurationStackNavigator {
//   originalDetails: PatientDetails;
//   selectedTab: selectedTab;
// }

// export const PatientConfigurationStackNavigator: FC<PatientConfigurationStackNavigator> =
//   ({ originalDetails }) => {
//     const { colors, fonts } = select((state: RootState) => ({
//       colors: state.settings.colors,
//       fonts: state.settings.fonts
//     }));

//     // Type check params list. Required because initialParams is insufficient due to Partial<>
//     // Remove eslint check if needed
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const initialParamsList: PatientDetailsTabParamList = {

//     };

//     return (
//       <Stack.Navigator
//         screenOptions={getStackOptions({ colors: colors, fonts: fonts })}
//         initialRouteName={selectedTab || PatientDetailsTabName.OVERVIEW}
//       ></Stack.Navigator>
//     );
//   };
