import { PatientInfo } from "aws/API";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";

interface HighRiskPatientBaselinesCardProps {
  patientInfo?: PatientInfo;
}

export const HighRiskPatientBaselinesCard: FC<HighRiskPatientBaselinesCardProps> =
  ({ patientInfo }) => {
    return (
      <BaseDetailsCard
        cardTitle={i18n.t("Alerts.PatientBaselines.Baselines")}
        iconName="human"
      >
        <BaseDetailsContent
          title={i18n.t("Alerts.PatientBaselines.NYHAClass")}
          content={patientInfo?.NHYAclass || "-"}
        />
        <BaseDetailsContent
          title={i18n.t("Alerts.PatientBaselines.Diagnosis")}
          content={patientInfo?.diagnosisInfo || "-"}
        />
        <BaseDetailsContent
          title={i18n.t("Alerts.PatientBaselines.FluidIntakeGoal")}
          content={
            patientInfo?.fluidIntakeGoal
              ? `${patientInfo.fluidIntakeGoal} ${i18n.t(
                  "Parameter_Graphs.FluidUnit"
                )}`
              : "-"
          }
        />
        <BaseDetailsContent
          title={i18n.t("Alerts.PatientBaselines.TargetActivity")}
          content={
            patientInfo?.targetActivity
              ? `${patientInfo.targetActivity} ${i18n.t(
                  "Parameter_Graphs.StepsUnit"
                )}`
              : "-"
          }
        />
        <BaseDetailsContent
          title={i18n.t("Alerts.PatientBaselines.TargetWeight")}
          content={
            patientInfo?.targetWeight
              ? `${patientInfo.targetWeight} ${i18n.t(
                  "Parameter_Graphs.WeightUnit"
                )}`
              : "-"
          }
        />
      </BaseDetailsCard>
    );
  };
