import React, { FC, useState, createContext } from "react";
import { View, Dimensions, FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "web/navigation";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ClinicianInfo } from "aws/API";
import { ClinicianDetails } from "web/screens/Clinicians/ClinicianDetails";
import { NoSelectionScreen } from "web/screens/Shared/NoSelectionScreen";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import i18n from "util/language/i18n";
import { MainScreenProps } from "web/navigation/types";

export const ClinicianContext = createContext({
  id: "",
  name: "",
  role: "",
  hospitalName: "",
  clinicianID: ""
});

export const CliniciansScreen: FC<MainScreenProps[ScreenName.CLINICIANS]> =
  () => {
    const { colors } = select((state: RootState) => ({
      colors: state.settings.colors
    }));

    const [clinicianSelected, setClincianSelected] = useState<ClinicianInfo>({
      __typename: "ClinicianInfo",
      id: "",
      clinicianID: "",
      hospitalName: "",
      role: "",
      owner: "",
      name: "",
      createdAt: "",
      updatedAt: "",
      _lastChangedAt: 1627604201979,
      _version: 1
    });

    const [isEmptyClinician, setEmptyClincian] = useState(true);

    function onRowClick(item: ClinicianInfo) {
      setClincianSelected(item);
      setEmptyClincian(false);
    }

    // JH-TODO: Replace placeholder with i18n
    return (
      <ScreenWrapper fixed>
        <View style={{ flexDirection: "row", height: "100%" }}>
          <View
            style={{
              flex: 1,
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
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <ItemSeparator />}
              data={mockClinician}
              renderItem={({ item }) => (
                <ClinicianContactRow
                  generalDetails={item}
                  onRowPress={() => onRowClick(item)}
                />
              )}
            />
          </View>
          <View
            style={{
              flex: 2,
              backgroundColor: colors.primaryWebBackgroundColor
            }}
          >
            {!isEmptyClinician ? (
              <ClinicianDetails clinicianDetails={clinicianSelected} />
            ) : (
              <NoSelectionScreen
                screenName={ScreenName.CLINICIANS}
                subtitle="Choose Clinician to view more info"
              />
            )}
          </View>
        </View>
      </ScreenWrapper>
    );
  };
