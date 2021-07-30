import React from "react";
import { TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import { PatientInfo } from "aws/models";
import { RiskLevel } from "models/RiskLevel";

export interface PatientDetailsRowProps {
  generalDetails: PatientInfo;
  patientClass: string;
  age: number;
  onRowPress?: () => void;
}

export const PatientDetailsRow: React.FC<PatientDetailsRowProps> = ({
  generalDetails,
  patientClass,
  age,
  onRowPress
}) => {
  return (
    <TouchableOpacity onPress={onRowPress}>
      {/* TODO-JH: i18n translation */}
      <PatientRowBase
        title={generalDetails.name}
        subtitleOne={{
          label: "Class",
          value: patientClass
        }}
        subtitleTwo={{
          label: "Age",
          value: age.toString()
        }}
        // TODO: Clarify how this is decided and stored
        riskLevel={
          generalDetails.id === "1" ? RiskLevel.HIGH : RiskLevel.MEDIUM
        }
      />
    </TouchableOpacity>
  );
};
