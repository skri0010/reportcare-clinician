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
  validateTargetActivity,
  validateTargetWeight
} from "util/validation";
import { ms, ScaledSheet } from "react-native-size-matters";
import { CheckboxText } from "components/InputComponents/CheckboxText";
import { H3 } from "components/Text";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RootState, select } from "util/useRedux";
import { Picker } from "@react-native-picker/picker";
import { Hospital } from "rc_agents/model";
import { getPickerStyles } from "util/getStyles";
import { Label } from "components/Text/Label";
import { AuthButton } from "components/Buttons/AuthButton";

interface PatientConfigurationScreenProps {
  info: PatientInfo;
}

export const PatientConfigurationScreen: FC<PatientConfigurationScreenProps> =
  ({ info }) => {
    const { fonts, colors } = select((state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts
    }));
    const [configInfo, setConfigInfo] = useState<PatientInfo>(() => {
      return cloneDeep(info);
    });
    const [hasDevice, setHasDevice] = useState<boolean>(
      notEmptyString(info.deviceNo)
    );
    const { pickerContainerStyle, pickerStyle } = getPickerStyles({
      colors: colors,
      fonts: fonts,
      error: !validateHospitalName(configInfo.hospitalName)
    });

    // Update functions
    const updateHospitalName = (hospitalName: string) => {
      setConfigInfo({ ...configInfo, hospitalName: hospitalName });
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

    return (
      <ScreenWrapper
        fixed
        padding
        style={{ width: "70%", alignSelf: "center" }}
      >
        <H3 text={i18n.t("Patient_Configuration.Title")} style={styles.title} />

        <ScrollView>
          {/* Basic fields */}
          <TextField
            label={i18n.t("Patient_Configuration.Label.DiagnosisInfo")}
            value={configInfo.diagnosisInfo}
            onChange={(diagnosisInfo) => updateDiagnosisInfo(diagnosisInfo)}
            placeholder={i18n.t(
              "Patient_Configuration.Placeholder.DiagnosisInfo"
            )}
          />

          <Label text={i18n.t("Patient_Configuration.Label.HospitalName")} />
          <View style={pickerContainerStyle}>
            <Picker
              style={pickerStyle}
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

          {/* Optional fields */}
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
            placeholder={i18n.t(
              "Patient_Configuration.Placeholder.TargetWeight"
            )}
            error={
              notEmptyString(configInfo.targetWeight) &&
              !validateTargetWeight(configInfo.targetWeight)
            }
            errorMessage={i18n.t("Patient_Configuration.Error.TargetWeight")}
          />
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

        {/* Done button */}
        <AuthButton buttonTitle="DONE" inputValid={false} />
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
