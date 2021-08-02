import API from "@aws-amplify/api-graphql";
import * as queries from "aws/graphql/queries";
import { BaseResponse } from "aws";
import {
  GetClinicianInfoQueryVariables,
  GetClinicianInfoQuery,
  GetClinicianProtectedInfoQuery,
  GetClinicianProtectedInfoQueryVariables,
  GetPatientInfoQuery,
  GetPatientInfoQueryVariables
} from "aws/API";

interface GetClinicianInfoResponse extends BaseResponse {
  data: GetClinicianInfoQuery;
}

export const getClinicianInfo = async (
  variables: GetClinicianInfoQueryVariables
): Promise<GetClinicianInfoResponse> => {
  return (await API.graphql({
    query: queries.getClinicianInfo,
    variables: variables
  })) as GetClinicianInfoResponse;
};

interface GetClinicianProtectedInfoResponse extends BaseResponse {
  data: GetClinicianProtectedInfoQuery;
}

export const getClinicianProtectedInfo = async (
  variables: GetClinicianProtectedInfoQueryVariables
): Promise<GetClinicianProtectedInfoResponse> => {
  return (await API.graphql({
    query: queries.getClinicianProtectedInfo,
    variables: variables
  })) as GetClinicianProtectedInfoResponse;
};

interface GetPatientInfoResponse extends BaseResponse {
  data: GetPatientInfoQuery;
}

export const getPatientInfo = async (
  variables: GetPatientInfoQueryVariables
): Promise<GetPatientInfoResponse> => {
  return (await API.graphql({
    query: queries.getPatientInfo,
    variables: variables
  })) as GetPatientInfoResponse;
};
