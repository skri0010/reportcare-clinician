import { IcdCrtRecord } from "aws/API";
import { PatientDetails } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";
import React, { FC, useEffect } from "react";
import { View } from "react-native";
import { PatientDetailsTabProps } from "web/navigation/types";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { IcdCrtCard } from "./PatientIcdCrtComponents/IcdCrtCard";

interface PatientICDCRTProps extends PatientDetailsTabProps.ICDCRTTabProps {
  details: PatientDetails;
  setAddIcdCrtRecord: (state: boolean) => void; // add ICD/CRT record modal visibility
  onViewIcdCrtRecord: (icdCrtRecord: IcdCrtRecord) => void; // when content of ICD/CRT content is to be shown
}

export const PatientICDCRT: FC<PatientICDCRTProps> = ({
  details,
  setAddIcdCrtRecord,
  onViewIcdCrtRecord
}) => {
  // Triggers retrieval of patient's ICD/CRT records
  useEffect(() => {
    AgentTrigger.triggerRetrieveIcdCrtRecords(details.patientInfo.patientID);
  }, [details.patientInfo.patientID]);

  return (
    <ScreenWrapper padding>
      <View>
        <IcdCrtCard
          onAddPress={() => setAddIcdCrtRecord(true)}
          onViewIcdCrtRecord={onViewIcdCrtRecord}
        />
      </View>
    </ScreenWrapper>
  );
};