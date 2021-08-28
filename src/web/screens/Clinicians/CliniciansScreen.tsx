/* eslint-disable no-console */
import React, { FC, useState, createContext, useEffect } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "web/navigation";
import { ClinicianInfo } from "aws/API";
import { ClinicianDetails } from "web/screens/Clinicians/ClinicianDetails";
import { NoSelectionScreen } from "web/screens/Shared/NoSelectionScreen";
import { MainScreenProps } from "web/navigation/types";
import { AgentTrigger } from "rc_agents/trigger";
import { AdaptiveTwoScreenWrapper } from "../AdaptiveTwoScreenWrapper";
import { CliniciansList } from "./CliniciansList";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";

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

    /**
     * Trigger agent to fetch clinician contacts
     */
    useEffect(() => {
      console.log("ran");
      AgentTrigger.triggerRetrieveClinicianContacts();
    }, []);

    const [clinicianSelected] = useState<ClinicianInfo>({
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

    const [isEmptyClinician] = useState(true);

    return (
      <ScreenWrapper fixed>
        <View style={styles.container}>
          <AdaptiveTwoScreenWrapper
            LeftComponent={<CliniciansList />}
            RightComponent={
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
                    subtitle={i18n.t("Clinicians.NoSelection")}
                  />
                )}
              </View>
            }
          />
        </View>
      </ScreenWrapper>
    );
  };

const styles = ScaledSheet.create({
  container: { flexDirection: "row", height: "100%" },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  rowSelection: { flex: 1 }
});
