import {
  GetClinicianInfoQuery,
  GetClinicianInfoQueryVariables,
  GetClinicianPatientMapQuery,
  GetClinicianPatientMapQueryVariables,
  GetPatientAssignmentQuery,
  GetPatientAssignmentQueryVariables
} from "../api/API";
import { AppSyncUrl, BaseResponse } from "../types";
import {
  getPatientAssignment as gqlGetPatientAssignment,
  getClinicianPatientMap as gqlGetClinicianPatientMap,
  getClinicianInfo as gqlGetClinicianInfo
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

interface GetClinicianInfoResponse extends BaseResponse {
  data: GetClinicianInfoQuery;
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

export const getClinicianInfo = async (
  variables: GetClinicianInfoQueryVariables
): Promise<GetClinicianInfoResponse> => {
  return (await request(
    {
      query: gqlGetClinicianInfo,
      variables: variables
    },
    AppSyncUrl
  )) as GetClinicianInfoResponse;
};
