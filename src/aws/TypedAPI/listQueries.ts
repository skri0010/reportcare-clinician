import API from "@aws-amplify/api-graphql";
// eslint-disable-next-line no-restricted-imports
import * as queries from "aws/graphql/queries";
import * as Override from "./override";
import { BaseResponse, ClinicianRecordType } from "aws";
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
  ListMedCompliantsByPatientIDQueryVariables,
  ListMedCompliantsByPatientIDQuery,
  ListUploadedClinicianRecordsByPatientIDQuery,
  ListUploadedClinicianRecordsByPatientIDQueryVariables,
  ListReportVitalsByDateTimeQuery,
  ListReportVitalsByDateTimeQueryVariables,
  ListReportSymptomsByDateTimeQuery,
  ListReportSymptomsByDateTimeQueryVariables,
  ListMedicationInfosByPatientIDQueryVariables,
  ListMedicationInfosByPatientIDQuery
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

export interface ListActivityInfosByPatientIDResponse extends BaseResponse {
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

interface ListReportSymptomsByDateTimeQueryResponse extends BaseResponse {
  data: ListReportSymptomsByDateTimeQuery;
}

export const listReportSymptomsByDateTime = async (
  variables: ListReportSymptomsByDateTimeQueryVariables
): Promise<ListReportSymptomsByDateTimeQueryResponse> => {
  return (await API.graphql({
    query: Override.listReportSymptomsWithActivitiesByDateTime,
    variables: variables
  })) as ListReportSymptomsByDateTimeQueryResponse;
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

interface ListReportVitalsByDateTimeQueryResponse extends BaseResponse {
  data: ListReportVitalsByDateTimeQuery;
}

export const listReportVitalsByDateTime = async (
  variables: ListReportVitalsByDateTimeQueryVariables
): Promise<ListReportVitalsByDateTimeQueryResponse> => {
  return (await API.graphql({
    query: queries.listReportVitalsByDateTime,
    variables: variables
  })) as ListReportVitalsByDateTimeQueryResponse;
};

interface ListMedCompliantsByPatientIDQueryResponse extends BaseResponse {
  data: ListMedCompliantsByPatientIDQuery;
}
export const listMedCompliantsByPatientID = async (
  variables: ListMedCompliantsByPatientIDQueryVariables
): Promise<ListMedCompliantsByPatientIDQueryResponse> => {
  return (await API.graphql({
    query: queries.listMedCompliantsByPatientID,
    variables: variables
  })) as ListMedCompliantsByPatientIDQueryResponse;
};

interface ListMedicationInfosByPatientIDQueryResponse extends BaseResponse {
  data: ListMedicationInfosByPatientIDQuery;
}

export const listMedicationInfosByPatientID = async (
  variables: ListMedicationInfosByPatientIDQueryVariables
): Promise<ListMedicationInfosByPatientIDQueryResponse> => {
  return (await API.graphql({
    query: queries.listMedicationInfosByPatientID,
    variables: variables
  })) as ListMedicationInfosByPatientIDQueryResponse;
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

interface ListUploadedClinicianRecordsResponse extends BaseResponse {
  data: ListUploadedClinicianRecordsByPatientIDQuery;
}

export const listUploadedClinicianRecordsByPatientID = async (
  variables: ListUploadedClinicianRecordsByPatientIDQueryVariables,
  recordType: ClinicianRecordType
): Promise<ListUploadedClinicianRecordsResponse> => {
  return (await API.graphql({
    query: queries.listUploadedClinicianRecordsByPatientID,
    variables: {
      ...variables,
      ...{ filter: { type: { eq: recordType } } }
    }
  })) as ListUploadedClinicianRecordsResponse;
};
