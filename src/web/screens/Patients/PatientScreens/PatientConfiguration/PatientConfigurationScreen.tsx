import React, { FC, useState, useEffect, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { TextField } from "components/InputComponents/TextField";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import i18n from "util/language/i18n";
import { PatientInfo } from "aws/API";
import cloneDeep from "lodash/cloneDeep";
import {
  notEmptyString,
  validateFluidIntakeGoal,
  validateHospitalName,
  validateNYHAClass,
  validateTargetActivity,
  validateTargetWeight
} from "util/validation";
import { ms, ScaledSheet } from "react-native-size-matters";
import { CheckboxText } from "components/InputComponents/CheckboxText";
import { H3 } from "components/Text";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RootState, select, useDispatch } from "util/useRedux";
import { Picker } from "@react-native-picker/picker";
import { Hospital, NYHAClass } from "rc_agents/model";
import { getPickerStyles } from "util/getStyles";
import { Label } from "components/Text/Label";
import { AuthButton } from "components/Buttons/AuthButton";
import { triggerStorePatientBaseline } from "rc_agents/triggers";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { useToast } from "react-native-toast-notifications";
import {
  setConfigurationSuccessful,
  setConfiguringPatient
} from "ic-redux/actions/agents/actionCreator";
import { SaveAndCancelButtons } from "components/Buttons/SaveAndCancelButtons";

interface PatientConfigurationScreenProps {
  info: PatientInfo;
  editDetails: boolean; // Indicates that patient has been configured and details are to be updated
  setEditDetails: (state: boolean) => void; // To edit patient's details
}

