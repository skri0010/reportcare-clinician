export const displayPlaceholder = "-";
export const emptyValuePlaceholder = "";

export type PossibleNumber = number | null | undefined;
export type PossibleString = string | null | undefined;

export const SYNC_TIMEOUT_DURATION = 5000;

export enum Unit {
  BLOOD_PRESSURE = "mmHg",
  DISTANCE_METRES = "m",
  HUMIDITY = "g/kg",
  HEART_RATE = "bpm",
  OXYGEN_SATURATION = "%",
  WEIGHT = "kg",
  FLUID = "ml",
  SPEED_METRES_PER_SECOND = "m/s",
  DOSAGE = "mg",
  DURATION_MINUTES = "min",
  TEMPERATURE = "\u00B0C"
}
