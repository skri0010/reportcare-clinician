import { LambdaResolverEvent, OptionalString } from "./api/lamdaResolverTypes";

// == Exported types ==
export interface QueryEvent extends LambdaResolverEvent {
  typeName: "Query";
  fieldName: "queryS3ClinicianRecordsBridge" | OptionalString;
  arguments: ArgumentsType;
}

interface MutationEvent extends LambdaResolverEvent {
  typeName: "Mutation";
}

export type ExpectedEvent = QueryEvent | MutationEvent;

export enum QueryArgument {
  recordType = "recordType",
  operation = "operation",
  patientID = "patientID",
  documentID = "documentID",
  documentTitle = "documentTitle"
}

export type RecordType = "IcdCrt" | "Medical";
type Operation = "Upload" | "Download" | "Acknowledge" | "Delete";

// Query arguments type to be checked
export type ArgumentsType = {
  [QueryArgument.recordType]: RecordType | OptionalString;
  [QueryArgument.operation]: Operation | OptionalString;
  [QueryArgument.patientID]: OptionalString;
  [QueryArgument.documentID]: OptionalString;
  [QueryArgument.documentTitle]: OptionalString;
};

// Used after confirming QueryArgumentsType
export type VerifiedArgumentsType = {
  [QueryArgument.recordType]: RecordType;
  [QueryArgument.operation]: Operation | OptionalString;
  [QueryArgument.patientID]: string;
  [QueryArgument.documentID]: string;
  [QueryArgument.documentTitle]: string;
};

// == GraphQL ==

export const AppSyncUrl = process.env.API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT;

type ErrorsArray = {
  locations: [{ line: number; column: number; sourceName: string }];
  message: string;
  path: string;
}[];

export interface BaseResponse {
  errors?: ErrorsArray;
}

// == S3 ==

export const S3Prefixes = ["IcdCrt", "Medical"];
export const S3Level = "private";
