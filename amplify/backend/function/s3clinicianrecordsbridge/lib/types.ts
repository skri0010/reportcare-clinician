type OptionalString = string | undefined;
type OptionalNumber = number | undefined;
export type OptionalObject = { [key: string]: OptionalString };

// Function type, name, arguments and return type must match in schema.graphql
interface Event {
  typeName: "Query" | "Mutation"; // GraphQL @function type (Dynamically filled)
  fieldName: OptionalString; // GraphQL @function name (Dynamically filled)
  arguments: OptionalObject; // GraphQL arguments (Dynamically filled)
  identity: IdentityType; // AppSync identity object
  source: OptionalString; // Object returned by parent resolver
  request: RequestType; // AppSync request object
  prev: OptionalObject; // Unused: If using the built-in pipeline resolver support, this contains the object returned by the previous function
}

// == Exported types ==
export interface QueryEvent extends Event {
  typeName: "Query";
  fieldName: "getPresignedUrlForClinicianRecords" | OptionalString;
  arguments: QueryArgumentsType;
}

interface MutationEvent extends Event {
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

type QueryArgumentsType = {
  [QueryArgument.recordType]: "IcdCrt" | "Medical" | OptionalString;
  [QueryArgument.operation]:
    | "Upload"
    | "Download"
    | "Acknowledge"
    | OptionalString;
  [QueryArgument.patientID]: OptionalString;
  [QueryArgument.documentID]: OptionalString;
  [QueryArgument.documentTitle]: OptionalString;
};

// == Default types ==
type IdentityType = {
  sub: OptionalString;
  issuer: OptionalString;
  "cognito:username": OptionalString;
  username: OptionalString;
  sourceIp: OptionalString;
  claims: ClaimsType;
  defaultAuthStrategy: OptionalString;
};

type ClaimsType = {
  sub: OptionalString;
  "cognito:groups": OptionalString[];
  email_verified: OptionalString;
  algorithm: OptionalString;
  iss: OptionalString;
  "cognito:roles": OptionalString[];
  aud: OptionalString;
  event_id: OptionalString;
  token_use: OptionalString;
  phone_number: OptionalString;
  exp: OptionalString;
  email: OptionalString;
  auth_time: OptionalNumber;
  iat: OptionalNumber;
};

type RequestType = {
  headers: {
    host: OptionalString;
    connection: OptionalString;
    "content-length": OptionalString;
    accept: OptionalString;
    authorization: OptionalString;
    "user-agent": OptionalString;
    "content-type": OptionalString;
    origin: OptionalString;
    referer: OptionalString;
    "accept-encoding": OptionalString;
    "accept-language": OptionalString;
    dnt: OptionalString;
  };
};

// == GraphQL ==

// Note: GraphQL operations use IAM authentication
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

// == Others ==
export interface PresignedUrlObjectResponse {
  success: boolean;
  url?: string;
}
