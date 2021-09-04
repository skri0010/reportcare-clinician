import API from "@aws-amplify/api-graphql";
import { BaseResponse } from "aws";
import {
  triggerProcessAlertNotification,
  triggerProcessPatientAssignmentSubscription
} from "rc_agents/triggers";
import { Observable } from "zen-observable-ts";
import { Storage } from "rc_agents/storage";

// Override default subscription otherwise null data will be received
// Requested fields should be a subset of CreateAlertNotification input fields
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
  value: { data: { onCreateAlertNotification: AlertNotification } };
}

export const subscribeAlertNotification = (): void => {
  (
    API.graphql({
      query: onCreateAlertNotification
    }) as Observable<any>
  ).subscribe({
    next: (response: onCreateAlertNotificationResponse) =>
      // Trigger ALA to process AlertNotification
      triggerProcessAlertNotification(
        response.value.data.onCreateAlertNotification
      ),
    // eslint-disable-next-line no-console
    error: (error) => console.log(error)
  });
};

const onCreatePatientAssignment = /* GraphQL */ `
  subscription OnCreatePatientAssignment($clinicianID: String) {
    onCreatePatientAssignment(clinicianID: $clinicianID) {
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
  value: { data: { onCreatePatientAssignment: PatientAssignmentSubscription } };
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
        // Trigger DTA to process patient assignment subscription
        triggerProcessPatientAssignmentSubscription(
          response.value.data.onCreatePatientAssignment
        );
      },
      // eslint-disable-next-line no-console
      error: (error) => console.log(error)
    });
  }
};
