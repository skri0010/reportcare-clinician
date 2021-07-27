import React, { FC, useState } from "react";
import { View, TextStyle, Dimensions } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { H4 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import { lightColorScheme } from "models/ColorScheme";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { ClinicianList } from "./ClinicianList";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { Row } from "antd";
import { ClinicianRowGeneralDetails } from "models/PersonRowDetails";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const CliniciansTab: FC<WithSideTabsProps[ScreenName.CLINICIAN]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [clinicianSelected, setClinicianSelected] = useState<ClinicianRowGeneralDetails>({
    id: "",
    name:"",
    occupation: "",
    location: ""
  });

  const [selectedChange, setSelectedChanged] = useState<boolean>(false);

  function onRowClick(clinician: ClinicianRowGeneralDetails){
    const currentSelected = clinicianSelected;
    const changed: boolean = false;
    const emptyClinician: ClinicianRowGeneralDetails = {
      id: "",
      name: "",
      occupation: "",
      location: ""
    };
    if (currentSelected !== clinician && clinician !== emptyClinician){
      setSelectedChanged(!changed);
      setClinicianSelected(clinician);
    }

  }

  const titleColor = { color: colors.primaryContrastTextColor } as TextStyle;
  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ flex: 1, height: Dimensions.get("window").height }}>
          <RowSelectionWrapper
            title="Clinician"
            />
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
