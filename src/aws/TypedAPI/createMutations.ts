import API from "@aws-amplify/api-graphql";
// eslint-disable-next-line no-restricted-imports
import * as mutations from "aws/graphql/mutations";
import { BaseResponse, NEW_VERSION } from "aws";
import {
  ClinicianInfo,
  CreateClinicianInfoInput,
  ClinicianProtectedInfo,
  CreateClinicianProtectedInfoInput,
  ClinicianPatientMap,
  CreateClinicianPatientMapInput,
  Todo,
  CreateTodoInput,
  PatientAssignment,
  CreatePatientAssignmentInput,
  MedicationInfo,
  CreateMedicationInfoInput
} from "aws/API";
import {
  CreateVersionedClinicianInfoInput,
  CreateVersionedClinicianProtectedInfoInput,
  CreateVersionedTodoInput
} from "./versionedTypes";

// == Create mutations ==

interface CreateClinicianInfoResponse extends BaseResponse {
  data: { createClinicianInfo?: ClinicianInfo };
}

export const createClinicianInfo = async (
  inputWithoutVersion: CreateVersionedClinicianInfoInput
): Promise<CreateClinicianInfoResponse> => {
  // Insert new version
  const input: CreateClinicianInfoInput = {
    ...inputWithoutVersion,
    version: NEW_VERSION
  };
  return (await API.graphql({
    query: mutations.createClinicianInfo,
    variables: { input: input }
  })) as CreateClinicianInfoResponse;
};

interface CreateClinicianProtectedInfoResponse extends BaseResponse {
  data: { createClinicianProtectedInfo?: ClinicianProtectedInfo };
}

export const createClinicianProtectedInfo = async (
  inputWithoutVersion: CreateVersionedClinicianProtectedInfoInput
): Promise<CreateClinicianProtectedInfoResponse> => {
  // Insert new version
  const input: CreateClinicianProtectedInfoInput = {
    ...inputWithoutVersion,
    version: NEW_VERSION
  };
  return (await API.graphql({
    query: mutations.createClinicianProtectedInfo,
    variables: { input: input }
  })) as CreateClinicianProtectedInfoResponse;
};

interface CreateClinicianPatientMapResponse extends BaseResponse {
  data: { createClinicianPatientMap?: ClinicianPatientMap };
}

export const createClinicianPatientMap = async (
  input: CreateClinicianPatientMapInput
): Promise<CreateClinicianPatientMapResponse> => {
  return (await API.graphql({
    query: mutations.createClinicianPatientMap,
    variables: { input: input }
  })) as CreateClinicianPatientMapResponse;
};

interface CreateTodoResponse extends BaseResponse {
  data: { createTodo?: Todo };
}

export const createTodo = async (
  inputWithoutVersion: CreateVersionedTodoInput
): Promise<CreateTodoResponse> => {
  // Insert new version
  const input: CreateTodoInput = {
    ...inputWithoutVersion,
    version: NEW_VERSION
  };
  return (await API.graphql({
    query: mutations.createTodo,
    variables: { input: input }
  })) as CreateTodoResponse;
};
interface CreatePatientAssignmentResponse extends BaseResponse {
  data: { createPatientAssignment?: PatientAssignment };
}

export const createPatientAssignment = async (
  input: CreatePatientAssignmentInput
): Promise<CreatePatientAssignmentResponse> => {
  return (await API.graphql({
    query: mutations.createPatientAssignment,
    variables: { input: input }
  })) as CreatePatientAssignmentResponse;
};

interface CreateMedicationInfoResponse extends BaseResponse {
  data: { createMedicationInfo?: MedicationInfo };
}

export const createMedicationInfo = async (
  input: CreateMedicationInfoInput
): Promise<CreateMedicationInfoResponse> => {
  return (await API.graphql({
    query: mutations.createMedicationInfo,
    variables: { input: input }
  })) as CreateMedicationInfoResponse;
};
