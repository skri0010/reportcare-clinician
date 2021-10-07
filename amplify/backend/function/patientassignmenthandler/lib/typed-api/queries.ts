import {
  GetClinicianPatientMapQuery,
  GetClinicianPatientMapQueryVariables,
  GetPatientAssignmentQuery,
  GetPatientAssignmentQueryVariables
} from "../api/API";
import { AppSyncUrl, BaseResponse } from "../types";
import {
  getPatientAssignment as gqlGetPatientAssignment,
  getClinicianPatientMap as gqlGetClinicianPatientMap
} from "../api/graphql/queries";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize interfaces for responses
interface GetPatientAssignmentResponse extends BaseResponse {
  data: GetPatientAssignmentQuery;
}

interface GetClinicianPatientMapResponse extends BaseResponse {
  data: GetClinicianPatientMapQuery;
}

// Export typed GraphQL queries
export const getPatientAssignment = async (
  variables: GetPatientAssignmentQueryVariables
): Promise<GetPatientAssignmentResponse> => {
  return (await request(
    {
      query: gqlGetPatientAssignment,
      variables: variables
    },
    AppSyncUrl
  )) as GetPatientAssignmentResponse;
};

export const getClinicianPatientMap = async (
  variables: GetClinicianPatientMapQueryVariables
): Promise<GetClinicianPatientMapResponse> => {
  return (await request(
    {
      query: gqlGetClinicianPatientMap,
      variables: variables
    },
    AppSyncUrl
  )) as GetClinicianPatientMapResponse;
};
