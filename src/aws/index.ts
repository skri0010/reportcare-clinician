// Exports typed API functions
export * from "aws/TypedAPI/getQueries";
export * from "aws/TypedAPI/listQueries";
export * from "aws/TypedAPI/createMutations";
export * from "aws/TypedAPI/updateMutations";
export * from "aws/TypedAPI/lambdaQueries";

type ErrorsArray = [
  {
    locations: [{ line: number; column: number; sourceName: string }];
    message: string;
    path: string;
  }
];

export interface BaseResponse {
  error: ErrorsArray;
}

export const VERSION_KEY = "version";

export type VersionKey = typeof VERSION_KEY;

export type VersionKeyObject = {
  [VERSION_KEY]: number;
};

export const NEW_VERSION = 1;

export const incrementVersion = (
  input: { [key: string]: any },
  currentVersion: number
): { [key: string]: any } => ({ ...input, version: currentVersion + 1 });
