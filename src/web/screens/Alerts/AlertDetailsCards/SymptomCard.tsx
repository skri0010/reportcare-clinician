import { ReportSymptom } from "aws/API";
import React, { FC } from "react";
import { displayPlaceholder } from "util/const";
import i18n from "util/language/i18n";
import { getLocalDateTime } from "util/utilityFunctions";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";

interface SymptomCardProps {
  symptomReport?: ReportSymptom | null;
}

export const SymptomCard: FC<SymptomCardProps> = ({ symptomReport }) => {
  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.AlertSymptom.Symptoms")}
      iconName="clipboard-alert-outline"
    >
      {symptomReport ? (
        <>
          <BaseDetailsContent
            title={i18n.t("Alerts.AlertSymptom.Symptom")}
            content={`${symptomReport.symptomName}` || displayPlaceholder}
          />
          <BaseDetailsContent
            title={i18n.t("Alerts.AlertSymptom.Activity")}
            content={`${symptomReport.activityInfo}` || displayPlaceholder}
          />
          <BaseDetailsContent
            title={i18n.t("Alerts.AlertSymptom.Severity")}
            content={`${symptomReport.severity}` || displayPlaceholder}
          />
          <BaseDetailsContent
            title={i18n.t("Alerts.AlertSymptom.DateTime")}
            content={
              symptomReport.dateTime
                ? getLocalDateTime(symptomReport.dateTime)
                : displayPlaceholder
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
