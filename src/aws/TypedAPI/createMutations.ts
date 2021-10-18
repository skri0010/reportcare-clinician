import API from "@aws-amplify/api-graphql";
// eslint-disable-next-line no-restricted-imports
import * as mutations from "aws/graphql/mutations";
import { BaseResponse } from "aws";
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
  CreateMedicationInfoInput,
  MedicalRecord,
  CreateMedicalRecordInput,
  IcdCrtRecord,
  CreateIcdCrtRecordInput
} from "aws/API";

interface CreateClinicianInfoResponse extends BaseResponse {
  data: { createClinicianInfo?: ClinicianInfo };
}

export const createClinicianInfo = async (
  input: CreateClinicianInfoInput
): Promise<CreateClinicianInfoResponse> => {
  return (await API.graphql({
    query: mutations.createClinicianInfo,
    variables: { input: input }
  })) as CreateClinicianInfoResponse;
};

interface CreateClinicianProtectedInfoResponse extends BaseResponse {
  data: { createClinicianProtectedInfo?: ClinicianProtectedInfo };
}

export const createClinicianProtectedInfo = async (
  input: CreateClinicianProtectedInfoInput
): Promise<CreateClinicianProtectedInfoResponse> => {
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
  input: CreateTodoInput
): Promise<CreateTodoResponse> => {
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

interface CreateMedicalRecordResponse extends BaseResponse {
  data: { createMedicalRecord?: MedicalRecord };
}

export const createMedicalRecord = async (
  input: CreateMedicalRecordInput
): Promise<CreateMedicalRecordResponse> => {
  return (await API.graphql({
    query: mutations.createMedicalRecord,
    variables: { input: input }
  })) as CreateMedicalRecordResponse;
};

interface CreateIcdCrtRecordResponse extends BaseResponse {
  data: { createIcdCrtRecord?: IcdCrtRecord };
}

export const createIcdCrtRecord = async (
  input: CreateIcdCrtRecordInput
): Promise<CreateIcdCrtRecordResponse> => {
  return (await API.graphql({
    query: mutations.createIcdCrtRecord,
    variables: { input: input }
  })) as CreateIcdCrtRecordResponse;
};
