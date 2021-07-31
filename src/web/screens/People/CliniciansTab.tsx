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
import { ContactTitle } from "./ContactTitle";


export const CliniciansTab: FC<WithSideTabsProps[ScreenName.CLINICIAN]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [filteredClinicians, setFilteredClinicians] = useState<ClinicianInfo[]>(mockClinician);


  const [selectedClinician] = useState(mockClinician[0]);


  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
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
                generalDetails={item} />
              )
            }
              />
            </RowSelectionWrapper>
            </View>
        <View style = {{ flex: 2, backgroundColor: colors.primaryWebBackgroundColor }}>
          <ContactTitle name={selectedClinician.name} isPatient={false}/>
        </View>
        
        </View>
    </ScreenWrapper>
  );
};

