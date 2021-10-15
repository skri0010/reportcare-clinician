import API from "@aws-amplify/api-graphql";
import { BaseResponse } from "aws";
import { Observable } from "zen-observable-ts";
import { AgentTrigger } from "rc_agents/trigger";
import { PatientAssignment } from "aws/API";
import { store } from "util/useRedux";

// Override default subscription otherwise null data will be received
// Requested fields should be a subset of CreateAlertNotification response fields
const onCreateAlertNotification = /* GraphQL */ `
  subscription OnCreateAlertNotification {
    onCreateAlertNotification {
      id
      patientID
      alertID
    }
  }
`;

export type AlertNotification = {
  id: string;
  patientID: string;
  alertID: string;
};

interface onCreateAlertNotificationResponse extends BaseResponse {
  value: { data: { onCreateAlertNotification?: AlertNotification | null } };
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
      id
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      adminReassignFromClinicianID
      adminCompleted
    }
  }
`;

const onUpdatePatientAssignment = /* GraphQL */ `
  subscription onUpdatePatientAssignment($clinicianID: String) {
    onUpdatePatientAssignment(clinicianID: $clinicianID) {
      id
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      adminReassignFromClinicianID
      adminCompleted
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
      error: (error) => console.log(error)
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
      error: (error) => console.log(error)
    });
  }
};
