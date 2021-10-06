import {
  EventString,
  resolutionValues,
  Resolution,
  NumberObject,
  StringObject
} from "./types";

// All ID should match
export const validateID = (
  keyID: EventString,
  newID: EventString,
  oldID: EventString
) => {
  return keyID && newID && oldID && keyID.S === newID.S && keyID.S === oldID.S;
};
// New pending should be null/undefined defined, old pending should be "PENDING"
export const validatePendingUpdate = (
  newPending: EventString,
  oldPending: EventString
) => {
  return !newPending && oldPending && oldPending.S === "PENDING";
};
// Get Resolution object | undefined from EventString
export const getResolution = (
  resolution: EventString
): Resolution | undefined => {
  if (resolution) {
    return resolutionValues.find((value) => value.toString() === resolution.S);
  }
};
// Pretty prints strings
export const prettyPrint = (input: {} | []) => {
  return JSON.stringify(input, null, 2);
};

interface DateItems {
  dateStr: StringObject;
  dateValueStr: NumberObject;
}
// Return ISO string and value string of current date
export const getDateItems: () => DateItems = () => {
  const date = new Date();
  const dateStr = date.toISOString();
  const dateValueStr = date.valueOf().toString();
  return {
    dateStr: { S: dateStr },
    dateValueStr: { N: dateValueStr }
  };
};

// Increment a NumberObject by 1
// { N: "1" } => { N: "2" }
export const incrementNumberObjectByOne = (numberObject: NumberObject) => {
  return { N: (parseInt(numberObject.N) + 1).toString() };
};
