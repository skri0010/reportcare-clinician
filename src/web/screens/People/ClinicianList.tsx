import React, { FC } from "react";
import { View } from "react-native";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ScaledSheet } from "react-native-size-matters";


export const ClinicianList: FC = () => {
  return (
    <View style={[styles.searchBarWrapper]}>
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={() => {
          null;
        }}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
    searchBarWrapper: {
        padding: "5@ms"
    }
});
