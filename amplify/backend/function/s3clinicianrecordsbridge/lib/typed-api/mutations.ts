import {
  CreateClinicianRecordMutation,
  CreateClinicianRecordInput,
  DeleteClinicianRecordInput,
  DeleteClinicianRecordMutation,
  UpdateClinicianRecordInput,
  UpdateClinicianRecordMutation
} from "../api/API";
import { AppSyncUrl, BaseResponse } from "../types";
import {
  createClinicianRecord as gqlCreateClinicianRecord,
  updateClinicianRecord as gqlUpdateClinicianRecord,
  deleteClinicianRecord as gqlDeleteClinicianRecord
} from "../api/graphql/mutations";
// @ts-ignore
import { request } from "/opt/appSyncRequest";

// Initialize interfaces for responses
interface CreateClinicianRecordResponse extends BaseResponse {
  data?: CreateClinicianRecordMutation;
}

interface UpdateClinicianRecordResponse extends BaseResponse {
  data?: UpdateClinicianRecordMutation;
}

interface DeleteClinicianRecordReponse extends BaseResponse {
  data?: DeleteClinicianRecordMutation;
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

export const deleteClinicianRecord = async (
  input: DeleteClinicianRecordInput
): Promise<DeleteClinicianRecordReponse> => {
  return (await request(
    {
      query: gqlDeleteClinicianRecord,
      variables: { input: input }
    },
    AppSyncUrl
  )) as DeleteClinicianRecordReponse;
};
