import { LambdaResolverEvent, OptionalString } from "./api/lamdaResolverTypes";

export const AppSyncUrl = process.env.API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT;

// == Enum ==

export enum Resolution {
  APPROVED = "APPROVED",
  REASSIGNED = "REASSIGNED"
}

export const Pending = "PENDING";

// == Exported types ==
export interface QueryEvent extends LambdaResolverEvent {
  typeName: "Query";
  fieldName: "handlePatientAssignment" | OptionalString;
  arguments: ArgumentsType;
}

interface MutationEvent extends LambdaResolverEvent {
  typeName: "Mutation";
}

export type ExpectedEvent = QueryEvent | MutationEvent;

export enum QueryArgument {
  patientID = "patientID",
  resolution = "resolution",
  reassignToClinicianID = "reassignToClinicianID"
}

// Query arguments type to be checked
export type ArgumentsType = { [key in QueryArgument]: string };

// == Others ==
export interface EventResponse {
  success: boolean;
  data?: string;
}

// == GraphQL ==

type ErrorsArray = {
  locations: [{ line: number; column: number; sourceName: string }];
  message: string;
  path: string;
}[];

export interface BaseResponse {
  errors?: ErrorsArray;
}
