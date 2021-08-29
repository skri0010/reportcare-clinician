import React, { FC, useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { WeightChartCard } from "./PatientParameterComponents/WeightChartCard";
import { DiastolicBPChartCard } from "./PatientParameterComponents/DiastolicBPChartCard";
import { OxygenSaturationParameterCard } from "./PatientParameterComponents/OxygenSaturationChartCard";
import { SystolicBPChartCard } from "./PatientParameterComponents/SystolicBPChartCard";
import { PatientDetailsTabProps } from "web/navigation/types";
import { PatientDetails } from "rc_agents/model";
import { ReportVitals } from "aws/API";
import { getLatestVitalsReport } from "util/utilityFunctions";

interface PatientParametersProps
  extends PatientDetailsTabProps.ParametersTabProps {
  details: PatientDetails;
}

export const PatientParameters: FC<PatientParametersProps> = ({ details }) => {
  const cardMaxHeight = Math.max(
    ms(200),
    Dimensions.get("window").height * 0.8
  );
  const { vitalsReports } = details;

  const [vitals, setVitals] = useState<ReportVitals[] | null>(null);

  useEffect(() => {
    if (vitalsReports) {
      const tempVitals: ReportVitals[] = [];
      // Keys are dates
      const dates = Object.keys(vitalsReports).map((key) => new Date(key));
      dates.sort((a, b) => {
        // Sort dates by ascending order
        return a.valueOf() - b.valueOf();
      });
      dates.forEach((date) => {
        // Get the latest vitals report for each date
        const dateStr = date.toLocaleDateString();
        const reportsOnDate = vitalsReports[dateStr];
        if (reportsOnDate) {
          const latestVitalsReport = getLatestVitalsReport(reportsOnDate);
          if (latestVitalsReport) {
            // Push to array
            tempVitals.push(latestVitalsReport);
          }
        }
      });
      if (tempVitals.length > 0) {
        setVitals(tempVitals);
      }
    }
  }, [vitalsReports]);

  return (
    <ScreenWrapper padding>
      {vitals ? (
        <>
          <View style={styles.container}>
            {/* Systolic Blood Graph */}
            <SystolicBPChartCard vitals={vitals} maxHeight={cardMaxHeight} />
            {/* Diastolic Blood Graph */}
            <DiastolicBPChartCard
              patientId={details.patientInfo.patientID}
              maxHeight={cardMaxHeight}
            />
          </View>
          <View style={styles.container}>
            {/* Oxygen Saturation graph */}
            <OxygenSaturationParameterCard
              patientId={details.patientInfo.patientID}
              maxHeight={cardMaxHeight}
            />
            {/* Weight Graph */}
            <WeightChartCard
              patientId={details.patientInfo.patientID}
              maxHeight={cardMaxHeight}
            />
          </View>
        </>
      ) : null}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
