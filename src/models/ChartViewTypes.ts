export enum ChartViewTypes {
  ALL = "All",
  MIN = "Min",
  MAX = "Max",
  AVERAGE = "Avg"
}

export type ChartFilter = { [chartFilters in ChartViewTypes]: boolean };
