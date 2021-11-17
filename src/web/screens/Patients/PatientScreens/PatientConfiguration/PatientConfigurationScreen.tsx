import React, { FC, useState, useEffect, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { TextField } from "components/InputComponents/TextField";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import i18n from "util/language/i18n";
import { PatientInfo } from "aws/API";
import cloneDeep from "lodash/cloneDeep";
import {
  getParsedFloat,
  notEmptyString,
  validateFluidIntakeGoal,
  validateHospitalName,
  validateNYHAClass,
  validateTargetSteps,
  validateTargetWeight
} from "util/validation";
import { ms, ScaledSheet } from "react-native-size-matters";
import { CheckboxText } from "components/InputComponents/CheckboxText";
import { H3 } from "components/Text";
import { RootState, select, useDispatch } from "util/useRedux";
import { Picker } from "@react-native-picker/picker";
import {
  Hospital,
  NYHAClassEnum,
  MedInput,
  PatientDetails
} from "rc_agents/model";
import { getPickerStyles } from "util/getStyles";
import { Label } from "components/Text/Label";
import { AuthButton } from "components/Buttons/AuthButton";
import { triggerStorePatientBaseline } from "rc_agents/triggers";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { useToast } from "react-native-toast-notifications";
import {
  setConfigurationSuccessful,
  setConfiguringPatient
} from "ic-redux/actions/agents/configurationActionCreator";
import { MedicationList } from "web/screens/Patients/PatientScreens/PatientConfiguration/MedConfiguration/MedicationList";
import { SaveAndCancelButtons } from "components/Buttons/SaveAndCancelButtons";
import { MedConfigModal } from "./MedConfiguration/MedConfigModal";
import { ModalWrapper } from "components/Wrappers/ModalWrapper";
import { RowButton } from "components/Buttons/RowButton";

interface PatientConfigurationScreenProps {
  details: PatientDetails;
  editDetails: boolean; // Indicates that patient has been configured and details are to be updated
  setEditDetails: (state: boolean) => void; // To edit patient's details
}

export const PatientConfigurationScreen: FC<PatientConfigurationScreenProps> =
  ({ details, editDetails, setEditDetails }) => {
    // States
    const { fonts, colors, configuringPatient, configurationSuccessful } =
      select((state: RootState) => ({
        colors: state.settings.colors,
        fonts: state.settings.fonts,
        configuringPatient: state.configurations.configuringPatient,
        configurationSuccessful: state.configurations.configurationSuccessful
      }));

    const info = details.patientInfo;

    const [configInfo, setConfigInfo] = useState<PatientInfo>(() => {
      return cloneDeep(info);
    });

    const [allInputValid, setAllInputValid] = useState<boolean>(false);
    const [hasDevice, setHasDevice] = useState<boolean>(
      notEmptyString(info.deviceNo)
    );

    // Medication to configure
    const [configMedInfo, setConfigMedInfo] = useState<MedInput>({
      name: "",
      dosage: "",
      frequency: "",
      patientID: details.patientInfo.patientID,
      active: true
    });

    // Current active medications
    const [activeMedications, setActiveMedications] = useState<MedInput[]>(
      cloneDeep(details.medicationInfos)
    );

    // All current medications
    const [currentMedications, setCurrentMedications] = useState<MedInput[]>(
      cloneDeep(details.medicationInfos)
    );

    // New medications
    const [newMedications, setNewMedications] = useState<MedInput[]>([]);

    // Medication configuration modal visibility, add new medication info button disabled or not
    const [medConfigModalVisible, setMedConfigModalVisible] =
      useState<boolean>(false);

    // To show blank screen in medconfig modal on the right side
    const [showDefaultScreen, setShowDefaultScreen] = useState<boolean>(true);

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
      error: !validateNYHAClass(configInfo.NYHAClass)
    });

    // Update functions
    const updateHospitalName = (hospitalName: string) => {
      setConfigInfo({ ...configInfo, hospitalName: hospitalName });
    };

    const updateNYHAClass = (NYHAClass: string) => {
      setConfigInfo({ ...configInfo, NYHAClass: NYHAClass });
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

    const updateTargetSteps = (targetSteps: string) => {
      const targetStepsFloat = getParsedFloat(targetSteps);
      setConfigInfo({ ...configInfo, targetSteps: targetStepsFloat });
    };

    const updateTargetWeight = (targetWeight: string) => {
      const targetWeightFloat = getParsedFloat(targetWeight);
      setConfigInfo({ ...configInfo, targetWeight: targetWeightFloat });
    };

    const updateFluidIntakeGoal = (fluidIntakeGoalInMl: string) => {
      const targetFluidIntakeGoalFloat = getParsedFloat(fluidIntakeGoalInMl);
      setConfigInfo({
        ...configInfo,
        fluidIntakeGoalInMl: targetFluidIntakeGoalFloat
      });
    };

    // When medication is saved
    const onSaveMedication = (medInput: MedInput) => {
      // If medInput already exists
      if (medInput.id) {
        const medIndex = currentMedications.findIndex(
          (m) => m.id === medInput.id
        );
        if (medIndex >= 0) {
          currentMedications.splice(medIndex, 1);
        }
        currentMedications.push(medInput);
        setCurrentMedications(currentMedications);
        setActiveMedications(currentMedications.filter((m) => m.active));
      }
      // If medInput is a new medication
      else {
        const medIndex = newMedications.findIndex(
          (m) => m.name === medInput.name
        );
        if (medIndex >= 0) {
          newMedications.splice(medIndex, 1);
        }
        newMedications.push(medInput);
        setNewMedications(newMedications);
      }

      // Reset medication
      setConfigMedInfo({
        name: "",
        dosage: "",
        frequency: "",
        patientID: details.patientInfo.patientID,
        active: true
      });
      setShowDefaultScreen(true);
    };

    // When medication is removed
    const onRemoveMedication = (medication: MedInput) => {
      // If medication is active
      if (medication.id) {
        const medIndex = currentMedications.findIndex(
          (m) => m.id === medication.id
        );
        if (medIndex >= 0) {
          // Set medication to inactive
          currentMedications[medIndex].active = false;
          setCurrentMedications(currentMedications);
          setActiveMedications(currentMedications.filter((m) => m.active));
        }
      } else {
        // If medication is new
        const medIndex = newMedications.findIndex(
          (m) => m.name === medication.name
        );
        if (medIndex >= 0) {
          // Remove medication from the list
          newMedications.splice(medIndex, 1);
          setNewMedications(newMedications);
        }
      }

      // Reset medication
      setConfigMedInfo({
        name: "",
        dosage: "",
        frequency: "",
        patientID: details.patientInfo.patientID,
        active: true
      });
      setShowDefaultScreen(true);
    };

    // Proceed button onPress
    const onProceedPress = () => {
      dispatch(setConfiguringPatient(true));
      setConfiguring(true);
      const infoToUpdate = { ...configInfo, configured: true };
      triggerStorePatientBaseline(
        infoToUpdate,
        currentMedications.concat(newMedications)
      );
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
        validateNYHAClass(configInfo.NYHAClass) &&
        configInfo.diagnosisInfo &&
        validateTargetSteps(configInfo.targetSteps) &&
        validateTargetWeight(configInfo.targetWeight) &&
        validateFluidIntakeGoal(configInfo.fluidIntakeGoalInMl)) as boolean;

      // Validation for optional fields
      const optional = (!hasDevice || configInfo.deviceNo) as boolean;

      const valid = mandatory && optional;

      setAllInputValid(valid);
    }, [configInfo, hasDevice]);

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
              selectedValue={configInfo.hospitalName || Hospital.UNKNOWN}
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
              selectedValue={configInfo.NYHAClass || NYHAClassEnum.UNKNOWN}
              onValueChange={(value: string) => {
                updateNYHAClass(value);
              }}
            >
              {Object.entries(NYHAClassEnum).map(([key, value]) => {
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
            textStyle={{ fontWeight: "600" }}
            containerStyle={[
              styles.promptTextContainer,
              { marginBottom: hasDevice ? ms(0) : ms(10) }
            ]}
            fontSize={fonts.h5Size}
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

          {/* Medications */}
          <Label
            text={i18n.t("Patient_Configuration.Label.Medications")}
            style={{ marginBottom: ms(0) }}
          />

          {/* List of active medications */}
          {activeMedications.length > 0 && (
            <MedicationList
              medications={activeMedications}
              onRemoveMedication={onRemoveMedication}
              label={i18n.t(
                "Patient_Configuration.Medications.CurrentMedications"
              )}
            />
          )}

          {/* List of new medications */}
          {newMedications.length > 0 && (
            <MedicationList
              medications={newMedications}
              onRemoveMedication={onRemoveMedication}
              label={i18n.t("Patient_Configuration.Medications.NewMedications")}
            />
          )}

          <View style={styles.configureMedicationButtonContainer}>
            <RowButton
              title={i18n.t(
                "Patient_Configuration.Medications.ConfigureMedication"
              )}
              fontSize={fonts.h5Size}
              disabled={medConfigModalVisible}
              onPress={() => setMedConfigModalVisible(true)}
            />
          </View>

          {/* Mandatory fields for values */}
          {/* Target activity (number of steps) */}
          <TextField
            label={i18n.t("Patient_Configuration.Label.TargetSteps")}
            value={configInfo.targetSteps}
            onChange={(targetSteps) => updateTargetSteps(targetSteps)}
            placeholder={i18n.t(
              "Patient_Configuration.Placeholder.TargetSteps"
            )}
            error={
              notEmptyString(configInfo.targetSteps) &&
              !validateTargetSteps(configInfo.targetSteps)
            }
            errorMessage={i18n.t("Patient_Configuration.Error.TargetSteps")}
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
            value={configInfo.fluidIntakeGoalInMl}
            onChange={(fluidIntakeGoalInMl) =>
              updateFluidIntakeGoal(fluidIntakeGoalInMl)
            }
            placeholder={i18n.t(
              "Patient_Configuration.Placeholder.FluidIntakeGoal"
            )}
            error={
              notEmptyString(configInfo.fluidIntakeGoalInMl) &&
              !validateFluidIntakeGoal(configInfo.fluidIntakeGoalInMl)
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

        {/* Medication configuration form in a pop-up modal */}
        <ModalWrapper
          visible={medConfigModalVisible}
          onRequestClose={() => {
            setMedConfigModalVisible(false);
          }}
          modalStyle={{ width: "70%" }}
        >
          <MedConfigModal
            details={details}
            configMedInfo={configMedInfo}
            saveMedication={onSaveMedication}
            removeMedication={onRemoveMedication}
            setConfigMedInfo={setConfigMedInfo}
            setMedConfigModalVisible={setMedConfigModalVisible}
            activeMedications={activeMedications}
            newMedications={newMedications}
            showDefaultScreen={showDefaultScreen}
            setShowDefaultScreen={setShowDefaultScreen}
          />
        </ModalWrapper>
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
  },
  configureMedicationButtonContainer: {
    alignItems: "center",
    marginTop: "5@ms"
  }
});
