import { ReportSymptom } from "aws/API";
import React, { FC } from "react";
import { Dimensions, ScrollView } from "react-native";
import { ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { getLocalDateTime } from "util/utilityFunctions";
import { BaseDetailsCard } from "../BaseDetailsCard";
import { DataTable } from "react-native-paper";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";
import { H5 } from "components/Text";
import { select, RootState } from "util/useRedux";

interface SymptomTableHeaderProps {
  header: string;
}

const SymptomTableHeader: FC<SymptomTableHeaderProps> = ({ header }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <DataTable.Title>
      <H5
        text={header}
        style={{ color: colors.primaryTextColor, fontWeight: "600" }}
      />
    </DataTable.Title>
  );
};

interface SymptomTableCellProps {
  cellContent: string;
}

const SymptomTableCell: FC<SymptomTableCellProps> = ({ cellContent }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <DataTable.Cell>
      <H5
        text={cellContent}
        style={{
          color: colors.primaryTextColor
        }}
      />
    </DataTable.Cell>
  );
};

interface SymptomTableRowProps {
  report: ReportSymptom;
}

const SymptomTableRow: FC<SymptomTableRowProps> = ({ report }) => {
  return (
    <DataTable.Row>
      <SymptomTableCell cellContent={report.Name} />
      <SymptomTableCell cellContent={report.ActivityInfo?.Actname || "-"} />
      <SymptomTableCell cellContent={report.Severity} />
      <SymptomTableCell cellContent={getLocalDateTime(report.dateTime)} />
    </DataTable.Row>
  );
};

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
        <ScrollView
          style={{
            flex: 1
          }}
          showsVerticalScrollIndicator={false}
        >
          <DataTable>
            <DataTable.Header>
              <SymptomTableHeader
                header={i18n.t("Alerts.AlertSymptom.Symptom")}
              />
              <SymptomTableHeader
                header={i18n.t("Alerts.AlertSymptom.Activity")}
              />
              <SymptomTableHeader
                header={i18n.t("Alerts.AlertSymptom.Severity")}
              />
              <SymptomTableHeader
                header={i18n.t("Alerts.AlertSymptom.DateTime")}
              />
            </DataTable.Header>
            {symptomReports.map((report) => {
              return <SymptomTableRow report={report} key={report.id} />;
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
