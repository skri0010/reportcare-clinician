import API from "@aws-amplify/api-graphql";
import { BaseResponse } from "aws";
import { Observable } from "zen-observable-ts";
import { AgentTrigger } from "rc_agents/trigger";
import {
  OnCreateAlertNotificationSubscription,
  PatientAssignment
} from "aws/API";
import { prettify } from "util/utilityFunctions";

export type AlertNotification = {
  id: string;
  patientID: string;
  alertID: string;
};

interface onCreateAlertNotificationResponse extends BaseResponse {
  value: { data: OnCreateAlertNotificationSubscription };
}

// Reference: https://docs.amplify.aws/cli/graphql-transformer/auth/#authorizing-subscriptions

// Requested fields should be a subset of CreateAlertNotification response fields
// Note: We do not include parameters in this subscription
const onCreateAlertNotification = /* GraphQL */ `
  subscription OnCreateAlertNotification {
    onCreateAlertNotification {
      id
      patientID
      alertID
      createdAt
      updatedAt
    }
  }
`;

export const subscribeAlertNotification = async (): Promise<void> => {
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

// Requested fields should be a subset of CreatePatientAssignment response fields
// Note: $clinicianID is the chosen owner for owner-based authorization
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

// Requested fields should be a subset of UpdatePatientAssignment response fields
// Note: $clinicianID is the chosen owner for owner-based authorization
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

export const subscribePatientAssignment = async (
  clinicianID: string
): Promise<void> => {
  // Subscribe with clinicianID as owner
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
