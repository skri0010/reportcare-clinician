import API from "@aws-amplify/api-graphql";
// eslint-disable-next-line no-restricted-imports
import * as mutations from "aws/graphql/mutations";
import { BaseResponse, incrementVersion, VERSION_KEY } from "aws";
import {
  ClinicianInfo,
  PatientInfo,
  Alert,
  UpdateAlertInput,
  Todo,
  PatientAssignment,
  UpdatePatientAssignmentInput,
  MedicationInfo,
  UpdateMedicationInfoInput
} from "aws/API";
import {
  UpdateVersionedClinicianInfoInput,
  UpdateVersionedClinicianProtectedInfoInput,
  UpdateVersionedPatientInfoInput,
  UpdateVersionedTodoInput
} from "./versionedTypes";

// == Update mutations ==
interface UpdateClinicianInfoResponse extends BaseResponse {
  data: { updateClinicianInfo?: ClinicianInfo };
}

export const updateClinicianInfo = async (
  input: UpdateVersionedClinicianInfoInput
): Promise<UpdateClinicianInfoResponse> => {
  return (await API.graphql({
    query: mutations.updateClinicianInfo,
    variables: { input: incrementVersion(input, input[VERSION_KEY]) }
  })) as UpdateClinicianInfoResponse;
};

interface UpdateMedicationInfoResponse extends BaseResponse {
  data: { updateMedicationInfo?: MedicationInfo };
}

export const updateMedicationInfo = async (
  input: UpdateMedicationInfoInput
): Promise<UpdateMedicationInfoResponse> => {
  return (await API.graphql({
    query: mutations.updateMedicationInfo,
    variables: { input: input }
  })) as UpdateMedicationInfoResponse;
};

interface UpdateClinicianProtectedInfoResponse extends BaseResponse {
  data: { updatedClinicianInfo?: ClinicianInfo };
}

export const updateClinicianProtectedInfo = async (
  input: UpdateVersionedClinicianProtectedInfoInput
): Promise<UpdateClinicianProtectedInfoResponse> => {
  return (await API.graphql({
    query: mutations.updateClinicianProtectedInfo,
    variables: { input: incrementVersion(input, input[VERSION_KEY]) }
  })) as UpdateClinicianProtectedInfoResponse;
};

interface UpdatePatientInfoResponse extends BaseResponse {
  data: { updatePatientInfo?: PatientInfo };
}

export const updatePatientInfo = async (
  input: UpdateVersionedPatientInfoInput
): Promise<UpdatePatientInfoResponse> => {
  return (await API.graphql({
    query: mutations.updatePatientInfo,
    variables: { input: incrementVersion(input, input[VERSION_KEY]) }
  })) as UpdatePatientInfoResponse;
};

interface UpdateAlertResponse extends BaseResponse {
  data: { updateAlert?: Alert };
}

export const updateAlert = async (
  input: UpdateAlertInput
): Promise<UpdateAlertResponse> => {
  return (await API.graphql({
    query: mutations.updateAlert,
    variables: { input: input }
  })) as UpdateAlertResponse;
};

interface UpdateTodoResponse extends BaseResponse {
  data: { updateTodo?: Todo };
}

export const updateTodo = async (
  input: UpdateVersionedTodoInput
): Promise<UpdateTodoResponse> => {
  return (await API.graphql({
    query: mutations.updateTodo,
    variables: { input: incrementVersion(input, input[VERSION_KEY]) }
  })) as UpdateTodoResponse;
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
