/* eslint-disable no-restricted-imports */
import API from "@aws-amplify/api";
import { BaseResponse } from "aws";
import {
  QueryS3ClinicianRecordsBridgeQuery,
  QueryS3ClinicianRecordsBridgeQueryVariables,
  HandlePatientAssignmentQuery,
  HandlePatientAssignmentQueryVariables
} from "aws/API";
import * as queries from "aws/graphql/queries";
import { PatientAssignmentStatus } from "rc_agents/model";

interface QueryS3ClinicianRecordsBridgeResponse extends BaseResponse {
  data: QueryS3ClinicianRecordsBridgeQuery;
}

interface HandlePatientAssignmentResponse extends BaseResponse {
  data: HandlePatientAssignmentQuery;
}

// Type created with reference to schema.graphql

export type ClinicianRecordType = "IcdCrt" | "Medical";
export type ClinicianRecordOperation =
  | "Upload"
  | "Download"
  | "Acknowledge"
  | "Delete";
interface QueryS3ClinicianRecordsBridgeNarrowedVariables
  extends QueryS3ClinicianRecordsBridgeQueryVariables {
  recordType: ClinicianRecordType;
  operation: ClinicianRecordOperation;
  patientID: string;
  documentID: string;
  documentTitle: string;
}

interface HandlePatientAssignmentNarrowedVariables
  extends HandlePatientAssignmentQueryVariables {
  patientID: string;
  resolution: PatientAssignmentStatus;
  reassignToClinicianID?: string;
}

// Type created with reference to amplify/backend/function/s3clinicianrecordsbridge/src/index
interface LambdaResolverParsedResponse {
  success: boolean;
  data?: string;
}

export const queryS3ClinicianRecordsBridge: (
  variables: QueryS3ClinicianRecordsBridgeNarrowedVariables
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

export const handlePatientAssignment: (
  variables: HandlePatientAssignmentNarrowedVariables
) => Promise<LambdaResolverParsedResponse> = async (variables) => {
  let typedResponse: LambdaResolverParsedResponse = {
    success: false
  };
  const response = (await API.graphql({
    query: queries.handlePatientAssignment,
    variables: variables
  })) as HandlePatientAssignmentResponse;
  if (response.data.handlePatientAssignment) {
    typedResponse = JSON.parse(response.data.handlePatientAssignment);
  }
  return typedResponse;
};
