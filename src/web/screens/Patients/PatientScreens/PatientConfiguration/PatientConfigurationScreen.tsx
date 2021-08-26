import React, { FC, useState } from "react";
import { TextField } from "components/InputComponents/TextField";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import i18n from "util/language/i18n";
import { PatientInfo } from "aws/API";
import cloneDeep from "lodash/cloneDeep";

interface PatientConfigurationScreenProps {
  info: PatientInfo;
}

export const PatientConfigurationScreen: FC<PatientConfigurationScreenProps> =
  ({ info }) => {
    const [configuredInfo, setConfiguredInfo] = useState<PatientInfo>(() => {
      return cloneDeep(info);
    });

    const getTempInfo = () => {
      return cloneDeep(configuredInfo);
    };

    // Update configure info functions
    const updateDeviceNumber = (deviceNo: string) => {
      const temp: PatientInfo = getTempInfo();
      temp.deviceNo = deviceNo;
      setConfiguredInfo(temp);
    };

    const updateDiagnosisInfo = (diagnosisInfo: string) => {
      const temp: PatientInfo = getTempInfo();
      temp.diagnosisInfo = diagnosisInfo;
      setConfiguredInfo(temp);
    };

    const updateTargetActivity = (targetActivity: string) => {
      const temp: PatientInfo = getTempInfo();
      temp.targetActivity = targetActivity;
      setConfiguredInfo(temp);
    };

    const updateTargetWeight = (targetWeight: string) => {
      const temp: PatientInfo = getTempInfo();
      temp.targetWeight = targetWeight;
      setConfiguredInfo(temp);
    };

    const updateFluidIntakeGoal = (fluidIntakeGoal: string) => {
      const temp = getTempInfo();
      temp.fluidIntakeGoal = fluidIntakeGoal;
      setConfiguredInfo(temp);
    };

    return (
      <ScreenWrapper padding>
        <TextField
          label={i18n.t("Patient_Configuration.Label.DeviceNo")}
          value={configuredInfo.deviceNo}
          onChange={(deviceNo) => updateDeviceNumber(deviceNo)}
          placeholder={i18n.t("Patient_Configuration.Placeholder.DeviceNo")}
        />
        <TextField
          label={i18n.t("Patient_Configuration.Label.DiagnosisInfo")}
          value={configuredInfo.diagnosisInfo}
          onChange={(diagnosisInfo) => updateDiagnosisInfo(diagnosisInfo)}
          placeholder={i18n.t(
            "Patient_Configuration.Placeholder.DiagnosisInfo"
          )}
        />
        <TextField
          label={i18n.t("Patient_Configuration.Label.TargetActivity")}
          value={configuredInfo.targetActivity}
          onChange={(targetActivity) => updateTargetActivity(targetActivity)}
          placeholder={i18n.t(
            "Patient_Configuration.Placeholder.TargetActivity"
          )}
        />
        <TextField
          label={i18n.t("Patient_Configuration.Label.TargetWeight")}
          value={configuredInfo.targetWeight}
          onChange={(targetWeight) => updateTargetWeight(targetWeight)}
          placeholder={i18n.t("Patient_Configuration.Placeholder.TargetWeight")}
        />
        <TextField
          label={i18n.t("Patient_Configuration.Label.FluidIntakeGoal")}
          value={configuredInfo.fluidIntakeGoal}
          onChange={(fluidIntakeGoal) => updateFluidIntakeGoal(fluidIntakeGoal)}
          placeholder={i18n.t(
            "Patient_Configuration.Placeholder.FluidIntakeGoal"
          )}
        />
      </ScreenWrapper>
    );
  };
