/* eslint-disable react/jsx-no-undef */
import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockPatients } from "mock/mockPatients";
import { RootState, select, useDispatch } from "util/useRedux";
import { ContactTitle } from "components/RowComponents/ContactTitle";
import { AlertHistoryModal } from "./PatientScreens/PatientDetailsScreen/PatientHistoryComponents/AlertHistoryModal";
import { MedicalRecords } from "mock/mockPatientDetails";
import { RiskLevel } from "models/RiskLevel";
import { ScaledSheet } from "react-native-size-matters";
import { ViewMedicalRecords } from "./PatientScreens/PatientDetailsScreen/PatientHistoryComponents/ViewMedicalRecord";
import { AddMedicalRecord } from "./PatientScreens/PatientDetailsScreen/PatientHistoryComponents/AddMedicalRecord";
import { setPatientDetails } from "ic-redux/actions/agents/actionCreator";
import { PatientDetailsTabNavigator } from "web/navigation/navigators/PatientDetailsTabNavigator";
import { PatientHistoryModal } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientHistoryComponents/PatientHistoryModals";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import { PatientsList } from "./PatientsList";
import { AgentTrigger } from "rc_agents/trigger";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AdaptiveTwoScreenWrapper } from "web/screens/AdaptiveTwoScreenWrapper";
import { PatientConfigurationScreen } from "web/screens/Patients/PatientScreens/PatientConfiguration/PatientConfigurationScreen";
import { AlertColorCode, AlertInfo, AlertStatus } from "rc_agents/model";

