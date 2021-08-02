import API from "@aws-amplify/api-graphql";
// eslint-disable-next-line no-restricted-imports
import * as mutations from "aws/graphql/mutations";
import { BaseResponse } from "aws";
import {
  ClinicianInfo,
  UpdateClinicianInfoInput,
  UpdateClinicianProtectedInfoInput,
  PatientInfo,
  UpdatePatientInfoInput,
  PatientAssignment,
  UpdatePatientAssignmentInput
} from "aws/API";

// JH-TODO: Check if the return types are correct

interface UpdateClinicianInfoResponse extends BaseResponse {
  data: { updateClinicianInfo?: ClinicianInfo };
}

export const updateClinicianInfo = async (
  input: UpdateClinicianInfoInput
): Promise<UpdateClinicianInfoResponse> => {
  return (await API.graphql({
    query: mutations.updateClinicianInfo,
    variables: { input: input }
  })) as UpdateClinicianInfoResponse;
};

// JH-TODO: Not sure if this is the correct return type
interface UpdateClinicianProtectedInfoResponse extends BaseResponse {
  data: { updatedClinicianInfo?: ClinicianInfo };
}

export const updateClinicianProtectedInfo = async (
  input: UpdateClinicianProtectedInfoInput
): Promise<UpdateClinicianProtectedInfoResponse> => {
  return (await API.graphql({
    query: mutations.updateClinicianProtectedInfo,
    variables: { input: input }
  })) as UpdateClinicianProtectedInfoResponse;
};

interface UpdatePatientInfoResponse extends BaseResponse {
  data: { updatePatientInfo?: PatientInfo };
}

export const updatePatientInfo = async (
  input: UpdatePatientInfoInput
): Promise<UpdatePatientInfoResponse> => {
  return (await API.graphql({
    query: mutations.updatePatientInfo,
    variables: { input: input }
  })) as UpdatePatientInfoResponse;
};

interface UpdatePatientAssignmentResponse extends BaseResponse {
  data: { updatePatientAssignment?: PatientAssignment };
}

export const updatePatientAssignment = async (
  input: UpdatePatientAssignmentInput
): Promise<UpdatePatientAssignmentResponse> => {
  return (await API.graphql({
    query: mutations.updatePatientAssignment,
    variables: { input: input }
  })) as UpdatePatientAssignmentResponse;
};
