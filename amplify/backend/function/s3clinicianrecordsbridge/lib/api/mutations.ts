import { ClinicianRecord, CreateClinicianRecordInput } from "lib/api/API";
import { AppSyncUrl, BaseResponse } from "../types";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize GraphQL mutations
const gqlCreateClinicianRecord = /* GraphQL */ `
  mutation CreateClinicianRecord(
    $input: CreateClinicianRecordInput!
    $condition: ModelClinicianRecordConditionInput
  ) {
    createClinicianRecord(input: $input, condition: $condition) {
      patientID
      documentID
      type
      title
      path
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;

// Initialize interfaces for responses
interface CreateClinicianRecordResponse extends BaseResponse {
  data?: { createClinicianRecord?: ClinicianRecord };
}

// Export typed GraphQL queries
export const createClinicianRecord = async (
  input: CreateClinicianRecordInput
): Promise<CreateClinicianRecordResponse> => {
  return (await request(
    {
      query: gqlCreateClinicianRecord,
      variables: { input: input }
    },
    AppSyncUrl
  )) as CreateClinicianRecordResponse;
};
