import { handlePatientAssignmentResolution } from "./main";
import { ResolutionEvent } from "./types";

export const handler = async (event: ResolutionEvent): Promise<string> => {
  return await handlePatientAssignmentResolution(event);
};
