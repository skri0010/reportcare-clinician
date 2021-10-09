import React, { FC, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import i18n from "util/language/i18n";
import { RootState, select, store } from "util/useRedux";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { setClinicianSelected } from "ic-redux/actions/agents/actionCreator";
import { ClinicianInfo } from "aws/API";
import Fuse from "fuse.js";
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";
import { NoListItemMessage } from "../Shared/NoListItemMessage";

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

  // Check if the search is being used
  const [searching, setSearching] = useState<boolean>(false);

  // Store results of fuzzy search
  const [searchedSubset, setSearchedSubset] = useState<ClinicianInfo[]>([]);

  const onSearchClick = (searchString: string) => {
    if (searchString.length === 0) {
      setSearching(false);
    } else if (clinicians) {
      const options = {
        includeScore: true,
        keys: ["name"]
      };
      const fuse = new Fuse(clinicians, options);
      const result = fuse.search(searchString);
      const searchResults: ClinicianInfo[] = [];
      result.forEach((item) => searchResults.push(item.item));
      setSearching(true);
      setSearchedSubset(searchResults);
    }
  };

  return (
    <View
      style={{
        flex: flex,
        backgroundColor: colors.primaryContrastTextColor
      }}
    >
      {/* Search bar*/}
      <SearchBarComponent
        onUserInput={(searchString) => onSearchClick(searchString)}
        onSearchClick={(searchString) => onSearchClick(searchString)}
        containerStyle={{
          backgroundColor: colors.primaryContrastTextColor
        }}
        placeholder={i18n.t("Clinicians.SearchBarPlaceholder")}
      />
      {fetchingClinicians ? (
        // Show loading indicator if fetching clinicians
        <LoadingIndicator flex={1} />
      ) : clinicians ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            ListEmptyComponent={() => (
              <NoItemsTextIndicator
                text={i18n.t("Clinicians.ClincianList.NoClinicianFound")}
              />
            )}
            ItemSeparatorComponent={() => <ItemSeparator />}
            data={searching ? searchedSubset : clinicians}
            renderItem={({ item }) => (
              <ClinicianContactRow
                generalDetails={item}
                onRowPress={() => {
                  store.dispatch(setClinicianSelected(item));
                }}
              />
            )}
          />
        </ScrollView>
      ) : (
        <NoListItemMessage
          screenMessage={i18n.t("Clinicians.ClincianList.NoClinicianFound")}
        />
      )}
    </View>
  );
};
