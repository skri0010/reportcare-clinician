import { EventResponse } from "./types";

// Pretty prints strings
export const prettify = (input: {} | []) => {
  return JSON.stringify(input, null, 2);
};

export const createNewEventResponse = (): EventResponse => {
  return { success: false };
};
