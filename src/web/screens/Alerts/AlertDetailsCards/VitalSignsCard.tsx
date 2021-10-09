import React, { FC } from "react";
import i18n from "util/language/i18n";
import { ReportVitals } from "aws/API";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";
import { getLocalDateTime } from "util/utilityFunctions";

interface VitalSignsCardProps {
  vitalsReport?: ReportVitals | null;
}

export const LeftVitalSignsCard: FC<VitalSignsCardProps> = ({
  vitalsReport
}) => {
  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.AlertVitals.Vitals")}
      iconName="heart-pulse"
    >
      <BaseDetailsContent
        title={i18n.t("Alerts.AlertVitals.BPDi")}
        content={vitalsReport?.BPDi || "-"}
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.AlertVitals.BPSys")}
        content={vitalsReport?.BPSys || "-"}
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.AlertVitals.FluidIntake")}
        content={vitalsReport?.FluidIntake || "-"}
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.AlertVitals.NoSteps")}
        content={vitalsReport?.NoSteps || "-"}
      />
    </BaseDetailsCard>
  );
};

export const RightVitalSignsCard: FC<VitalSignsCardProps> = ({
  vitalsReport
}) => {
  return (
    <BaseDetailsCard cardTitle="">
      <BaseDetailsContent
        title={i18n.t("Alerts.AlertVitals.OxygenSat")}
        content={vitalsReport?.OxySat || "-"}
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.AlertVitals.Weight")}
        content={vitalsReport?.Weight || "-"}
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.AlertVitals.HeartRate")}
        content="89" // TODO: Remove hardcoded value
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.AlertVitals.DateTime")}
        content={
          vitalsReport?.DateTime ? getLocalDateTime(vitalsReport.DateTime) : "-"
        }
      />
    </BaseDetailsCard>
  );
};
