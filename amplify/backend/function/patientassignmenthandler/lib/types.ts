import { LambdaResolverEvent, OptionalString } from "./api/lamdaResolverTypes";

export const AppSyncUrl = process.env.API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT;

// == Enum ==

export enum Resolution {
  APPROVED = "APPROVED",
  REASSIGNED = "REASSIGNED"
}

export const Pending = "PENDING";

export const enum FieldName {
  HANDLE_PATIENT_ASSIGNMENT_RESOLUTION = "handlePatientAssignmentResolution",
  SHARE_PATIENT_ASSIGNMENT = "sharePatientAssignment"
}

// == Query types ==
interface HandlePatientAssignmentResolutionQuery extends LambdaResolverEvent {
  typeName: "Query";
  fieldName: FieldName.HANDLE_PATIENT_ASSIGNMENT_RESOLUTION;
  arguments: HandlePatientAssignmentResolutionArguments;
}

interface SharePatientAssignmentQuery extends LambdaResolverEvent {
  typeName: "Query";
  fieldName: FieldName.SHARE_PATIENT_ASSIGNMENT;
  arguments: SharePatientAssignmentArguments;
}

// == Narrowed query arguments type ==
type HandlePatientAssignmentResolutionArguments = {
  patientID: OptionalString;
  resolution: OptionalString;
  reassignToClinicianID: OptionalString;
};

type SharePatientAssignmentArguments = {
  patientID: OptionalString;
  patientName: OptionalString;
  shareToClinicianID: OptionalString;
};

// == Exported event ==
export type QueryEvent =
  | HandlePatientAssignmentResolutionQuery
  | SharePatientAssignmentQuery;

interface MutationEvent extends LambdaResolverEvent {
  typeName: "Mutation";
}

export type ExpectedEvent = QueryEvent | MutationEvent;

// == GraphQL ==

type ErrorsArray = {
  locations: [{ line: number; column: number; sourceName: string }];
  message: string;
  path: string;
}[];

export interface BaseResponse {
  errors?: ErrorsArray;
}
