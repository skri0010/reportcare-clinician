import React from "react";
import { TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import { PersonRowGeneralDetails } from "models/PersonRowDetails";

export interface PatientDetailsRowProps {
  generalDetails: PersonRowGeneralDetails;
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
        riskLevel={generalDetails.riskLevel}
      />
    </TouchableOpacity>
  );
};
