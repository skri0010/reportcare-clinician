import React, { FC, useState, useEffect } from "react";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { PatientDetailsTabProps } from "web/navigation/types";
import { PatientDetails } from "rc_agents/model";
import { FullVitalsChartData } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { mockLocalReportVitals } from "mock/mockVitals";
import { mockLocalPhysical } from "mock/mockPhysicals";
import { FullPhysicalsChartData } from "components/VisualizationComponents/PhysicalsCharts/PhysicalsChartUtilities";
import {
  getLast7DaysFullPhysicalsChartData,
  getLast7DaysFullVitalsChartData
} from "components/VisualizationComponents/GeneralUtilities";
import { VitalsCollapsible } from "./PatientParameterComponents/VitalsCollapsible";
import { PhysicalsCollapsible } from "./PatientParameterComponents/PhysicalsCollapsible";

interface PatientParametersProps
  extends PatientDetailsTabProps.ParametersTabProps {
  details: PatientDetails;
}

export const PatientParameters: FC<PatientParametersProps> = () => {
  // FUTURE-TODO: Allow week selection to view parameters
  // TODO: Uncomment following line and remove line with mock local report vitals and mock physicals
  // const { vitalsReports, physicals } = details;
  const vitalsReports = mockLocalReportVitals;
  const physicals = mockLocalPhysical;

  const [fullVitalsChartData, setFullVitalsChartData] =
    useState<FullVitalsChartData | null>(null);
  const [fullPhysicalsChartData, setFullPhysicalsChartData] =
    useState<FullPhysicalsChartData | null>(null);

  // Update state for vitals reports and physicals
  useEffect(() => {
    // Set full vitals chart data for the last 7 days
    if (vitalsReports) {
      setFullVitalsChartData(getLast7DaysFullVitalsChartData(vitalsReports));
    }

    // Set full physicals chart data for the last 7 days
    if (physicals) {
      setFullPhysicalsChartData(getLast7DaysFullPhysicalsChartData(physicals));
    }
  }, [vitalsReports, physicals]);

  return (
    <ScreenWrapper padding>
      {fullVitalsChartData ? (
        // Vitals cards
        <VitalsCollapsible fullVitalsChartData={fullVitalsChartData} />
      ) : null}
      {fullPhysicalsChartData ? (
        // Physicals cards
        <PhysicalsCollapsible fullPhysicalsChartData={fullPhysicalsChartData} />
      ) : null}
    </ScreenWrapper>
  );
};
