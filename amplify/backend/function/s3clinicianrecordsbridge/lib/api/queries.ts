import {
  GetClinicianRecordQuery,
  GetClinicianRecordQueryVariables
} from "lib/api/API";
import { AppSyncUrl, BaseResponse } from "../types";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize GraphQL queries
const gqlGetClinicianRecord = /* GraphQL */ `
  query GetClinicianRecord($patientID: String!, $documentID: String!) {
    getClinicianRecord(patientID: $patientID, documentID: $documentID) {
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
interface GetClinicianRecordResponse extends BaseResponse {
  data: GetClinicianRecordQuery;
}

// Export typed GraphQL queries
export const getClinicianRecord = async (
  variables: GetClinicianRecordQueryVariables
): Promise<GetClinicianRecordResponse> => {
  return (await request(
    {
      query: gqlGetClinicianRecord,
      variables: variables
    },
    AppSyncUrl
  )) as GetClinicianRecordResponse;
};
