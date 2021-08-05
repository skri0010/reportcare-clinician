import API from "@aws-amplify/api-graphql";
// eslint-disable-next-line no-restricted-imports
import * as queries from "aws/graphql/queries";
import { BaseResponse } from "aws";
import {
  ListPatientInfosQueryVariables,
  ListPatientInfosQuery,
  ListActivityInfosQueryVariables,
  ListActivityInfosQuery,
  ListReportSymptomsQueryVariables,
  ListReportSymptomsQuery,
  ListReportVitalssQueryVariables,
  ListReportVitalssQuery,
  ListClinicianInfosQueryVariables,
  ListClinicianInfosQuery,
  ListMedCompliantsQuery,
  ListMedCompliantsQueryVariables,
  ListMedicationInfosQuery,
  ListMedCompliantByDateQuery,
  ListMedCompliantByDateQueryVariables,
  ListAlertsByDateTimeQuery,
  ListAlertsByDateTimeQueryVariables
} from "aws/API";

interface ListClinicianInfosResponse extends BaseResponse {
  data: ListClinicianInfosQuery;
}

export const listClinicianInfos = async (
  variables: ListClinicianInfosQueryVariables
): Promise<ListClinicianInfosResponse> => {
  return (await API.graphql({
    query: queries.listClinicianInfos,
    variables: variables
  })) as ListClinicianInfosResponse;
};

interface ListPatientInfosResponse extends BaseResponse {
  data: ListPatientInfosQuery;
}

export const listPatientInfos = async (
  variables: ListPatientInfosQueryVariables
): Promise<ListPatientInfosResponse> => {
  return (await API.graphql({
    query: queries.listPatientInfos,
    variables: variables
  })) as ListPatientInfosResponse;
};

interface ListActivityInfosResponse extends BaseResponse {
  data: ListActivityInfosQuery;
}

export const listActivityInfos = async (
  variables: ListActivityInfosQueryVariables
): Promise<ListActivityInfosResponse> => {
  return (await API.graphql({
    query: queries.listActivityInfos,
    variables: variables
  })) as ListActivityInfosResponse;
};

interface ListReportSymptomsResponse extends BaseResponse {
  data: ListReportSymptomsQuery;
}

export const listReportSymptoms = async (
  variables: ListReportSymptomsQueryVariables
): Promise<ListReportSymptomsResponse> => {
  return (await API.graphql({
    query: queries.listReportSymptoms,
    variables: variables
  })) as ListReportSymptomsResponse;
};

interface ListReportVitalsQueryResponse extends BaseResponse {
  data: ListReportVitalssQuery;
}

export const listReportVitals = async (
  variables: ListReportVitalssQueryVariables
): Promise<ListReportVitalsQueryResponse> => {
  return (await API.graphql({
    query: queries.listReportVitalss,
    variables: variables
  })) as ListReportVitalsQueryResponse;
};

interface ListMedCompliantsQueryResponse extends BaseResponse {
  data: ListMedCompliantsQuery;
}

export const listMedCompliants = async (
  variables: ListMedCompliantsQueryVariables
): Promise<ListMedCompliantsQueryResponse> => {
  return (await API.graphql({
    query: queries.listMedCompliants,
    variables: variables
  })) as ListMedCompliantsQueryResponse;
};

interface ListMedicationInfosQueryResponse extends BaseResponse {
  data: ListMedicationInfosQuery;
}

export const listMedicationInfos = async (
  variables: ListMedCompliantsQueryVariables
): Promise<ListMedicationInfosQueryResponse> => {
  return (await API.graphql({
    query: queries.listMedicationInfos,
    variables: variables
  })) as ListMedicationInfosQueryResponse;
};

interface ListMedCompliantsByDateResponse extends BaseResponse {
  data: ListMedCompliantByDateQuery;
}

export const listMedCompliantsByDate = async (
  variables: ListMedCompliantByDateQueryVariables
): Promise<ListMedCompliantsByDateResponse> => {
  return (await API.graphql({
    query: queries.listMedCompliantByDate,
    variables: variables
  })) as ListMedCompliantsByDateResponse;
};

interface ListAlertsByDateTimeResponse extends BaseResponse {
  data: ListAlertsByDateTimeQuery;
}

export const listAlertsByDateTime = async (
  variables: ListAlertsByDateTimeQueryVariables
): Promise<ListAlertsByDateTimeResponse> => {
  return (await API.graphql({
    query: queries.listAlertsByDateTime,
    variables: variables
  })) as ListAlertsByDateTimeResponse;
};
