import React, { FC, useState, createContext } from "react";
import { View, Dimensions, FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { RowSelectionTab } from "../RowSelectionTab";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ClinicianInfo } from "aws/API";
import { ClinicianDetails } from "./ClinicianDetails";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ms } from "react-native-size-matters";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import i18n from "util/language/i18n";

const Stack = createStackNavigator();

export const ClinicianContext = createContext({
  id: "",
  name: "",
  role: "",
  hospitalName: "",
  clinicianID: ""
});

export const CliniciansTab: FC<WithSideTabsProps[ScreenName.CLINICIANS]> =
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
      <ScreenWrapper>
        <View style={{ flexDirection: "row", height: "100%" }}>
          <View style={{ flex: 1, height: Dimensions.get("window").height }}>
            <RowSelectionTab title="Clinician" />
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
