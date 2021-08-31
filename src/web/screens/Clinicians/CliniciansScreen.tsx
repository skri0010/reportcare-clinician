import React, { FC, useEffect } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "web/navigation";
import { ClinicianDetails } from "web/screens/Clinicians/ClinicianDetails";
import { MainScreenProps } from "web/navigation/types";
import { AgentTrigger } from "rc_agents/trigger";
import { AdaptiveTwoScreenWrapper } from "../AdaptiveTwoScreenWrapper";
import { CliniciansList } from "./CliniciansList";
import { ScaledSheet } from "react-native-size-matters";

export const CliniciansScreen: FC<MainScreenProps[ScreenName.CLINICIANS]> =
  () => {
    const { colors } = select((state: RootState) => ({
      colors: state.settings.colors
    }));

    /**
     * Trigger agent to fetch clinician contacts
     */
    useEffect(() => {
      AgentTrigger.triggerRetrieveClinicianContacts();
    }, []);

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
                <ClinicianDetails />
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
