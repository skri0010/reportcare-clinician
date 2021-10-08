export type StringObject = { S: string };
export type NumberObject = { N: string };
export type BoolObject = { BOOL: boolean };

export type EventString = StringObject | undefined;
export type EventNumber = NumberObject | undefined;

// Note: GraphQL operations use IAM authentication
export const AppSyncUrl = process.env.API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT;

// Enum

export enum Resolution {
  APPROVED = "APPROVED",
  REASSIGNED = "REASSIGNED"
}

export enum Pending {
  PENDING = "PENDING"
}

export interface PromiseResolution {
  success: boolean;
  message: string;
}

// Event

export type ResolutionEvent = {
  Records?: (TargetRecord | OtherRecord)[];
};

export const resolutionValues = Object.values(Resolution);
export type TargetRecord = {
  eventID: string;
  eventName: "MODIFY";
  eventVersion: string;
  eventSource: "aws:dynamodb";
  awsRegion: string;
  dynamodb: PatientAssignmentDynamoDBObject;
  SequenceNumber: string;
  SizeBytes: number;
  StreamViewType: string;
};

type OtherRecord = { eventName: null };

interface PatientAssignmentDynamoDBObject {
  ApproximateCreationDateTime: number;
  Keys: PatientAssignmentKeys;
  NewImage: PatientAssignmentImage;
  OldImage: PatientAssignmentImage;
}

interface PatientAssignmentKeys {
  patientID: EventString;
  clinicianID: EventString;
}

interface PatientAssignmentImage {
  createdAt: EventString;
  patientName: EventString;
  _lastChangedAt: EventNumber;
  patientID: EventString;
  __typename: EventString;
  clinicianID: EventString;
  id: EventString;
  _version: EventNumber;
  resolution: EventString;
  pending: EventString;
  updatedAt: EventString;
  reassignToClinicianID: EventString;
}

// GraphQL

type ErrorsArray = {
  locations: [{ line: number; column: number; sourceName: string }];
  message: string;
  path: string;
}[];

export interface BaseResponse {
  errors?: ErrorsArray;
}
