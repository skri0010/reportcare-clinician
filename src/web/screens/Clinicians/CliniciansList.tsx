import React, { FC, useState } from "react";
import { FlatList, View } from "react-native";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import i18n from "util/language/i18n";
import { RootState, select, store } from "util/useRedux";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { setClinicianSelected } from "ic-redux/actions/agents/actionCreator";
import { ClinicianInfo } from "aws/API";
import Fuse from "fuse.js";

interface CliniciansListScreen {
  flex?: number;
}

export const CliniciansList: FC<CliniciansListScreen> = ({ flex = 1 }) => {
  const { colors, clinicians, fetchingClinicians } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      clinicians: state.agents.clinicianContacts,
      fetchingClinicians: state.agents.fetchingClinianContacts
    })
  );

  const [searching, setSearching] = useState<boolean>(false);
  const [searchedSubset, setSubset] = useState<ClinicianInfo[]>([]);

  return (
    <View
      style={{
        flex: flex,
        backgroundColor: colors.primaryContrastTextColor
      }}
    >
      {/* Search bar*/}
      {fetchingClinicians ? (
        // Show loading indicator if fetching clinicians
        <LoadingIndicator flex={1} />
      ) : clinicians ? (
        <View>
          <SearchBarComponent
            onUserInput={() => {
              null;
            }}
            onSearchClick={(searchString: string) => {
              if (searchString.length === 0) {
                setSearching(false);
              } else {
                const options = {
                  includeScore: true,
                  keys: ["name"]
                };
                const fuse = new Fuse(clinicians, options);

                const result = fuse.search(searchString);
                const searchResults: ClinicianInfo[] = [];
                result.forEach((item) => searchResults.push(item.item));
                setSearching(true);
                setSubset(searchResults);
              }
            }}
            containerStyle={{
              backgroundColor: colors.primaryContrastTextColor
            }}
            placeholder={i18n.t("Clinicians.SearchBarPlaceholder")}
          />
          {searching ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <ItemSeparator />}
              data={searchedSubset}
              renderItem={({ item }) => (
                <ClinicianContactRow
                  generalDetails={item}
                  onRowPress={() => {
                    store.dispatch(setClinicianSelected(item));
                  }}
                />
              )}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <ItemSeparator />}
              data={clinicians}
              renderItem={({ item }) => (
                <ClinicianContactRow
                  generalDetails={item}
                  onRowPress={() => {
                    store.dispatch(setClinicianSelected(item));
                  }}
                />
              )}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};
