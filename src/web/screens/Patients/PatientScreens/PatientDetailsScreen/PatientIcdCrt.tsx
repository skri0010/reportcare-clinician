import { PatientDetails } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";
import React, { FC, useEffect } from "react";
import { View } from "react-native";
import { PatientDetailsTabProps } from "web/navigation/types";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { IcdCrtCard } from "./PatientIcdCrtComponents/IcdCrtCard";
import { ScaledSheet } from "react-native-size-matters";

interface PatientICDCRTProps extends PatientDetailsTabProps.ICDCRTTabProps {
  details: PatientDetails;
  setAddIcdCrtRecord: (state: boolean) => void; // add ICD/CRT record modal visibility
}

export const PatientICDCRT: FC<PatientICDCRTProps> = ({
  details,
  setAddIcdCrtRecord
}) => {
  // Triggers retrieval of patient's ICD/CRT records
  useEffect(() => {
    AgentTrigger.triggerRetrieveIcdCrtRecords(details.patientInfo.patientID);
  }, [details.patientInfo.patientID]);

  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        <View style={styles.containerItem}>
          <IcdCrtCard
            onAddPress={() => setAddIcdCrtRecord(true)}
            onViewIcdCrtRecord={AgentTrigger.triggerRetrieveIcdCrtRecordContent}
          />
        </View>
        <View style={styles.containerItem} />
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
