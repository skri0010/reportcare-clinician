import { handlePatientAssignmentResolution } from "./main";
import { ResolutionEvent } from "./types";

/* Amplify Params - DO NOT EDIT
	API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT
	API_REPORTCARE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

export const handler = async (event: ResolutionEvent): Promise<string> => {
  return await handlePatientAssignmentResolution(event);
};