export const PatientConfigurationScreen: FC<PatientConfigurationScreenProps> =
  ({ info, editDetails, setEditDetails }) => {
    // States
    const { fonts, colors, configuringPatient, configurationSuccessful } =
      select((state: RootState) => ({
        colors: state.settings.colors,
        fonts: state.settings.fonts,
        configuringPatient: state.agents.configuringPatient,
        configurationSuccessful: state.agents.configurationSuccessful
      }));
    const [configInfo, setConfigInfo] = useState<PatientInfo>(() => {
      return cloneDeep(info);
    });
    const [allInputValid, setAllInputValid] = useState<boolean>(false);
    const [hasDevice, setHasDevice] = useState<boolean>(
      notEmptyString(info.deviceNo)
    );

    // Used locally to keep track of ongoing configuration procedure
    const [configuring, setConfiguring] = useState<boolean>(false);

    const toast = useToast();
    const dispatch = useDispatch();

    // Picker styles
    const {
      pickerContainerStyle: hospitalNamePickerContainerStyle,
      pickerStyle: hospitalNamePickerStyle
    } = getPickerStyles({
      colors: colors,
      fonts: fonts,
      error: !validateHospitalName(configInfo.hospitalName)
    });
    const {
      pickerContainerStyle: NYHAClassPickerContainerStyle,
      pickerStyle: NYHAClassPickerStyle
    } = getPickerStyles({
      colors: colors,
      fonts: fonts,
      error: !validateNYHAClass(configInfo.NHYAclass)
    });

    // Update functions
    const updateHospitalName = (hospitalName: string) => {
      setConfigInfo({ ...configInfo, hospitalName: hospitalName });
    };

    const updateNYHAClass = (NHYAclass: string) => {
      setConfigInfo({ ...configInfo, NHYAclass: NHYAclass });
    };

    const updateDiagnosisInfo = (diagnosisInfo: string) => {
      setConfigInfo({ ...configInfo, diagnosisInfo: diagnosisInfo });
    };

    const updateDeviceNumber = useCallback(
      (deviceNo: string) => {
        setConfigInfo({ ...configInfo, deviceNo: deviceNo });
      },
      [configInfo]
    );

    const updateTargetActivity = (targetActivity: string) => {
      setConfigInfo({ ...configInfo, targetActivity: targetActivity });
    };

    const updateTargetWeight = (targetWeight: string) => {
      setConfigInfo({ ...configInfo, targetWeight: targetWeight });
    };

    const updateFluidIntakeGoal = (fluidIntakeGoal: string) => {
      setConfigInfo({
        ...configInfo,
        fluidIntakeGoal: fluidIntakeGoal
      });
    };

    // Side effects when optional fields change
    useEffect(() => {
      if (!hasDevice && notEmptyString(configInfo.deviceNo)) {
        updateDeviceNumber("");
      }
    }, [hasDevice, configInfo, updateDeviceNumber]);

    // Side effect for final validation
    useEffect(() => {
      // Validation for mandatory fields
      const mandatory = (validateHospitalName(configInfo.hospitalName) &&
        validateNYHAClass(configInfo.NHYAclass) &&
        configInfo.diagnosisInfo &&
        validateTargetActivity(configInfo.targetActivity) &&
        validateTargetWeight(configInfo.targetWeight) &&
        validateFluidIntakeGoal(configInfo.fluidIntakeGoal)) as boolean;

      // Validation for optional fields
      const optional = (!hasDevice || configInfo.deviceNo) as boolean;

      const valid = mandatory && optional;

      setAllInputValid(valid);
    }, [configInfo, hasDevice]);

    // Proceed button onPress
    const onProceedPress = () => {
      dispatch(setConfiguringPatient(true));
      setConfiguring(true);
      const infoToUpdate = { ...configInfo, configured: true };
      triggerStorePatientBaseline(infoToUpdate);
    };

    useEffect(() => {
      if (configuring && !configuringPatient) {
        setConfiguring(false);
        if (configurationSuccessful) {
          toast.show(i18n.t("Patient_Configuration.ConfigurationSuccessful"), {
            type: "success"
          });
          dispatch(setConfigurationSuccessful(false));
          setEditDetails(false);
        } else {
          toast.show(i18n.t("UnexpectedError"), {
            type: "danger"
          });
        }
      }
    }, [
      configuring,
      configuringPatient,
      configurationSuccessful,
      toast,
      dispatch,
      setEditDetails
    ]);

    return (
      <ScreenWrapper
        fixed
        padding
        style={{ width: "70%", alignSelf: "center" }}
      >
        <H3 text={i18n.t("Patient_Configuration.Title")} style={styles.title} />

        <ScrollView pointerEvents={configuring ? "none" : "auto"}>
          {/* Mandatory fields */}
          {/* Hospital name */}
          <Label text={i18n.t("Patient_Configuration.Label.HospitalName")} />
          <View style={hospitalNamePickerContainerStyle}>
            <Picker
              style={hospitalNamePickerStyle}
              selectedValue={configInfo.hospitalName}
              onValueChange={(value: string) => {
                updateHospitalName(value);
              }}
            >
              {Object.entries(Hospital).map(([key, value]) => {
                return (
                  <Picker.Item
                    key={key}
                    value={value}
                    label={i18n.t(value.toString())}
                  />
                );
              })}
            </Picker>
          </View>

          <Label text={i18n.t("Patient_Configuration.Label.NYHAClass")} />
          <View style={NYHAClassPickerContainerStyle}>
            <Picker
              style={NYHAClassPickerStyle}
              selectedValue={configInfo.NHYAclass}
              onValueChange={(value: string) => {
                updateNYHAClass(value);
              }}
            >
              {Object.entries(NYHAClass).map(([key, value]) => {
                return (
                  <Picker.Item
                    key={key}
                    value={value}
                    label={i18n.t(value.toString())}
                  />
                );
              })}
            </Picker>
          </View>

          {/* Diagnosis info */}
          <TextField
            label={i18n.t("Patient_Configuration.Label.DiagnosisInfo")}
            value={configInfo.diagnosisInfo}
            onChange={(diagnosisInfo) => updateDiagnosisInfo(diagnosisInfo)}
            placeholder={i18n.t(
              "Patient_Configuration.Placeholder.DiagnosisInfo"
            )}
          />

          {/* Optional fields */}
          {/* Device number */}
          <CheckboxText
            text={i18n.t("Patient_Configuration.Prompt.DeviceNo")}
            containerStyle={styles.promptTextContainer}
            fontSize={fonts.h6Size}
            checked={hasDevice}
            onPress={() => setHasDevice(!hasDevice)}
          />
          {hasDevice ? (
            <TextField
              label={i18n.t("Patient_Configuration.Label.DeviceNo")}
              value={configInfo.deviceNo}
              onChange={(deviceNo) => updateDeviceNumber(deviceNo)}
              placeholder={i18n.t("Patient_Configuration.Placeholder.DeviceNo")}
            />
          ) : null}

          {/* Separator */}
          <ItemSeparator topSpacing={ms(25)} bottomSpacing={ms(10)} />

          {/* Mandatory fields for values */}
          {/* Target activity (number of steps) */}
          <TextField
            label={i18n.t("Patient_Configuration.Label.TargetActivity")}
            value={configInfo.targetActivity}
            onChange={(targetActivity) => updateTargetActivity(targetActivity)}
            placeholder={i18n.t(
              "Patient_Configuration.Placeholder.TargetActivity"
            )}
            error={
              notEmptyString(configInfo.targetActivity) &&
              !validateTargetActivity(configInfo.targetActivity)
            }
            errorMessage={i18n.t("Patient_Configuration.Error.TargetActivity")}
          />
          {/* Target weight */}
          <TextField
            label={i18n.t("Patient_Configuration.Label.TargetWeight")}
            value={configInfo.targetWeight}
            onChange={(targetWeight) => updateTargetWeight(targetWeight)}
            placeholder={i18n.t(
              "Patient_Configuration.Placeholder.TargetWeight"
            )}
            error={
              notEmptyString(configInfo.targetWeight) &&
              !validateTargetWeight(configInfo.targetWeight)
            }
            errorMessage={i18n.t("Patient_Configuration.Error.TargetWeight")}
          />
          {/* Fluid intake goal */}
          <TextField
            label={i18n.t("Patient_Configuration.Label.FluidIntakeGoal")}
            value={configInfo.fluidIntakeGoal}
            onChange={(fluidIntakeGoal) =>
              updateFluidIntakeGoal(fluidIntakeGoal)
            }
            placeholder={i18n.t(
              "Patient_Configuration.Placeholder.FluidIntakeGoal"
            )}
            error={
              notEmptyString(configInfo.fluidIntakeGoal) &&
              !validateFluidIntakeGoal(configInfo.fluidIntakeGoal)
            }
            errorMessage={i18n.t("Patient_Configuration.Error.FluidIntakeGoal")}
          />
        </ScrollView>

        {/* Patient has been configured - editing patient's details should allow cancelling */}
        {editDetails ? (
          <SaveAndCancelButtons
            onPressSave={onProceedPress}
            onPressCancel={() => setEditDetails(false)}
            validToSave={allInputValid && !configuring}
          />
        ) : (
          // Patient hasn't been configured - not allowed to proceed without configuration
          <AuthButton
            buttonTitle={i18n.t("Patient_Configuration.Proceed")}
            onPress={onProceedPress}
            inputValid={allInputValid && !configuring}
            noTextTransform
          />
        )}
        {configuring && <LoadingIndicator />}
      </ScreenWrapper>
    );
  };

const styles = ScaledSheet.create({
  title: {
    textAlign: "center",
    paddingVertical: "10@ms"
  },
  promptTextContainer: {
    marginTop: "10@ms"
  }
});
