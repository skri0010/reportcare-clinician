import React, { FC, useState, createContext } from "react";
import { View, Dimensions, FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ClinicianInfo } from "aws/models";
import { ClinicianDetails } from "./ClinicianDetails";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ms } from "react-native-size-matters";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";

const Stack = createStackNavigator();

export const ClinicianContext = createContext({
  id: "",
  name: "",
  role: "",
  hospitalName: "",
  clinicianID: ""
});

export const CliniciansTab: FC<WithSideTabsProps[ScreenName.CLINICIAN]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [clinicianSelected, setClincianSelected] = useState<ClinicianInfo>({
    id: "",
    name: "",
    role: "",
    hospitalName: "",
    clinicianID: "",
    owner: ""
  });

  const [isEmptyClinician, setEmptyClincian] = useState(true);

  function onRowClick(item: ClinicianInfo){
    const currentSelected = clinicianSelected;
    const emptyClincian: ClinicianInfo = {
      id: "",
      name: "",
      role: "",
      hospitalName: "",
      clinicianID: "",
      owner: ""
    };
    if (currentSelected !== item && item !== emptyClincian) {
      setEmptyClincian(false);
      setClincianSelected(item);
    } else if (item === emptyClincian) {
      setEmptyClincian(true);
    }
  }

  const initialClinician = {
    id: clinicianSelected.id,
    name: clinicianSelected.name,
    role: clinicianSelected.role,
    hospitalName: clinicianSelected.hospitalName,
    clinicianID: clinicianSelected.clinicianID
  };



  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
      <ClinicianContext.Provider value={initialClinician}>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ flex: 1, height: Dimensions.get("window").height }}>
          <RowSelectionWrapper
            title="Clinician"
            >
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <ItemSeparator />}
              data = {mockClinician}
              renderItem={({ item }) => (
                <ClinicianContactRow 
                generalDetails={item} onRowPress={() => onRowClick(item)} />
              )
            }
              />
            </RowSelectionWrapper>
            </View>
        <View style = {{ flex: 2, backgroundColor: colors.primaryWebBackgroundColor }}>
          {!isEmptyClinician ? (
            <NavigationContainer independent>
                <Stack.Navigator>
                  <Stack.Screen 
                    name="View Clinician"
                    component={ClinicianDetails}
                    options={() => ({
                      title: "Clinician",
                      headerStyle: {
                        height: ms(45)
                      },
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: ms(20),
                        paddingLeft: ms(15)
                      }
                    })}
                  />
                </Stack.Navigator>
            </NavigationContainer>
          ): (
            <NoSelectionScreen
              screenName={ScreenName.CLINICIAN}
              subtitle="Choose Clinician to view more info"
            />
          )}
          
        </View>
        
        </View>
        </ClinicianContext.Provider>
    </ScreenWrapper>
  );
};

