// This React FC is used to perform hook updates necessary to update the entire app
import { refreshSettings } from "ic-redux/actions/settings/actionCreator";
import React, { FC, useEffect } from "react";
import { RootState, select, useDispatch } from "util/useRedux";

export const ProvidedStoreWrapper: FC = ({ children }) => {
  const { refreshed } = select((state: RootState) => ({
    refreshed: state.settings.refreshed
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("ProvidedStoreWrapper: Refreshed settings");
    if (!refreshed) {
      dispatch(refreshSettings());
    }
  }, [refreshed, dispatch]);

  return <>{children}</>;
};
