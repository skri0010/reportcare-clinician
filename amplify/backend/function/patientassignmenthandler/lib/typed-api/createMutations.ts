import {
  CreateClinicianPatientMapInput,
  CreateClinicianPatientMapMutation,
  CreatePatientAssignmentInput,
  CreatePatientAssignmentMutation
} from "../api/API";
import { AppSyncUrl, BaseResponse } from "../types";
import {
  createPatientAssignment as gqlCreatePatientAssignment,
  createClinicianPatientMap as gqlCreateClinicianPatientMap
} from "../api/graphql/mutations";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize interfaces for responses
interface CreatePatientAssignmentResponse extends BaseResponse {
  data: CreatePatientAssignmentMutation;
}

interface CreateClinicianPatientMapResponse extends BaseResponse {
  data: CreateClinicianPatientMapMutation;
}

// Export typed GraphQL queries
export const createPatientAssignment = async (
  input: CreatePatientAssignmentInput
): Promise<CreatePatientAssignmentResponse> => {
  return (await request(
    {
      query: gqlCreatePatientAssignment,
      variables: { input: input }
    },
    AppSyncUrl
  )) as CreatePatientAssignmentResponse;
};

export const createClinicianPatientMap = async (
  input: CreateClinicianPatientMapInput
): Promise<CreateClinicianPatientMapResponse> => {
  return (await request(
    {
      query: gqlCreateClinicianPatientMap,
      variables: { input: input }
    },
    AppSyncUrl
  )) as CreateClinicianPatientMapResponse;
};
