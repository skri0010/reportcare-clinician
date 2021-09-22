import API from "@aws-amplify/api-graphql";
import { BaseResponse } from "aws";
import {
  triggerProcessAlertNotification,
  triggerProcessPatientAssignmentSubscription
} from "rc_agents/triggers";
import { Observable } from "zen-observable-ts";
import { Storage } from "rc_agents/storage";

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
        triggerProcessAlertNotification(alertNotification);
      }
    },
    // eslint-disable-next-line no-console
    error: (error) => console.log(error)
  });
};

// Requested fields should be a subset of CreatePatientAssignment response fields
const onCreatePatientAssignment = /* GraphQL */ `
  subscription OnCreatePatientAssignment {
    onCreatePatientAssignment {
      patientID
      clinicianID
    }
  }
`;

export type PatientAssignmentSubscription = {
  patientID: string;
  clinicianID: string;
};

interface onCreatePatientAssignmentResponse extends BaseResponse {
  value: {
    data: { onCreatePatientAssignment?: PatientAssignmentSubscription | null };
  };
}

export const subscribePatientAssignment = async (): Promise<void> => {
  // Retrieves locally stored clinicianID
  const clinicianID = await Storage.getClinicianID();
  if (clinicianID) {
    (
      API.graphql({
        query: onCreatePatientAssignment,
        variables: { clinicianID: clinicianID }
      }) as Observable<any>
    ).subscribe({
      next: (response: onCreatePatientAssignmentResponse) => {
        const patientAssignment = response.value.data.onCreatePatientAssignment;
        if (patientAssignment) {
          // Trigger DTA to process patient assignment subscription
          triggerProcessPatientAssignmentSubscription(patientAssignment);
        }
      },
      // eslint-disable-next-line no-console
      error: (error) => console.log(error)
    });
  }
};
