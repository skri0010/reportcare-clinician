import React from "react";
import { TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import { PatientInfo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";

export interface PatientDetailsRowProps {
  patient: PatientInfo;
  age: number;
  onRowPress?: () => void;
}

export const PatientDetailsRow: React.FC<PatientDetailsRowProps> = ({
  patient,
  age,
  onRowPress
}) => {
  const { name, NHYAclass, riskLevel } = patient;

  return (
    <TouchableOpacity onPress={onRowPress}>
      {/* TODO-JH: i18n translation */}
      <PatientRowBase
        title={name}
        subtitleOne={{
          label: "Class",
          value: `NHYA ${NHYAclass}`
        }}
        subtitleTwo={{
          label: "Age",
          value: age.toString()
        }}
        riskLevel={riskLevel as RiskLevel}
      />
    </TouchableOpacity>
  );
};
