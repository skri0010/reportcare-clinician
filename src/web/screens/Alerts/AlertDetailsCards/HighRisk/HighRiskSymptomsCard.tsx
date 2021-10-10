import { ReportSymptom } from "aws/API";
import React, { FC } from "react";
import { Dimensions, ScrollView } from "react-native";
import { ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { getLocalDateTime } from "util/utilityFunctions";
import { BaseDetailsCard } from "../BaseDetailsCard";
import { DataTable } from "react-native-paper";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";

interface HighRiskSymptomsCardProps {
  symptomReports?: ReportSymptom[] | null;
}

export const HighRiskSymptomsCard: FC<HighRiskSymptomsCardProps> = ({
  symptomReports
}) => {
  const maxCardHeight = Math.max(
    ms(150),
    Dimensions.get("window").height * 0.5
  );

  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.AlertSymptom.Symptoms")}
      iconName="clipboard-alert-outline"
      maxHeight={maxCardHeight}
    >
      {symptomReports ? (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                {i18n.t("Alerts.AlertSymptom.Symptom")}
              </DataTable.Title>
              <DataTable.Title>
                {i18n.t("Alerts.AlertSymptom.Activity")}
              </DataTable.Title>
              <DataTable.Title>
                {i18n.t("Alerts.AlertSymptom.Severity")}
              </DataTable.Title>
              <DataTable.Title>
                {i18n.t("Alerts.AlertSymptom.DateTime")}
              </DataTable.Title>
            </DataTable.Header>
            {symptomReports.map((report) => {
              return (
                <>
                  <DataTable.Row>
                    <DataTable.Cell>{report.Name}</DataTable.Cell>
                    <DataTable.Cell>
                      {report.ActivityInfo?.Actname || "-"}
                    </DataTable.Cell>
                    <DataTable.Cell>{report.Severity}</DataTable.Cell>
                    <DataTable.Cell>
                      {getLocalDateTime(report.DateTime)}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{report.Name}</DataTable.Cell>
                    <DataTable.Cell>
                      {report.ActivityInfo?.Actname || "-"}
                    </DataTable.Cell>
                    <DataTable.Cell>{report.Severity}</DataTable.Cell>
                    <DataTable.Cell>
                      {getLocalDateTime(report.DateTime)}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{report.Name}</DataTable.Cell>
                    <DataTable.Cell>
                      {report.ActivityInfo?.Actname || "-"}
                    </DataTable.Cell>
                    <DataTable.Cell>{report.Severity}</DataTable.Cell>
                    <DataTable.Cell>
                      {getLocalDateTime(report.DateTime)}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{report.Name}</DataTable.Cell>
                    <DataTable.Cell>
                      {report.ActivityInfo?.Actname || "-"}
                    </DataTable.Cell>
                    <DataTable.Cell>{report.Severity}</DataTable.Cell>
                    <DataTable.Cell>
                      {getLocalDateTime(report.DateTime)}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{report.Name}</DataTable.Cell>
                    <DataTable.Cell>
                      {report.ActivityInfo?.Actname || "-"}
                    </DataTable.Cell>
                    <DataTable.Cell>{report.Severity}</DataTable.Cell>
                    <DataTable.Cell>
                      {getLocalDateTime(report.DateTime)}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{report.Name}</DataTable.Cell>
                    <DataTable.Cell>
                      {report.ActivityInfo?.Actname || "-"}
                    </DataTable.Cell>
                    <DataTable.Cell>{report.Severity}</DataTable.Cell>
                    <DataTable.Cell>
                      {getLocalDateTime(report.DateTime)}
                    </DataTable.Cell>
                  </DataTable.Row>
                </>
              );
            })}
          </DataTable>
        </ScrollView>
      ) : (
        <NoListItemMessage
          screenMessage={i18n.t("Alerts.AlertSymptom.NoSymptomReport")}
        />
      )}
    </BaseDetailsCard>
  );
};
