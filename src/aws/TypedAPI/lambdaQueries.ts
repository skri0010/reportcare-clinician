/* eslint-disable no-restricted-imports */
import API from "@aws-amplify/api";
import { BaseResponse } from "aws";
import {
  QueryS3ClinicianRecordsBridgeQuery,
  QueryS3ClinicianRecordsBridgeQueryVariables
} from "aws/API";
import * as queries from "aws/graphql/queries";

interface QueryS3ClinicianRecordsBridgeResponse extends BaseResponse {
  data: QueryS3ClinicianRecordsBridgeQuery;
}

// Type created with reference to schema.graphql

export type ClinicianRecordType = "IcdCrt" | "Medical";
export type ClinicianRecordOperation =
  | "Upload"
  | "Download"
  | "Acknowledge"
  | "Delete";
interface PresignedUrlObjectVariables
  extends QueryS3ClinicianRecordsBridgeQueryVariables {
  recordType: ClinicianRecordType;
  operation: ClinicianRecordOperation;
  patientID: string;
  documentID: string;
  documentTitle: string;
}

// Type created with reference to amplify/backend/function/s3clinicianrecordsbridge/src/index
interface LambdaResolverParsedResponse {
  success: boolean;
  data?: string;
}

export const queryS3ClinicianRecordsBridge: (
  variables: PresignedUrlObjectVariables
) => Promise<LambdaResolverParsedResponse> = async (variables) => {
  let typedResponse: LambdaResolverParsedResponse = {
    success: false
  };
  const response = (await API.graphql({
    query: queries.queryS3ClinicianRecordsBridge,
    variables: variables
  })) as QueryS3ClinicianRecordsBridgeResponse;
  if (response.data.queryS3ClinicianRecordsBridge) {
    typedResponse = JSON.parse(response.data.queryS3ClinicianRecordsBridge);
  }
  return typedResponse;
};
