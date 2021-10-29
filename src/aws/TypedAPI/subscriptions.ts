import API from "@aws-amplify/api-graphql";
import { BaseResponse } from "aws";
import { Observable } from "zen-observable-ts";
import { AgentTrigger } from "rc_agents/trigger";
import {
  OnCreateAlertNotificationSubscription,
  PatientAssignment
} from "aws/API";
import { store } from "util/useRedux";
import { prettify } from "util/utilityFunctions";
import { onCreateAlertNotification } from "aws/graphql/subscriptions";

export type AlertNotification = {
  id: string;
  patientID: string;
  alertID: string;
};

interface onCreateAlertNotificationResponse extends BaseResponse {
  value: { data: OnCreateAlertNotificationSubscription };
}

export const subscribeAlertNotification = (): void => {
  (
    API.graphql({
      query: onCreateAlertNotification
    }) as Observable<any>
  ).subscribe({
    next: (response: onCreateAlertNotificationResponse) => {
      const alertNotification = response.value.data.onCreateAlertNotification;
      if (alertNotification) {
        // Trigger ALA to process AlertNotification
        AgentTrigger.triggerProcessAlertNotification(alertNotification);
      }
    },
    // eslint-disable-next-line no-console
    error: (error) => console.log(error)
  });
};

// https://docs.amplify.aws/cli/graphql-transformer/auth/#authorizing-subscriptions
// Requested fields should be a subset of CreatePatientAssignment response fields
// Note:  $clinicianID is the chosen owner for owner-based authorization

const onCreatePatientAssignment = /* GraphQL */ `
  subscription onCreatePatientAssignment($clinicianID: String) {
    onCreatePatientAssignment(clinicianID: $clinicianID) {
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      sourceClinicianID
      createdAt
      updatedAt
    }
  }
`;

const onUpdatePatientAssignment = /* GraphQL */ `
  subscription onUpdatePatientAssignment($clinicianID: String) {
    onUpdatePatientAssignment(clinicianID: $clinicianID) {
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      sourceClinicianID
      createdAt
      updatedAt
    }
  }
`;

interface onCreatePatientAssignmentResponse extends BaseResponse {
  value: {
    data: { onCreatePatientAssignment?: PatientAssignment | null };
  };
}

interface onUpdatePatientAssignmentResponse extends BaseResponse {
  value: {
    data: { onUpdatePatientAssignment?: PatientAssignment | null };
  };
}

export const subscribePatientAssignment = async (): Promise<void> => {
  // Subscribe with clinicianID as owner
  const clinicianID = store.getState().clinicians.clinician;

  if (clinicianID) {
    // Subscribe to created patient assignments
    (
      API.graphql({
        query: onCreatePatientAssignment,
        variables: { clinicianID: clinicianID }
      }) as Observable<any>
    ).subscribe({
      next: (response: onCreatePatientAssignmentResponse) => {
        // Trigger DTA to process patient assignment subscription
        const patientAssignment = response.value.data.onCreatePatientAssignment;

        if (patientAssignment) {
          AgentTrigger.triggerProcessPatientAssignmentSubscription(
            patientAssignment
          );
        }
      },
      // eslint-disable-next-line no-console
      error: (error) => console.log(prettify(error))
    });

    // Subscribe to updated patient assignments
    (
      API.graphql({
        query: onUpdatePatientAssignment,
        variables: { clinicianID: clinicianID }
      }) as Observable<any>
    ).subscribe({
      next: (response: onUpdatePatientAssignmentResponse) => {
        // Trigger DTA to process patient assignment subscription
        const patientAssignment = response.value.data.onUpdatePatientAssignment;
        if (patientAssignment) {
          // Trigger DTA to process patient assignment subscription
          AgentTrigger.triggerProcessPatientAssignmentSubscription(
            patientAssignment
          );
        }
      },
      // eslint-disable-next-line no-console
      error: (error) => console.log(prettify(error))
    });
  }
};
