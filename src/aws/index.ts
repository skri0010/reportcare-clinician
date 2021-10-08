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

export const StorageFolderPath = {
  ICDCRT_RECORDS: "icdcrt-records/",
  MEDICAL_RECORDS: "medical-records/"
};
