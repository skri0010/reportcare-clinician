import { VersionKey, VersionKeyObject } from "aws";
import {
  CreateClinicianInfoInput,
  CreateClinicianProtectedInfoInput,
  CreateTodoInput,
  UpdateClinicianInfoInput,
  UpdateClinicianProtectedInfoInput,
  UpdatePatientInfoInput,
  UpdateTodoInput
} from "aws/API";

// == Create input types (omits version for the following inputs) ==

export type CreateVersionedClinicianInfoInput = Omit<
  CreateClinicianInfoInput,
  VersionKey
>;

export type CreateVersionedClinicianProtectedInfoInput = Omit<
  CreateClinicianProtectedInfoInput,
  VersionKey
>;

export type CreateVersionedTodoInput = Omit<CreateTodoInput, VersionKey>;

// == Update input types (makes version mandatory for the following inputs) ==

export type UpdateVersionedClinicianProtectedInfoInput = Omit<
  UpdateClinicianProtectedInfoInput,
  VersionKey
> &
  VersionKeyObject;

export type UpdateVersionedClinicianInfoInput = Omit<
  UpdateClinicianInfoInput,
  VersionKey
> &
  VersionKeyObject;

export type UpdateVersionedPatientInfoInput = Omit<
  UpdatePatientInfoInput,
  VersionKey
> &
  VersionKeyObject;

export type UpdateVersionedTodoInput = Omit<UpdateTodoInput, VersionKey> &
  VersionKeyObject;
