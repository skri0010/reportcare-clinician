import API from "@aws-amplify/api-graphql";
// eslint-disable-next-line no-restricted-imports
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
  GetAlertQueryVariables,
  GetPatientInfoQuery,
  GetPatientInfoQueryVariables,
  GetPatientAssignmentQuery,
  GetPatientAssignmentQueryVariables,
  GetClinicianPatientMapQuery,
  GetClinicianPatientMapQueryVariables,
  GetClinicianRecordQuery,
  GetClinicianRecordQueryVariables
} from "aws/API";
import * as Override from "./overrideAPI";

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

export const getDetailedAlert = async (
  variables: GetAlertQueryVariables
): Promise<GetAlertResponse> => {
  return (await API.graphql({
    query: Override.getFullAlert,
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

interface GetPatientAssignmentResponse extends BaseResponse {
  data: GetPatientAssignmentQuery;
}

export const getPatientAssignment = async (
  variables: GetPatientAssignmentQueryVariables
): Promise<GetPatientAssignmentResponse> => {
  return (await API.graphql({
    query: queries.getPatientAssignment,
    variables: variables
  })) as GetPatientAssignmentResponse;
};

interface GetClinicianPatientMapResponse extends BaseResponse {
  data: GetClinicianPatientMapQuery;
}

export const getClinicianPatientMap = async (
  variables: GetClinicianPatientMapQueryVariables
): Promise<GetClinicianPatientMapResponse> => {
  return (await API.graphql({
    query: queries.getClinicianPatientMap,
    variables: variables
  })) as GetClinicianPatientMapResponse;
};

interface GetClinicianRecordResponse extends BaseResponse {
  data: GetClinicianRecordQuery;
}

export const getClinicianRecord = async (
  variables: GetClinicianRecordQueryVariables
): Promise<GetClinicianRecordResponse> => {
  return (await API.graphql({
    query: queries.getClinicianRecord,
    variables: variables
  })) as GetClinicianRecordResponse;
};
