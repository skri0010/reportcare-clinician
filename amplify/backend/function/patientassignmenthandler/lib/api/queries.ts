import {
  GetClinicianPatientMapQuery,
  GetClinicianPatientMapQueryVariables,
  GetPatientAssignmentQuery,
  GetPatientAssignmentQueryVariables
} from "lib/api/API";
import { AppSyncUrl, BaseResponse } from "../types";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize GraphQL queries
const gqlGetPatientAssignment = /* GraphQL */ `
  query GetPatientAssignment($patientID: String!, $clinicianID: String!) {
    getPatientAssignment(patientID: $patientID, clinicianID: $clinicianID) {
      id
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      adminReassignFromClinicianID
      adminCompleted
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;

const gqlGetClinicianPatientMap = /* GraphQL */ `
  query GetClinicianPatientMap($clinicianID: String!, $patientID: String!) {
    getClinicianPatientMap(clinicianID: $clinicianID, patientID: $patientID) {
      id
      clinicianID
      patientID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;

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
