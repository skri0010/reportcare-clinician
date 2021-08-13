import React, { FC, useState, createContext } from "react";
import { View, FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ClinicianInfo } from "aws/models";
import { ClinicianDetails } from "./ClinicianDetails";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";

export const ClinicianContext = createContext({
  id: "",
  name: "",
  role: "",
  hospitalName: "",
  clinicianID: ""
});

export const CliniciansTab: FC<WithSideTabsProps[ScreenName.CLINICIAN]> =
  () => {
    const { colors } = select((state: RootState) => ({
      colors: state.settings.colors
    }));

    const [clinicianSelected, setClincianSelected] = useState<ClinicianInfo>({
      id: "",
      clinicianID: "",
      hospitalName: "",
      role: "",
      owner: "",
      name: ""
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
          <View style={{ flex: 1 }}>
            <RowSelectionWrapper title="Clinician" />
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
                screenName={ScreenName.CLINICIAN}
                subtitle="Choose Clinician to view more info"
              />
            )}
          </View>
        </View>
      </ScreenWrapper>
    );
  };
