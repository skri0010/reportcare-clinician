import { ReportSymptom } from "aws/API";
import React, { FC } from "react";
import i18n from "util/language/i18n";
import { getLocalDateTime } from "util/utilityFunctions";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";

interface SymptomCardProps {
  symptomReport?: ReportSymptom | null;
  activity?: string | null;
}

export const SymptomCard: FC<SymptomCardProps> = ({
  symptomReport,
  activity
}) => {
  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.AlertSymptom.Symptoms")}
      iconName="clipboard-alert-outline"
    >
      {symptomReport && activity ? (
        <>
          <BaseDetailsContent
            title={i18n.t("Alerts.AlertSymptom.Symptom")}
            content={symptomReport?.Name || "-"}
          />
          <BaseDetailsContent
            title={i18n.t("Alerts.AlertSymptom.Activity")}
            content={activity || "-"}
          />
          <BaseDetailsContent
            title={i18n.t("Alerts.AlertSymptom.Severity")}
            content={symptomReport?.Severity || "-"}
          />
          <BaseDetailsContent
            title={i18n.t("Alerts.AlertSymptom.DateTime")}
            content={
              symptomReport?.DateTime
                ? getLocalDateTime(symptomReport.DateTime)
                : "-"
            }
          />
        </>
      ) : (
        <NoListItemMessage
          screenMessage={i18n.t("Alerts.AlertSymptom.NoSymptomReport")}
        />
      )}
    </BaseDetailsCard>
  );
};
