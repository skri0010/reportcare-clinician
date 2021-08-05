import { IRiskLevelMap } from "models/RiskLevel";

export const riskLevelBackgroundColors: IRiskLevelMap = {
  HIGH: "#ffb9b9",
  MEDIUM: "#ffefcf",
  LOW: "#e3ffee",
  UNASSIGNED: "#f5f5f5"
};

export const riskLevelBorderColors: IRiskLevelMap = {
  HIGH: "#ff0000",
  MEDIUM: "#ffbb36",
  LOW: "#00c64f",
  UNASSIGNED: "#000000"
};

export const riskLevelSelectedBackgroundColors: IRiskLevelMap = {
  HIGH: "#ed6464",
  MEDIUM: "#ebd860",
  LOW: "#81d488",
  UNASSIGNED: "#d4d4d4"
};
