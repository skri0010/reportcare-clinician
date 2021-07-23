import API, { graphqlOperation } from "@aws-amplify/api-graphql";
import * as queries from "aws/graphql/queries";
import { BaseResponse } from "aws";
import {
  GetClinicianInfoQueryVariables,
  GetClinicianInfoQuery,
  GetClinicianProtectedInfoQuery,
  GetClinicianProtectedInfoQueryVariables
} from "aws/API";

interface GetClinicianInfoResponse extends BaseResponse {
  data: GetClinicianInfoQuery;
}

export const getClinicianInfo = async (
  variables: GetClinicianInfoQueryVariables
): Promise<GetClinicianInfoResponse> => {
  return (await API.graphql(
    graphqlOperation(queries.getClinicianInfo, {
      variables: variables
    })
  )) as GetClinicianInfoResponse;
};

interface GetClinicianProtectedInfoResponse extends BaseResponse {
  data: GetClinicianProtectedInfoQuery;
}

export const getClinicianProtectedInfo = async (
  variables: GetClinicianProtectedInfoQueryVariables
): Promise<GetClinicianProtectedInfoResponse> => {
  return (await API.graphql(
    graphqlOperation(queries.getClinicianProtectedInfo, {
      variables: variables
    })
  )) as GetClinicianProtectedInfoResponse;
};
