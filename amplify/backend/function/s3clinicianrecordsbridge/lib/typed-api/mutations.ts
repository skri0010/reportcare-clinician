import {
  ClinicianRecord,
  CreateClinicianRecordInput,
  UpdateClinicianRecordInput
} from "../api/API";
import { AppSyncUrl, BaseResponse } from "../types";
import {
  createClinicianRecord as gqlCreateClinicianRecord,
  updateClinicianRecord as gqlUpdateClinicianRecord
} from "../api/graphql/mutations";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize interfaces for responses
interface CreateClinicianRecordResponse extends BaseResponse {
  data?: { createClinicianRecord?: ClinicianRecord };
}

interface UpdateClinicianRecordResponse extends BaseResponse {
  data?: { updateClinicianRecord?: ClinicianRecord };
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

export const updateClinicianRecord = async (
  input: UpdateClinicianRecordInput
): Promise<UpdateClinicianRecordResponse> => {
  return (await request(
    {
      query: gqlUpdateClinicianRecord,
      variables: { input: input }
    },
    AppSyncUrl
  )) as UpdateClinicianRecordResponse;
};
