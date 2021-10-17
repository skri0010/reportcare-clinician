import { AlertInfo } from "rc_agents/model";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";

interface PatientBaselinesCardProps {
  alertInfo?: AlertInfo;
}

export const PatientBaselinesCard: FC<PatientBaselinesCardProps> = ({
  alertInfo
}) => {
  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.PatientBaselines.Baselines")}
      iconName="human"
    >
      <BaseDetailsContent
        title={i18n.t("Alerts.PatientBaselines.NYHAClass")}
        content={alertInfo?.NYHAClass || "-"}
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.PatientBaselines.Diagnosis")}
        content={alertInfo?.diagnosis || "-"}
      />
    </BaseDetailsCard>
  );
};
