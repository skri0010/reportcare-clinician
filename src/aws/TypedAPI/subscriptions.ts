import API from "@aws-amplify/api-graphql";
import { BaseResponse } from "aws";
import { triggerProcessAlertNotification } from "rc_agents/triggers";
import { Observable, ZenObservable } from "zen-observable-ts";

// Override default subscription otherwise null data error will be thrown
// Requested fields should be exactly identical to CreateAlert input fields excluding owner
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

export const subscribeAlertNotification = (): ZenObservable.Subscription => {
  return (
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
