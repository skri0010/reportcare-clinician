// Exports typed API functions
export * from "aws/TypedAPI/getQueries";
export * from "aws/TypedAPI/listQueries";
export * from "aws/TypedAPI/createMutations";
export * from "aws/TypedAPI/updateMutations";

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