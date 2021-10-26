import React from "react";
import { TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import { PatientInfo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";
import i18n from "util/language/i18n";
import { getAge } from "util/utilityFunctions";
import { RootState, select } from "util/useRedux";

export interface PatientDetailsRowProps {
  patient: PatientInfo;
  selected?: boolean;
  onRowPress?: (patient: PatientInfo) => void;
}

export const PatientDetailsRow: React.FC<PatientDetailsRowProps> = ({
  patient,
  selected = false,
  onRowPress
}) => {
  const { name, NHYAclass, riskLevel } = patient;

  const { fetchingPatientDetails, fetchingPatientAlertHistory } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      fetchingPatientDetails: state.patients.fetchingPatientDetails,
      fetchingPatientAlertHistory: state.patients.fetchingPatientAlertHistory
    })
  );

  return (
    <TouchableOpacity
      style={
        { opacity: selected ? 0.5 : 1 } // indicate selected
      }
      onPress={onRowPress && !selected ? () => onRowPress(patient) : undefined}
      disabled={fetchingPatientDetails || fetchingPatientAlertHistory} // disable clicking when fetch is ongoing
    >
      <PatientRowBase
        title={name}
        subtitleOne={{
          label: i18n.t("Patients.PatientsList.Class"),
          value: `NHYA ${NHYAclass}`
        }}
        subtitleTwo={{
          label: i18n.t("Patients.PatientsList.Age"),
          value: getAge(patient.birthDate)
        }}
        riskLevel={riskLevel as RiskLevel}
      />
    </TouchableOpacity>
  );
};
