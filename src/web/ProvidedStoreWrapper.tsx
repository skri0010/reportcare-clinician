// This React FC is used to perform hook updates necessary to update the entire app
import {
  subscribeAlertNotification,
  subscribePatientAssignment
} from "aws/TypedAPI/subscriptions";
import { refreshSettings } from "ic-redux/actions/settings/actionCreator";
import React, { FC, useEffect } from "react";
import { RootState, select, useDispatch } from "util/useRedux";

export const ProvidedStoreWrapper: FC = ({ children }) => {
  const { refreshed, clinicianID } = select((state: RootState) => ({
    refreshed: state.settings.refreshed,
    clinicianID: state.clinicians.clinician?.clinicianID
  }));

  const dispatch = useDispatch();

  // Subscriptions
  useEffect(() => {
    // Subscribes to AlertNotification table
    subscribeAlertNotification();
  }, []);

  useEffect(() => {
    if (clinicianID) {
      // Subscribes to PatientAssignment table
      subscribePatientAssignment(clinicianID);
    }
  }, [clinicianID]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("ProvidedStoreWrapper: Refreshed settings");
    if (!refreshed) {
      dispatch(refreshSettings());
    }
  }, [refreshed, dispatch]);

  return <>{children}</>;
};
