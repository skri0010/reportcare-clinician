import {
  GetClinicianRecordQuery,
  GetClinicianRecordQueryVariables
} from "../api/API";
import { AppSyncUrl, BaseResponse } from "../types";
import { getClinicianRecord as gqlGetClinicianRecord } from "../api/graphql/queries";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

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
