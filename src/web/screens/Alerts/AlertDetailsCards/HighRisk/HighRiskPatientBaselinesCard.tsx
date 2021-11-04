import { PatientInfo } from "aws/API";
import React, { FC } from "react";
import { displayPlaceholder, Unit } from "util/const";
import i18n from "util/language/i18n";
import { BaseDetailsCard, BaseDetailsContent } from "../BaseDetailsCard";

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
          content={patientInfo?.NYHAClass || displayPlaceholder}
        />
        <BaseDetailsContent
          title={i18n.t("Alerts.PatientBaselines.Diagnosis")}
          content={patientInfo?.diagnosisInfo || displayPlaceholder}
        />
        <BaseDetailsContent
          title={i18n.t("Alerts.PatientBaselines.FluidIntakeGoal")}
          content={`${patientInfo?.fluidIntakeGoalInMl || displayPlaceholder} ${
            Unit.FLUID
          }`}
        />
        <BaseDetailsContent
          title={i18n.t("Alerts.PatientBaselines.TargetSteps")}
          content={`${patientInfo?.targetSteps || displayPlaceholder} ${i18n.t(
            "Parameter_Graphs.StepsUnit"
          )}`}
        />
        <BaseDetailsContent
          title={i18n.t("Alerts.PatientBaselines.TargetWeight")}
          content={`${patientInfo?.targetWeight || displayPlaceholder} ${
            Unit.WEIGHT
          }`}
        />
      </BaseDetailsCard>
    );
  };
