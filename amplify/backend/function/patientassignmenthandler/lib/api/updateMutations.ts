import {
  ClinicianPatientMap,
  PatientAssignment,
  UpdateClinicianInfoInput,
  UpdatePatientAssignmentInput
} from "lib/api/API";
import { AppSyncUrl, BaseResponse } from "../types";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize GraphQL mutations
const gqlUpdatePatientAssignment = /* GraphQL */ `
  mutation UpdatePatientAssignment(
    $input: UpdatePatientAssignmentInput!
    $condition: ModelPatientAssignmentConditionInput
  ) {
    updatePatientAssignment(input: $input, condition: $condition) {
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

const gqlUpdateClinicianPatientMap = /* GraphQL */ `
  mutation UpdateClinicianPatientMap(
    $input: UpdateClinicianPatientMapInput!
    $condition: ModelClinicianPatientMapConditionInput
  ) {
    updateClinicianPatientMap(input: $input, condition: $condition) {
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
interface UpdatePatientAssignmentResponse extends BaseResponse {
  data?: { updatePatientAssignment?: PatientAssignment };
}

interface UpdateClinicianPatientMapResponse extends BaseResponse {
  data?: { updateClinicianPatientMap?: ClinicianPatientMap };
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
