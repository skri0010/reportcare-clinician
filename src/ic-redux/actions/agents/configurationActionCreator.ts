import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";

export const setConfiguringPatient = createAction(
  actionNames.SET_CONFIGURING_PATIENT,
  (configuringPatient: boolean) => ({
    configuringPatient: configuringPatient
  })
)();

export const setConfigurationSuccessful = createAction(
  actionNames.SET_CONFIGURATION_SUCCESSFUL,
  (configurationSuccessful: boolean) => ({
    configurationSuccessful: configurationSuccessful
  })
)();
