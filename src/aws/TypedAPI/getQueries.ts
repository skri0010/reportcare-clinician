import API from "@aws-amplify/api-graphql";
import * as queries from "aws/graphql/queries";
import { BaseResponse } from "aws";
import {
  GetClinicianInfoQueryVariables,
  GetClinicianInfoQuery,
  GetClinicianProtectedInfoQuery,
  GetClinicianProtectedInfoQueryVariables,
  GetMedicationInfoQuery,
  GetMedicationInfoQueryVariables,
  GetReportSymptomQueryVariables,
  GetReportSymptomQuery,
  GetReportVitalsQuery,
  GetReportVitalsQueryVariables,
  GetActivityInfoQuery,
  GetActivityInfoQueryVariables,
  GetTodoQuery,
  GetTodoQueryVariables,
  GetAlertQuery,
  GetAlertQueryVariables
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

interface GetMedicationInfoResponse extends BaseResponse {
  data: GetMedicationInfoQuery;
}

export const getMedicationInfo = async (
  variables: GetMedicationInfoQueryVariables
): Promise<GetMedicationInfoResponse> => {
  return (await API.graphql({
    query: queries.getMedicationInfo,
    variables: variables
  })) as GetMedicationInfoResponse;
};

interface GetReportSymptomResponse extends BaseResponse {
  data: GetReportSymptomQuery;
}

export const getReportSymptom = async (
  variables: GetReportSymptomQueryVariables
): Promise<GetReportSymptomResponse> => {
  return (await API.graphql({
    query: queries.getReportSymptom,
    variables: variables
  })) as GetReportSymptomResponse;
};

interface GetActivityInfoResponse extends BaseResponse {
  data: GetActivityInfoQuery;
}

export const getActivityInfo = async (
  variables: GetActivityInfoQueryVariables
): Promise<GetActivityInfoResponse> => {
  return (await API.graphql({
    query: queries.getActivityInfo,
    variables: variables
  })) as GetActivityInfoResponse;
};

interface GetReportVitalsResponse extends BaseResponse {
  data: GetReportVitalsQuery;
}

export const getReportVitals = async (
  variables: GetReportVitalsQueryVariables
): Promise<GetReportVitalsResponse> => {
  return (await API.graphql({
    query: queries.getReportVitals,
    variables: variables
  })) as GetReportVitalsResponse;
};

interface GetAlertResponse extends BaseResponse {
  data: GetAlertQuery;
}

export const getAlert = async (
  variables: GetAlertQueryVariables
): Promise<GetAlertResponse> => {
  return (await API.graphql({
    query: queries.getAlert,
    variables: variables
  })) as GetAlertResponse;
};

interface GetTodoResponse extends BaseResponse {
  data: GetTodoQuery;
}

export const getTodo = async (
  variables: GetTodoQueryVariables
): Promise<GetTodoResponse> => {
  return (await API.graphql({
    query: queries.getTodo,
    variables: variables
  })) as GetTodoResponse;
};
