import API from "@aws-amplify/api-graphql";
import * as mutations from "aws/graphql/mutations";
import { BaseResponse } from "aws";
import {
  ClinicianInfo,
  CreateClinicianInfoInput,
  ClinicianProtectedInfo,
  CreateClinicianProtectedInfoInput,
  ClinicianPatientMap,
  CreateClinicianPatientMapInput
} from "aws/API";

interface CreateClinicianInfoResponse extends BaseResponse {
  data: { createClinicianInfo?: ClinicianInfo };
}

export const createClinicianInfo = async (
  input: CreateClinicianInfoInput
): Promise<CreateClinicianInfoResponse> => {
  return (await API.graphql({
    query: mutations.createClinicianInfo,
    variables: { input: input }
  })) as CreateClinicianInfoResponse;
};

interface CreateClinicianProtectedInfoResponse extends BaseResponse {
  data: { createClinicianProtectedInfo?: ClinicianProtectedInfo };
}

export const createClinicianProtectedInfo = async (
  input: CreateClinicianProtectedInfoInput
): Promise<CreateClinicianProtectedInfoResponse> => {
  return (await API.graphql({
    query: mutations.createClinicianProtectedInfo,
    variables: { input: input }
  })) as CreateClinicianProtectedInfoResponse;
};

interface CreateClinicianPatientMapResponse extends BaseResponse {
  data: { createClinicianPatientMap?: ClinicianPatientMap };
}

export const createClinicianPatientMap = async (
  input: CreateClinicianPatientMapInput
): Promise<CreateClinicianPatientMapResponse> => {
  return (await API.graphql({
    query: mutations.createClinicianPatientMap,
    variables: { input: input }
  })) as CreateClinicianPatientMapResponse;
};
