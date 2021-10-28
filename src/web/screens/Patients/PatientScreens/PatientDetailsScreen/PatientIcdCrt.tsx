import { PatientDetails } from "rc_agents/model";
import React, { FC } from "react";
import { View } from "react-native";
import { PatientDetailsTabProps } from "web/navigation/types";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { IcdCrtCard } from "./PatientIcdCrtComponents/IcdCrtCard";
import { ScaledSheet } from "react-native-size-matters";
import { AgentTrigger } from "rc_agents/trigger";
import { isMobile } from "react-device-detect";

interface PatientICDCRTProps extends PatientDetailsTabProps.ICDCRTTabProps {
  details: PatientDetails;
  setAddIcdCrtRecord: (state: boolean) => void; // add ICD/CRT record modal visibility
}

export const PatientICDCRT: FC<PatientICDCRTProps> = ({
  details,
  setAddIcdCrtRecord
}) => {
  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        <View style={styles.containerItem}>
          <IcdCrtCard
            icdCrtRecords={details.icdCrtRecords}
            onAddPress={() => setAddIcdCrtRecord(true)}
            onViewIcdCrtRecord={AgentTrigger.triggerRetrieveIcdCrtRecordContent}
          />
        </View>
        {/* Filler container item */}
        {isMobile ? null : <View style={styles.containerItem} />}
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row"
  },
  containerItem: {
    flex: 1
  }
});
