/* eslint-disable no-restricted-imports */
import API from "@aws-amplify/api";
import { BaseResponse } from "aws";
import {
  QueryS3ClinicianRecordsBridgeQuery,
  QueryS3ClinicianRecordsBridgeQueryVariables,
  HandlePatientAssignmentResolutionQuery,
  HandlePatientAssignmentResolutionQueryVariables,
  SharePatientAssignmentQueryVariables,
  SharePatientAssignmentQuery
} from "aws/API";
import * as queries from "aws/graphql/queries";
import { PatientAssignmentStatus } from "rc_agents/model";

interface QueryS3ClinicianRecordsBridgeResponse extends BaseResponse {
  data: QueryS3ClinicianRecordsBridgeQuery;
}

interface HandlePatientAssignmentResolutionResponse extends BaseResponse {
  data: HandlePatientAssignmentResolutionQuery;
}

interface SharePatientAssignmentResponse extends BaseResponse {
  data: SharePatientAssignmentQuery;
}

// Type created with reference to schema.graphql

export type ClinicianRecordType = "IcdCrt" | "Medical";
export const ClinicianRecordTypeConst: {
  [key in ClinicianRecordType]: ClinicianRecordType;
} = {
  IcdCrt: "IcdCrt",
  Medical: "Medical"
};
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

interface HandlePatientAssignmentResolutionNarrowedVariables
  extends HandlePatientAssignmentResolutionQueryVariables {
  patientID: string;
  resolution: PatientAssignmentStatus;
  reassignToClinicianID?: string;
}

export interface SharePatientAssignmentNarrowedVariables
  extends SharePatientAssignmentQueryVariables {
  patientID: string;
  patientName: string;
  shareToClinicianID: string;
}

// Type created with reference to amplify/backend/function/s3clinicianrecordsbridge/src/index
interface LambdaResolverParsedResponse {
  success: boolean;
  data?: string;
}

// == Lambda Resolver queries with types based on schema.graphql ==

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

export const handlePatientAssignmentResolution: (
  variables: HandlePatientAssignmentResolutionNarrowedVariables
) => Promise<LambdaResolverParsedResponse> = async (variables) => {
  let typedResponse: LambdaResolverParsedResponse = {
    success: false
  };
  const response = (await API.graphql({
    query: queries.handlePatientAssignmentResolution,
    variables: variables
  })) as HandlePatientAssignmentResolutionResponse;
  if (response.data.handlePatientAssignmentResolution) {
    typedResponse = JSON.parse(response.data.handlePatientAssignmentResolution);
  }
  return typedResponse;
};

export const sharePatientAssignment: (
  variables: SharePatientAssignmentNarrowedVariables
) => Promise<LambdaResolverParsedResponse> = async (variables) => {
  let typedResponse: LambdaResolverParsedResponse = {
    success: false
  };
  const response = (await API.graphql({
    query: queries.sharePatientAssignment,
    variables: variables
  })) as SharePatientAssignmentResponse;
  if (response.data.sharePatientAssignment) {
    typedResponse = JSON.parse(response.data.sharePatientAssignment);
  }
  return typedResponse;
};
