import { IcdCrtRecord } from "aws/API";
import { PatientDetails } from "rc_agents/model";
import React, { FC } from "react";
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
  return (
    <ScreenWrapper padding>
      <View>
        <IcdCrtCard
          icdCrtRecords={details.icdCrtRecords}
          onAddPress={() => setAddIcdCrtRecord(true)}
          onViewIcdCrtRecord={onViewIcdCrtRecord}
        />
      </View>
    </ScreenWrapper>
  );
};
