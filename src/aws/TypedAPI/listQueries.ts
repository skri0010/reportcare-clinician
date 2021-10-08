import API from "@aws-amplify/api-graphql";
// eslint-disable-next-line no-restricted-imports
import * as queries from "aws/graphql/queries";
import { BaseResponse } from "aws";
import {
  ListPatientInfosQueryVariables,
  ListPatientInfosQuery,
  ListClinicianInfosQueryVariables,
  ListClinicianInfosQuery,
  ListMedCompliantsQuery,
  ListMedCompliantsQueryVariables,
  ListMedicationInfosQuery,
  ListMedCompliantsByDateQuery,
  ListMedCompliantsByDateQueryVariables,
  ListPendingPatientAssignmentsQuery,
  ListPendingPatientAssignmentsQueryVariables,
  ListPendingAlertsByDateTimeQuery,
  ListPendingAlertsByDateTimeQueryVariables,
  ListPatientAlertsByDateTimeQueryVariables,
  ListPatientAlertsByDateTimeQuery,
  ListPendingRiskAlertsQuery,
  ListPendingRiskAlertsQueryVariables,
  ListCompletedRiskAlertsQuery,
  ListCompletedRiskAlertsQueryVariables,
  ListActivityInfosByPatientIDQueryVariables,
  ListActivityInfosByPatientIDQuery,
  ListReportSymptomsByPatientIDQuery,
  ListReportSymptomsByPatientIDQueryVariables,
  ListReportVitalsByPatientIDQuery,
  ListReportVitalsByPatientIDQueryVariables,
  ListTodosByAlertIDQuery,
  ListTodosByAlertIDQueryVariables,
  ListPendingTodosByLastModifiedDateQuery,
  ListPendingTodosByLastModifiedDateQueryVariables,
  ListCompletedTodosByLastModifiedDateQuery,
  ListCompletedTodosByLastModifiedDateQueryVariables,
  ListClinicianMappingsByPatientIDQuery,
  ListClinicianMappingsByPatientIDQueryVariables,
  ListClinicianPatientMapsQuery,
  ListClinicianPatientMapsQueryVariables,
  ListIcdCrtRecordsByDateTimeQuery,
  ListIcdCrtRecordsByDateTimeQueryVariables,
  ListUploadedClinicianRecordsByPatientIDQuery,
  ListUploadedClinicianRecordsByPatientIDQueryVariables
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

interface ListActivityInfosByPatientIDResponse extends BaseResponse {
  data: ListActivityInfosByPatientIDQuery;
}

export const listActivityInfosByPatientID = async (
  variables: ListActivityInfosByPatientIDQueryVariables
): Promise<ListActivityInfosByPatientIDResponse> => {
  return (await API.graphql({
    query: queries.listActivityInfosByPatientID,
    variables: variables
  })) as ListActivityInfosByPatientIDResponse;
};

interface ListReportSymptomsByPatientIDResponse extends BaseResponse {
  data: ListReportSymptomsByPatientIDQuery;
}

export const listReportSymptomsByPatientID = async (
  variables: ListReportSymptomsByPatientIDQueryVariables
): Promise<ListReportSymptomsByPatientIDResponse> => {
  return (await API.graphql({
    query: queries.listReportSymptomsByPatientID,
    variables: variables
  })) as ListReportSymptomsByPatientIDResponse;
};

interface ListReportVitalsByPatientIDQueryResponse extends BaseResponse {
  data: ListReportVitalsByPatientIDQuery;
}

export const listReportVitalsByPatientID = async (
  variables: ListReportVitalsByPatientIDQueryVariables
): Promise<ListReportVitalsByPatientIDQueryResponse> => {
  return (await API.graphql({
    query: queries.listReportVitalsByPatientID,
    variables: variables
  })) as ListReportVitalsByPatientIDQueryResponse;
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

interface ListMedCompliantsByDateResponse extends BaseResponse {
  data: ListMedCompliantsByDateQuery;
}

export const listMedCompliantsByDate = async (
  variables: ListMedCompliantsByDateQueryVariables
): Promise<ListMedCompliantsByDateResponse> => {
  return (await API.graphql({
    query: queries.listMedCompliantsByDate,
    variables: variables
  })) as ListMedCompliantsByDateResponse;
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

interface ListPendingPatientAssignmentResponse extends BaseResponse {
  data: ListPendingPatientAssignmentsQuery;
}

export const listPendingPatientAssignments = async (
  variables: ListPendingPatientAssignmentsQueryVariables
): Promise<ListPendingPatientAssignmentResponse> => {
  return (await API.graphql({
    query: queries.listPendingPatientAssignments,
    variables: variables
  })) as ListPendingPatientAssignmentResponse;
};

interface ListPatientAlertsByDateTimeResponse extends BaseResponse {
  data: ListPatientAlertsByDateTimeQuery;
}

export const listPatientAlertsByDateTime = async (
  variables: ListPatientAlertsByDateTimeQueryVariables
): Promise<ListPatientAlertsByDateTimeResponse> => {
  return (await API.graphql({
    query: queries.listPatientAlertsByDateTime,
    variables: variables
  })) as ListPatientAlertsByDateTimeResponse;
};

interface ListPendingAlertsByDateTimeResponse extends BaseResponse {
  data: ListPendingAlertsByDateTimeQuery;
}

export const listPendingAlertsByDateTime = async (
  variables: ListPendingAlertsByDateTimeQueryVariables
): Promise<ListPendingAlertsByDateTimeResponse> => {
  return (await API.graphql({
    query: queries.listPendingAlertsByDateTime,
    variables: variables
  })) as ListPendingAlertsByDateTimeResponse;
};

interface ListPendingRiskAlertsResponse extends BaseResponse {
  data: ListPendingRiskAlertsQuery;
}

export const listPendingRiskAlerts = async (
  variables: ListPendingRiskAlertsQueryVariables
): Promise<ListPendingRiskAlertsResponse> => {
  return (await API.graphql({
    query: queries.listPendingRiskAlerts,
    variables: variables
  })) as ListPendingRiskAlertsResponse;
};

interface ListCompletedRiskAlertsResponse extends BaseResponse {
  data: ListCompletedRiskAlertsQuery;
}

export const listCompletedRiskAlerts = async (
  variables: ListCompletedRiskAlertsQueryVariables
): Promise<ListCompletedRiskAlertsResponse> => {
  return (await API.graphql({
    query: queries.listCompletedRiskAlerts,
    variables: variables
  })) as ListCompletedRiskAlertsResponse;
};

interface ListTodosByAlertIDResponse extends BaseResponse {
  data: ListTodosByAlertIDQuery;
}

export const listTodosByAlertID = async (
  variables: ListTodosByAlertIDQueryVariables
): Promise<ListTodosByAlertIDResponse> => {
  return (await API.graphql({
    query: queries.listTodosByAlertID,
    variables: variables
  })) as ListTodosByAlertIDResponse;
};

interface ListPendingTodosByLastModifiedDateResponse extends BaseResponse {
  data: ListPendingTodosByLastModifiedDateQuery;
}

export const listPendingTodosByLastModifiedDate = async (
  variables: ListPendingTodosByLastModifiedDateQueryVariables
): Promise<ListPendingTodosByLastModifiedDateResponse> => {
  return (await API.graphql({
    query: queries.listPendingTodosByLastModifiedDate,
    variables: variables
  })) as ListPendingTodosByLastModifiedDateResponse;
};

interface ListCompletedTodosByLastModifiedDateResponse extends BaseResponse {
  data: ListCompletedTodosByLastModifiedDateQuery;
}

export const listCompletedTodosByLastModifiedDate = async (
  variables: ListCompletedTodosByLastModifiedDateQueryVariables
): Promise<ListCompletedTodosByLastModifiedDateResponse> => {
  return (await API.graphql({
    query: queries.listCompletedTodosByLastModifiedDate,
    variables: variables
  })) as ListCompletedTodosByLastModifiedDateResponse;
};

interface ListClinicianMappingsByPatientIDResponse extends BaseResponse {
  data: ListClinicianMappingsByPatientIDQuery;
}

export const listClinicianMappingsByPatientID = async (
  variables: ListClinicianMappingsByPatientIDQueryVariables
): Promise<ListClinicianMappingsByPatientIDResponse> => {
  return (await API.graphql({
    query: queries.listClinicianMappingsByPatientID,
    variables: variables
  })) as ListClinicianMappingsByPatientIDResponse;
};

interface ListClinicianPatientMapsResponse extends BaseResponse {
  data: ListClinicianPatientMapsQuery;
}

export const listClinicianPatientMaps = async (
  variables: ListClinicianPatientMapsQueryVariables
): Promise<ListClinicianPatientMapsResponse> => {
  return (await API.graphql({
    query: queries.listClinicianPatientMaps,
    variables: variables
  })) as ListClinicianPatientMapsResponse;
};
interface ListIcdCrtRecordsByDateTimeResponse extends BaseResponse {
  data: ListIcdCrtRecordsByDateTimeQuery;
}

export const listIcdCrtRecordsByDateTime = async (
  variables: ListIcdCrtRecordsByDateTimeQueryVariables
): Promise<ListIcdCrtRecordsByDateTimeResponse> => {
  return (await API.graphql({
    query: queries.listIcdCrtRecordsByDateTime,
    variables: variables
  })) as ListIcdCrtRecordsByDateTimeResponse;
};

interface ListUploadedClinicianRecordsResponse extends BaseResponse {
  data: ListUploadedClinicianRecordsByPatientIDQuery;
}

export const listUploadedClinicianRecordsByPatientID = async (
  variables: ListUploadedClinicianRecordsByPatientIDQueryVariables
): Promise<ListUploadedClinicianRecordsResponse> => {
  return (await API.graphql({
    query: queries.listUploadedClinicianRecordsByPatientID,
    variables: variables
  })) as ListUploadedClinicianRecordsResponse;
};
