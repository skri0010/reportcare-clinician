import {
  ClinicianPatientMap,
  CreateClinicianPatientMapInput,
  CreatePatientAssignmentInput,
  PatientAssignment
} from "lib/api/API";
import { AppSyncUrl, BaseResponse } from "../types";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize GraphQL mutations
const gqlCreatePatientAssignment = /* GraphQL */ `
  mutation CreatePatientAssignment(
    $input: CreatePatientAssignmentInput!
    $condition: ModelPatientAssignmentConditionInput
  ) {
    createPatientAssignment(input: $input, condition: $condition) {
      id
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      adminReassignFromClinicianID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      adminCompleted
    }
  }
`;

const gqlCreateClinicianPatientMap = /* GraphQL */ `
  mutation CreateClinicianPatientMap(
    $input: CreateClinicianPatientMapInput!
    $condition: ModelClinicianPatientMapConditionInput
  ) {
    createClinicianPatientMap(input: $input, condition: $condition) {
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
interface CreatePatientAssignmentResponse extends BaseResponse {
  data?: { createPatientAssignment?: PatientAssignment };
}

interface CreateClinicianPatientMapResponse extends BaseResponse {
  data?: { createClinicianPatientMap?: ClinicianPatientMap };
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
