import React, { FC } from "react";
import i18n from "util/language/i18n";
import { ReportVitals } from "aws/API";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";
import { getLocalDateTime } from "util/utilityFunctions";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";
import { displayPlaceholder, Unit } from "util/const";

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
                content={`${
                  vitalsReport.fluidIntakeInMl || displayPlaceholder
                } ${Unit.FLUID}`}
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.BPDi")}
                content={`${
                  vitalsReport.diastolicBloodPressure || displayPlaceholder
                } ${Unit.BLOOD_PRESSURE}`}
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.BPSys")}
                content={`${
                  vitalsReport.systolicBloodPressure || displayPlaceholder
                } ${Unit.BLOOD_PRESSURE}`}
              />
            </View>
            <View style={styles.columnContainer}>
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.OxygenSat")}
                content={`${
                  vitalsReport.oxygenSaturation || displayPlaceholder
                } ${Unit.OXYGEN_SATURATION}`}
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.Weight")}
                content={`${vitalsReport.weight || displayPlaceholder} ${
                  Unit.WEIGHT
                }`}
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.HeartRate")}
                content={`89 ${Unit.HEART_RATE}`} // FUTURE-TODO: Remove hardcoded value
              />
              <BaseDetailsContent
                title={i18n.t("Alerts.AlertVitals.DateTime")}
                content={
                  getLocalDateTime(vitalsReport.dateTime) || displayPlaceholder
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
