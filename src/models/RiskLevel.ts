export enum RiskLevel {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
  UNASSIGNED = "Unassigned"
}
export interface IRiskLevelMap {
  HIGH: string;
  MEDIUM: string;
  LOW: string;
  UNASSIGNED: string;
}

/** Function to get risk level colors based on risk level  */
export const getRiskLevelColor: (
  colorsObject: IRiskLevelMap,
  riskLevel: RiskLevel
) => string = (colorsObject, riskLevel) => {
  const RiskLevelColorMap: { [key in RiskLevel]: string } = {
    [RiskLevel.HIGH]: colorsObject.HIGH,
    [RiskLevel.MEDIUM]: colorsObject.MEDIUM,
    [RiskLevel.LOW]: colorsObject.LOW,
    [RiskLevel.UNASSIGNED]: colorsObject.UNASSIGNED
  };
  const riskLevelColor =
    RiskLevelColorMap[riskLevel] || colorsObject.UNASSIGNED; // Fallback

  return riskLevelColor;
};
