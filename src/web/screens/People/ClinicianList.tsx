import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ClinicianRowGeneralDetails } from "models/PersonRowDetails";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { mockClinician } from "mock/mockClinicians";
import { WithSideTabsProps, ScreenName } from "..";




export const ClinicianList: FC = () => {
  const { colors } = select((state:RootState) => ({
    colors: state.settings.colors
  }));
  
  return (
    <View>
      <ClinicianContactRow generalDetails={mockClinician.generalDetails}/>
      <ClinicianShareRow generalDetails={mockClinician.generalDetails} checked={ false }/>
    </View>
  );
};

const styles = ScaledSheet.create({
    searchBarWrapper: {
        padding: "5@ms"
    }
});
