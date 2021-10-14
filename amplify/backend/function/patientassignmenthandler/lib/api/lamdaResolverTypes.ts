export type OptionalString = string | undefined;
export type OptionalNumber = number | undefined;
export type OptionalObject = { [key: string]: OptionalString };

export interface LambdaResolverEvent {
  typeName: "Query" | "Mutation"; // GraphQL @function type (Dynamically filled)
  fieldName: OptionalString; // GraphQL @function name (Dynamically filled)
  arguments: OptionalObject; // GraphQL arguments (Dynamically filled)
  identity: IdentityType; // AppSync identity object
  source: OptionalString; // Object returned by parent resolver
  request: RequestType; // AppSync request object
  prev: OptionalObject; // Unused: If using the built-in pipeline resolver support, this contains the object returned by the previous function
}

// == Default types ==
type IdentityType = {
  sub: OptionalString;
  issuer: OptionalString;
  username: OptionalString;
  sourceIp: OptionalString;
  claims: ClaimsType;
  defaultAuthStrategy: OptionalString;
  groups: string[];
};

type ClaimsType = {
  sub: OptionalString;
  "cognito:groups": OptionalString[];
  email_verified: OptionalString;
  algorithm: OptionalString;
  iss: OptionalString;
  "cognito:roles": OptionalString[];
  "cognito:username": OptionalString;
  username: OptionalString;
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
