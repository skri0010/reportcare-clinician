export enum ChartViewTypes {
  ALL = "all",
  MIN = "min",
  MAX = "max",
  AVERAGE = "average"
}

export type ChartFilter = { [chartFilters in ChartViewTypes]: boolean };
