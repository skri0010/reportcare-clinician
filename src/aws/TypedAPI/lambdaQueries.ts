/* eslint-disable no-restricted-imports */
import API from "@aws-amplify/api";
import { BaseResponse } from "aws";
import {
  GetPresignedUrlForClinicianRecordsQuery,
  GetPresignedUrlForClinicianRecordsQueryVariables
} from "aws/API";
import * as queries from "aws/graphql/queries";

interface GetClinicianInfoResponse extends BaseResponse {
  data: GetPresignedUrlForClinicianRecordsQuery;
}

// Type created with reference to schema.graphql

export type PresignedUrlRecordType = "IcdCrt" | "Medical";
export type PresignedUrlOperation = "Upload" | "Download" | "Acknowledge";
interface PresignedUrlObjectVariables
  extends GetPresignedUrlForClinicianRecordsQueryVariables {
  recordType: PresignedUrlRecordType;
  operation: PresignedUrlOperation;
  patientID: string;
  documentID: string;
  documentTitle: string;
}

// Type created with reference to amplify/backend/function/s3clinicianrecordsbridge/src/index
interface PresignedUrlObjectResponse {
  success: boolean;
  url?: string;
}

export const getPresignedUrlForClinicianRecords: (
  variables: PresignedUrlObjectVariables
) => Promise<PresignedUrlObjectResponse> = async (variables) => {
  let typedResponse: PresignedUrlObjectResponse = {
    success: false
  };
  const response = (await API.graphql({
    query: queries.getPresignedUrlForClinicianRecords,
    variables: variables
  })) as GetClinicianInfoResponse;
  if (response.data.getPresignedUrlForClinicianRecords) {
    typedResponse = JSON.parse(
      response.data.getPresignedUrlForClinicianRecords
    );
  }
  return typedResponse;
};
