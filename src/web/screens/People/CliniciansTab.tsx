import React, { FC, useState } from "react";
import { View, Dimensions, FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScaledSheet } from "react-native-size-matters";
import { lightColorScheme } from "models/ColorScheme";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { NoSelection } from "./NoSelection";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ClinicianInfo } from "aws/models";


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
                generalDetails={item}/>
              )
            }
              />
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <ItemSeparator />}
              ListHeaderComponent={() => <ItemSeparator />}
              ListFooterComponent={() => <ItemSeparator />}
              data = {filteredClinicians}
              renderItem={({ item }) => (
                <ClinicianShareRow 
                generalDetails={item} checked/>
              )
            }
              />
            </RowSelectionWrapper>
        </View>
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
