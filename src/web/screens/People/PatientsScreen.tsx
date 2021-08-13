import React, { FC, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { PatientInfo } from "aws/API";
import { mockPatients } from "mock/mockPatients";
import { RowSelectionTab } from "../RowSelectionTab";
import { RiskFilterPillProps } from "web/RiskFilterPill";
import { RootState, select, useDispatch } from "util/useRedux";
import { ContactTitle } from "./ContactTitle";
import { AlertHistoryModal } from "./PatientScreens/PatientDetailsScreen/PatientHistoryScreens/AlertHistoryModal";
import { AlertHistory, MedicalRecords } from "mock/mockPatientDetails";
import { RiskLevel } from "models/RiskLevel";
import { ScaledSheet } from "react-native-size-matters";
import { ViewMedicalRecords } from "./PatientScreens/PatientDetailsScreen/PatientHistoryScreens/ViewMedicalRecord";
import { AddMedicalRecord } from "./PatientScreens/PatientDetailsScreen/PatientHistoryScreens/AddMedicalRecord";
import agentDTA from "rc_agents/agents/data-assistant/DTA";
import Belief from "rc_agents/framework/base/Belief";
import {
  BeliefKeys,
  ClinicianAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { setProcedureOngoing } from "ic-redux/actions/agents/actionCreator";
import i18n from "util/language/i18n";
import { PatientDetailsNavigationStack } from "./PatientScreens/PatientDetailsNavigationStack";
import { PatientHistoryModal } from "./PatientDetailsScreen/PatientHistoryScreens/PatientHistoryModals";
import { WithSideTabsProps, ScreenName } from "web/screens";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { RiskFilterPillList } from "web/RiskFilterPillList";
import { H5 } from "components/Text";

export const PatientsScreen: FC<WithSideTabsProps[ScreenName.PATIENT]> = () => {
  const { colors, patients, fetchingPatients } = select((state: RootState) => ({
    colors: state.settings.colors,
    patients: state.agents.patients,
    fetchingPatients: state.agents.fetchingPatients
  }));

  /**
   * Trigger agent to fetch patients on initial load
   */
  useEffect(() => {
    agentDTA.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_ROLE, true)
    );

    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.HF_OTP_I,
        ProcedureConst.ACTIVE
      )
    );
  }, []);

  // Initial alert history details for the modal
  const initialAlertHistory = {
    id: "",
    patientId: "",
    risk: RiskLevel.UNASSIGNED,
    date: "",
    time: "",
    description: "",
    HRV: 0,
    BP: "",
    symptom: "",
    signs: ""
  };

  // Inital medical record details for the modal
  const initialMedicalRecord = {
    id: "",
    patientId: "",
    record: "",
    content: ""
  };

  // Patient that has been selected by the user from the list of patients
  const [selectedPatient] = useState(mockPatients[0]);

  // For pointer events
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalVisible, setModalVisible] = useState(false);

  // For past alert details modal visibility
  const [modalAlertVisible, setModalAlertVisible] = useState<boolean>(false);
  // Feed in the alert details to be displayed in the modal
  const [displayHistory, setDisplayHistory] =
    useState<AlertHistory>(initialAlertHistory);

  // For view medical record modal visibility
  const [viewMedicalModal, setViewMedicalModal] = useState<boolean>(false);
  // Feed in the medical record details to be displayed in the modal
  const [displayMedicalRecord, setDisplayMedicalRecord] =
    useState<MedicalRecords>(initialMedicalRecord);

  // For add medical record modal visibility
  const [addMedicalRecord, setAddMedicalRecord] = useState<boolean>(false);

  const [retrieving, setRetrieving] = useState(false); // used locally to indicate ongoing retrieval of details
  const [showGraph, setShowGraph] = useState(false); // used locally for graph display

  const dispatch = useDispatch();

  // Triggers series of actions to retrieve details specific to a patient.
  const getData = (patientId: string) => {
    // Start of retrieval
    dispatch(setProcedureOngoing(true));
    setRetrieving(true);

    agentDTA.addBelief(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.RETRIEVE_PATIENT_DETAILS,
        true
      )
    );
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.PATIENT_TO_VIEW_DETAILS,
        patientId
      ),
      false
    );
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.HF_OTP_II,
        ProcedureConst.ACTIVE
      )
    );
  };

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

  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper fixed>
      <View
        style={styles.container}
        pointerEvents={modalVisible ? "none" : "auto"}
      >
        {/* Left screen: List of patients */}
        <View
          style={{ flex: 1, backgroundColor: colors.primaryContrastTextColor }}
        >
          {/* Search bar and risk filter pills */}
          <RowSelectionTab
            title={i18n.t("TabTitle.Patients")}
            placeholder={i18n.t("Patients.SearchBarPlaceholder")}
          />
          <RiskFilterPillList />
          {/* Risk filter pills and List of patients */}
          {fetchingPatients ? (
            // JH-TODO-NEW: Loading indicator options
            <View style={{ flex: 1 }}>
              <LoadingIndicator />
            </View>
          ) : patients && patients.length > 0 ? (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                ItemSeparatorComponent={() => <ItemSeparator />}
                data={patients}
                renderItem={({ item }) => (
                  <PatientDetailsRow
                    generalDetails={item}
                    patientClass={item.NHYAclass}
                    age={23}
                  />
                )}
                keyExtractor={(item) => item.patientID}
              />
            </>
          ) : (
            // Display text to indicate no patients
            <View style={styles.noPatientsContainer}>
              <H5
                text={i18n.t("Patients.NoPatients")}
                style={styles.noPatientsText}
              />
            </View>
          )}
        </View>

        {/* Right screen: Patient details */}
        <View
          style={{ flex: 2, backgroundColor: colors.primaryWebBackgroundColor }}
        >
          {/* Patient name and avatar header */}
          <ContactTitle name={selectedPatient.name} isPatient />

          {/* Patient Navigation */}
          <PatientDetailsNavigationStack
            patient={selectedPatient}
            setAddMedicalRecord={setAddMedicalRecord}
            setDisplayHistory={setDisplayHistory}
            setDisplayMedicalRecord={setDisplayMedicalRecord}
            setModalAlertVisible={setModalAlertVisible}
            setViewMedicalModal={setViewMedicalModal}
          />
        </View>
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
  rowSelection: { flex: 1 },
  noPatientsContainer: {
    flex: 1,
    paddingTop: "10@ms",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: "30@ms"
  },
  noPatientsText: {
    textAlign: "center"
  }
});
