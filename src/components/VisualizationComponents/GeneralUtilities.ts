import { Physical } from "aws/API";
import { LocalPhysicals, LocalReportVitals } from "rc_agents/model";
import {
  getNonNullItemsFromList,
  getWeekLocaleDateString
} from "util/utilityFunctions";
import {
  FullPhysicalsChartData,
  obtainFullPhysicalsChartData
} from "./PhysicalsCharts/PhysicalsChartUtilities";
import {
  FullVitalsChartData,
  getVitalsDataRecord,
  obtainFullVitalsChartData,
  VitalsDataRecord
} from "./VitalsCharts/VitalsChartUtilities";

// Returns FullVitalsChartData after filtering and processing for the last 7 days
export const getLast7DaysFullVitalsChartData: (
  localReportVitals: LocalReportVitals
) => FullVitalsChartData = (localReportVitals) => {
  // Get past 7 days
  const targetLocaleDateStrings = getWeekLocaleDateString();

  // Get vitals reports in those 7 days
  const filteredVitals: LocalReportVitals = {};
  targetLocaleDateStrings.forEach((date) => {
    filteredVitals[date] = localReportVitals[date] || [];
  });

  // Get vitals data records (min, max, average) in those 7 days
  const vitalsDataRecordList: VitalsDataRecord[] = [];
  Object.keys(filteredVitals).forEach((date) => {
    const vitalsReportList = filteredVitals[date];
    if (vitalsReportList) {
      const dataRecord = getVitalsDataRecord({
        vitalsList: vitalsReportList,
        localeDateString: date
      });
      if (dataRecord) {
        vitalsDataRecordList.push(dataRecord);
      }
    }
  });

  // Sort vitals data records by ascending date
  vitalsDataRecordList.sort((a, b) => a.date.valueOf() - b.date.valueOf());

  // Return full vitals chart data
  return obtainFullVitalsChartData(vitalsDataRecordList);
};

// Returns FullPhysicalsChartData after filtering and processing for the last 7 days
export const getLast7DaysFullPhysicalsChartData: (
  localPhysicals: LocalPhysicals
) => FullPhysicalsChartData = (localPhysicals) => {
  // Get past 7 days
  const targetLocaleDateStrings = getWeekLocaleDateString();

  // Get physicals in those 7 days
  const tempLocalPhysicals: LocalPhysicals = {};
  targetLocaleDateStrings.forEach((date) => {
    tempLocalPhysicals[date] = localPhysicals[date];
  });

  // Convert into list of physicals and sort by ascending date
  const tempPhysicals = getNonNullItemsFromList<Physical | undefined>(
    Object.values(tempLocalPhysicals)
  );
  tempPhysicals.sort(
    (a, b) => new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf()
  );

  // Return full physicals chart data
  return obtainFullPhysicalsChartData(tempPhysicals);
};
