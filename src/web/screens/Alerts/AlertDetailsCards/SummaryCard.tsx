import { H5 } from "components/Text";
import { AlertInfo } from "rc_agents/model";
import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { getLocalDateTime } from "util/utilityFunctions";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";

interface SummaryCardProps {
  alertInfo?: AlertInfo;
}

export const SummaryCard: FC<SummaryCardProps> = ({ alertInfo }) => {
  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Patient_History.AlertSummaryCard.AlertSummary")}
    >
      <H5
        text={alertInfo?.summary || "-"}
        style={{
          paddingLeft: ms(5),
          paddingBottom: ms(5)
        }}
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.RiskLevel")}
        content={alertInfo?.riskLevel || "-"}
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.TriageValue")}
        content={alertInfo?.triageValue || "-"}
      />
      <BaseDetailsContent
        title={i18n.t("Alerts.DateTime")}
        content={
          alertInfo?.dateTime ? getLocalDateTime(alertInfo.dateTime) : "-"
        }
      />
    </BaseDetailsCard>
  );
};
