import React, { FC } from "react";
import i18n from "util/language/i18n";
import { ReportVitals } from "aws/API";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";
import { getLocalDateTime } from "util/utilityFunctions";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";

interface VitalSignsCardProps {
  vitalsReport?: ReportVitals | null;
}

export const VitalSignsCard: FC<VitalSignsCardProps> = ({ vitalsReport }) => {
  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.AlertVitals.Vitals")}
      iconName="heart-pulse"
    >
      {vitalsReport ? (
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.FluidIntake")}
                content={
                  vitalsReport.fluidIntakeInMl
                    ? `${vitalsReport.fluidIntakeInMl} ${i18n.t(
                        "Parameter_Graphs.FluidUnit"
                      )}`
                    : "-"
                }
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.BPDi")}
                content={
                  vitalsReport.diastolicBloodPressure
                    ? `${vitalsReport.diastolicBloodPressure} ${i18n.t(
                        "Parameter_Graphs.BPUnit"
                      )}`
                    : "-"
                }
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.BPSys")}
                content={
                  vitalsReport.systolicBloodPressure
                    ? `${vitalsReport.systolicBloodPressure} ${i18n.t(
                        "Parameter_Graphs.BPUnit"
                      )}`
                    : "-"
                }
              />
            </View>
            <View style={styles.columnContainer}>
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.OxygenSat")}
                content={
                  vitalsReport.oxygenSaturation
                    ? `${vitalsReport.oxygenSaturation} ${i18n.t(
                        "Parameter_Graphs.OxygenSaturationUnit"
                      )}`
                    : "-"
                }
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.Weight")}
                content={
                  vitalsReport.weight
                    ? `${vitalsReport.weight} ${i18n.t(
                        "Parameter_Graphs.WeightUnit"
                      )}`
                    : "-"
                }
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.HeartRate")}
                content={`89 ${i18n.t("Alerts.AlertVitals.HeartRateUnit")}`} // TODO: Remove hardcoded value
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.DateTime")}
                content={
                  vitalsReport.dateTime
                    ? getLocalDateTime(vitalsReport.dateTime)
                    : "-"
                }
              />
            </View>
          </View>
        </View>
      ) : (
        <NoListItemMessage
          screenMessage={i18n.t("Alerts.AlertVitals.NoVitalsReport")}
        />
      )}
    </BaseDetailsCard>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "column" },
  rowContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  columnContainer: {
    width: "50%"
  }
});
