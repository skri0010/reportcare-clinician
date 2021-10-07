import React, { FC } from "react";
import { FlatList, View } from "react-native";
import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import i18n from "util/language/i18n";
import { RootState, select, store } from "util/useRedux";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { setClinicianSelected } from "ic-redux/actions/agents/actionCreator";

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

  return (
    <View
      style={{
        flex: flex,
        backgroundColor: colors.primaryContrastTextColor
      }}
    >
      {/* Search bar*/}
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        containerStyle={{
          backgroundColor: colors.primaryContrastTextColor
        }}
        placeholder={i18n.t("Clinicians.SearchBarPlaceholder")}
      />
      {fetchingClinicians ? (
        // Show loading indicator if fetching clinicians
        <LoadingIndicator flex={1} />
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
  );
};
