import React, { FC, useState, createContext } from "react";
import { View, Dimensions, FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import { ScaledSheet } from "react-native-size-matters";
import { lightColorScheme } from "models/ColorScheme";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { NoSelection } from "./NoSelection";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ClinicianInfo } from "aws/models";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

export const ClincianContext = createContext({
  id: "",
  name: "",
  role: "",
  hospitalName: "",
  clinicianID: "",
  owner: ""
})
export const CliniciansTab: FC<WithSideTabsProps[ScreenName.CLINICIAN]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [filteredClinicians, setFilteredClinicians] = useState<ClinicianInfo[]>(mockClinician);

  const Stack = createStackNavigator();
  const [isEmptyClinician, setEmptyClinician] = useState(true);
  const [clinicianSelected, setClinicianSelected] = useState<ClinicianInfo>({
    id: "",
    name: "",
    role: "",
    hospitalName: "",
    clinicianID: "",
    owner: ""
  });

  const [selectedClinician] = useState(mockClinician[0]);

  const initialClinician = {
    id: clinicianSelected.id,
    name: clinicianSelected.name,
    role: clinicianSelected.role,
    hospitalName: clinicianSelected.hospitalName,
    clinicianID: clinicianSelected.clinicianID,
    owner: clinicianSelected.owner
  };

  function onRowClick(item: ClinicianInfo) {
    const currentSelected = clinicianSelected;
    const emptyClinician: ClinicianInfo = {
      id: "",
      name: "",
      role: "",
      hospitalName: "",
      clinicianID: "",
      owner: ""
    };
    if (currentSelected !== item && item !== emptyClinician) {
      setEmptyClinician(false);
      setClinicianSelected(item);
    } else if (item === emptyClinician) {
      setEmptyClinician(true);
    }
  }
  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
<<<<<<< HEAD
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ flex: 1, height: Dimensions.get("window").height }}>
          <RowSelectionWrapper
            title="Clinician"
            >
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <ItemSeparator />}
              ListHeaderComponent={() => <ItemSeparator />}
              ListFooterComponent={() => <ItemSeparator />}
              data = {filteredClinicians}
              renderItem={({ item }) => (
                <ClinicianContactRow 
                generalDetails={item}/>
              )
            }
              />
            </RowSelectionWrapper>
        </View>
        {!isEmptyClinician ? (
          
        )}
        <View style = {{ flex: 2, backgroundColor: colors.primaryWebBackgroundColor }}>
          <NoSelection subtitle="Select Clinician for more info" screenName={ScreenName.CLINICIAN}/>
        </View>
=======
      <View>
        <SearchBarComponent
          onUserInput={() => {
            null;
          }}
          onSearchClick={() => {
            null;
          }}
          placeholder="Search clinicians"
        />
        <Text> Clinicians </Text>
        <ClinicianContactRow generalDetails={mockClinician[0]} />
        <ClinicianShareRow generalDetails={mockClinician[0]} checked />
>>>>>>> origin/jy-patients-tab
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  title: {
    fontWeight: "bold",
    padding: "10@ms"
  },
  leftColumn: {
    backgroundColor: "white",
    height: "100%", 
    width:"30%"
  },
  clinicianTitle: {
    backgroundColor: lightColorScheme.primaryBarColor,
    padding: "0@ms"
  },
  clinicianTab: {
    flexDirection: "row"
  }
});