export const PatientsScreen: FC<MainScreenProps[ScreenName.PATIENTS]> = ({
  route
}) => {
  const { displayPatientId, selectedTab } = route.params;
  const { colors, patients, patientDetails, fetchingPatientDetails } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      patients: state.agents.patients,
      patientDetails: state.agents.patientDetails,
      fetchingPatientDetails: state.agents.fetchingPatientDetails
    })
  );

  const dispatch = useDispatch();

  // Trigger agent to fetch patients on initial load
  useEffect(() => {
    AgentTrigger.triggerRetrievePatientsByRole();
  }, []);

  // Triggers agent to fetch patient details if this screen was navigated with displayPatientId parameter
  useEffect(() => {
    // Patient id and patients available. Check if patient exists
    if (displayPatientId && patients) {
      const patient = patients.find(
        (item) => item.patientID === displayPatientId
      );
      // Patient exists
      if (patient) {
        // Different patient details is being displayed
        // OR patient details has not been displayed yet
        if (
          (patientDetails &&
            patientDetails.patientInfo.patientID !== patient.patientID) ||
          !patientDetails
        ) {
          AgentTrigger.triggerRetrievePatientDetails(patient);
        }
      }
      // Patient does not exist
      else {
        dispatch(setPatientDetails(null));
      }
    }
  }, [displayPatientId, patientDetails, patients, dispatch]);

  // Initial alert history details for the modal
  const initialAlertHistory: AlertInfo = {
    __typename: "Alert",
    id: "",
    patientID: "",
    patientName: "",
    riskLevel: RiskLevel.UNASSIGNED,
    vitalsReportID: "",
    symptomReportID: "",
    dateTime: "",
    summary: "",
    colorCode: AlertColorCode.UNASSIGNED,
    pending: AlertStatus.PENDING,
    completed: null,
    _version: -1,
    _lastChangedAt: new Date().getTime(),
    createdAt: "",
    updatedAt: "",
    owner: ""
  };

  // Inital medical record details for the modal
  const initialMedicalRecord = {
    id: "",
    patientId: "",
    record: "",
    content: ""
  };

  // JH-TODO-NEW: Remove
  // Patient that has been selected by the user from the list of patients
  const [selectedPatient] = useState(mockPatients[0]);

  // For pointer events
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalVisible, setModalVisible] = useState(false);

  // For past alert details modal visibility
  const [modalAlertVisible, setModalAlertVisible] = useState<boolean>(false);
  // Feed in the alert details to be displayed in the modal
  const [displayHistory, setDisplayHistory] =
    useState<AlertInfo>(initialAlertHistory);

  // For view medical record modal visibility
  const [viewMedicalModal, setViewMedicalModal] = useState<boolean>(false);
  // Feed in the medical record details to be displayed in the modal
  const [displayMedicalRecord, setDisplayMedicalRecord] =
    useState<MedicalRecords>(initialMedicalRecord);

  // For add medical record modal visibility
  const [addMedicalRecord, setAddMedicalRecord] = useState<boolean>(false);
  const [showGraph, setShowGraph] = useState(false); // used locally for graph display

  // JH-TODO-NEW
  // // Detects completion of retrieval procedure
  // useEffect(() => {
  //   if (retrieving && !procedureOngoing) {
  //     setRetrieving(false);
  //     if (!showGraph) {
  //       setShowGraph(true);
  //     }
  //   }
  // }, [procedureOngoing, retrieving, showGraph]);
  // Prepare text notice to be displayed after fetching patients

  return (
    <ScreenWrapper fixed>
      <View
        style={styles.container}
        pointerEvents={modalVisible ? "none" : "auto"}
      >
        <AdaptiveTwoScreenWrapper
          // Left side: Patients list
          LeftComponent={
            <PatientsList
              displayPatientId={patientDetails?.patientInfo.patientID}
            />
          }
          // Right side: Patient details
          RightComponent={
            <View
              style={{
                flex: 2,
                backgroundColor: colors.primaryWebBackgroundColor
              }}
            >
              {fetchingPatientDetails ? (
                // Patient details is being fetched
                <LoadingIndicator flex={1} />
              ) : patientDetails ? (
                // Patient details is fetched and patient details is not null
                <>
                  {/* Patient avatar and name */}
                  <ContactTitle
                    name={patientDetails.patientInfo.name}
                    isPatient
                  />
                  {patientDetails.patientInfo.configured ? (
                    // Patient is configured: Show details
                    <View>
                      <PatientDetailsTabNavigator
                        details={patientDetails}
                        selectedTab={selectedTab}
                        setAddMedicalRecord={setAddMedicalRecord}
                        setDisplayHistory={setDisplayHistory}
                        setDisplayMedicalRecord={setDisplayMedicalRecord}
                        setModalAlertVisible={setModalAlertVisible}
                        setViewMedicalModal={setViewMedicalModal}
                      />
                      <PatientConfigurationScreen
                        info={patientDetails.patientInfo}
                      />
                    </View>
                  ) : // Patient is not configured: Show configuration screen
                  null}
                </>
              ) : (
                // Patient details is not being fetched and patient details is null
                <NoSelectionScreen
                  screenName={ScreenName.PATIENTS}
                  subtitle={i18n.t("Patients.NoSelection")}
                />
              )}
            </View>
          }
        />
      </View>

      {/* Container for modals */}
      <View style={styles.modalView}>
        {/* Modal to view past alert details of patient */}
        <PatientHistoryModal
          visible={modalAlertVisible}
          onRequestClose={() => {
            setModalAlertVisible(false);
          }}
        >
          <AlertHistoryModal
            name={selectedPatient.name}
            setModalAlertVisible={setModalAlertVisible}
            alertHistory={displayHistory}
          />
        </PatientHistoryModal>

        {/* Modal to view specific medical records of patient */}
        <PatientHistoryModal
          visible={viewMedicalModal}
          onRequestClose={() => {
            setViewMedicalModal(false);
          }}
        >
          <ViewMedicalRecords
            setViewMedicalModal={setViewMedicalModal}
            medicalRecord={displayMedicalRecord}
          />
        </PatientHistoryModal>

        {/* Modal to add new medical records */}
        <PatientHistoryModal
          visible={addMedicalRecord}
          onRequestClose={() => {
            setAddMedicalRecord(false);
          }}
        >
          <AddMedicalRecord setAddMedicalRecord={setAddMedicalRecord} />
        </PatientHistoryModal>
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "row", height: "100%" },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  rowSelection: { flex: 1 }
});
