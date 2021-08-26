import React, { FC, useState, useEffect, useCallback } from "react";
import { TextField } from "components/InputComponents/TextField";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import i18n from "util/language/i18n";
import { PatientInfo } from "aws/API";
import cloneDeep from "lodash/cloneDeep";
import {
  notEmptyString,
  validateFluidIntakeGoal,
  validateTargetActivity,
  validateTargetWeight
} from "util/validation";
import { ms, ScaledSheet } from "react-native-size-matters";
import { CheckboxText } from "components/InputComponents/CheckboxText";
import { H3 } from "components/Text";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";

interface PatientConfigurationScreenProps {
  info: PatientInfo;
}

export const PatientConfigurationScreen: FC<PatientConfigurationScreenProps> =
  ({ info }) => {
    const [configInfo, setConfigInfo] = useState<PatientInfo>(() => {
      return cloneDeep(info);
    });
    const [hasDevice, setHasDevice] = useState<boolean>(
      notEmptyString(info.deviceNo)
    );

    // Update functions
    const updateDeviceNumber = useCallback(
      (deviceNo: string) => {
        setConfigInfo({ ...configInfo, deviceNo: deviceNo });
      },
      [configInfo]
    );

    const updateDiagnosisInfo = (diagnosisInfo: string) => {
      setConfigInfo({ ...configInfo, diagnosisInfo: diagnosisInfo });
    };

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

    return (
      <ScreenWrapper padding style={{ width: "70%", alignSelf: "center" }}>
        <H3 text={i18n.t("Patient_Configuration.Title")} style={styles.title} />

        {/* Basic fields */}
        <TextField
          label={i18n.t("Patient_Configuration.Label.DiagnosisInfo")}
          value={configInfo.diagnosisInfo}
          onChange={(diagnosisInfo) => updateDiagnosisInfo(diagnosisInfo)}
          placeholder={i18n.t(
            "Patient_Configuration.Placeholder.DiagnosisInfo"
          )}
        />

        {/* Optional fields */}
        <CheckboxText
          text={i18n.t("Patient_Configuration.Prompt.DeviceNo")}
          containerStyle={styles.promptTextContainer}
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

        {/* Values fields */}
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
        <TextField
          label={i18n.t("Patient_Configuration.Label.TargetWeight")}
          value={configInfo.targetWeight}
          onChange={(targetWeight) => updateTargetWeight(targetWeight)}
          placeholder={i18n.t("Patient_Configuration.Placeholder.TargetWeight")}
          error={
            notEmptyString(configInfo.targetWeight) &&
            !validateTargetWeight(configInfo.targetWeight)
          }
          errorMessage={i18n.t("Patient_Configuration.Error.TargetWeight")}
        />
        <TextField
          label={i18n.t("Patient_Configuration.Label.FluidIntakeGoal")}
          value={configInfo.fluidIntakeGoal}
          onChange={(fluidIntakeGoal) => updateFluidIntakeGoal(fluidIntakeGoal)}
          placeholder={i18n.t(
            "Patient_Configuration.Placeholder.FluidIntakeGoal"
          )}
          error={
            notEmptyString(configInfo.fluidIntakeGoal) &&
            !validateFluidIntakeGoal(configInfo.fluidIntakeGoal)
          }
          errorMessage={i18n.t("Patient_Configuration.Error.FluidIntakeGoal")}
        />
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
