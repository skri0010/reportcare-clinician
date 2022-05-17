export interface EventResponse {
  success: boolean;
  data?: string;
}

// Pretty print
export const prettify = (input: any) => {
  return JSON.stringify(input, null, 2);
};

// Create new EventReponse
export const createNewEventResponse = (): EventResponse => {
  return { success: false };
};
