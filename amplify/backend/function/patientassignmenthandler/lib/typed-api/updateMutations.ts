import {
  UpdateClinicianInfoInput,
  UpdateClinicianPatientMapMutation,
  UpdatePatientAssignmentInput,
  UpdatePatientAssignmentMutation
} from "../api/API";
import { AppSyncUrl, BaseResponse } from "../types";
import {
  updatePatientAssignment as gqlUpdatePatientAssignment,
  updateClinicianPatientMap as gqlUpdateClinicianPatientMap
} from "../api/graphql/mutations";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize interfaces for responses
interface UpdatePatientAssignmentResponse extends BaseResponse {
  data: UpdatePatientAssignmentMutation;
}

interface UpdateClinicianPatientMapResponse extends BaseResponse {
  data: UpdateClinicianPatientMapMutation;
}

// Export typed GraphQL queries
export const updatePatientAssignment = async (
  input: UpdatePatientAssignmentInput
): Promise<UpdatePatientAssignmentResponse> => {
  return (await request(
    {
      query: gqlUpdatePatientAssignment,
      variables: { input: input }
    },
    AppSyncUrl
  )) as UpdatePatientAssignmentResponse;
};

export const updateClinicianPatientMap = async (
  input: UpdateClinicianInfoInput
): Promise<UpdateClinicianPatientMapResponse> => {
  return (await request(
    {
      query: gqlUpdateClinicianPatientMap,
      variables: { input: input }
    },
    AppSyncUrl
  )) as UpdateClinicianPatientMapResponse;
};
