import React, { FC, useEffect, useState } from "react";
import { View, FlatList, Modal, Text } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { PatientInfo } from "aws/API";
import { mockPatients } from "mock/mockPatients";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { FilterTagProps } from "web/RiskFilterComponent";
import { PatientOverview } from "./PatientDetailsScreen/PatientOverview";
import { RootState, select, useDispatch } from "util/useRedux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PatientHistory } from "./PatientDetailsScreen/PatientHistory";
import { ContactTitle } from "./ContactTitle";
import { PatientParameter } from "./PatientDetailsScreen/PatientParameters";
import { PatientIcdCrt } from "./PatientDetailsScreen/PatientIcdCrt";
import { AlertHistoryModal } from "./PatientDetailsScreen/PatientHistoryScreens/AlertHistoryModal";
import { AlertHistory, MedicalRecords } from "mock/mockPatientDetails";
import { RiskLevel } from "models/RiskLevel";
import { ScaledSheet } from "react-native-size-matters";
import { ViewMedicalRecords } from "./PatientDetailsScreen/PatientHistoryScreens/ViewMedicalRecord";
import { AddMedicalRecord } from "./PatientDetailsScreen/PatientHistoryScreens/AddMedicalRecord";
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
import agentUXSA from "rc_agents/agents/user-specific-assistant/UXSA";
import { setProcedureOngoing } from "ic-redux/actions/agents/actionCreator";
import { useNetInfo } from "@react-native-community/netinfo";
import i18n from "util/language/i18n";
import { PatientInformation } from "./PatientDetailsScreen/PatientInformation";
import { PatientHistoryModal } from "./PatientDetailsScreen/PatientHistoryScreens/PatientHistoryModals";

const Tab = createMaterialTopTabNavigator();

export const PatientsTab: FC = () => {
  const { colors, patients, patientDetails, procedureOngoing } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      patients: state.agents.patients,
      procedureOngoing: state.agents.procedureOngoing,
      patientDetails: state.agents.patientDetails
    })
  );

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

  // For the display of filtered patients
  const [filteredPatients, setFilteredPatients] =
    useState<PatientInfo[]>(mockPatients);

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
  const netInfo = useNetInfo();

  // Triggers series of actions to get patients according to role.
  const getPatients = () => {
    // Start of retrieval
    dispatch(setProcedureOngoing(true));

    agentUXSA.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_ROLE, true)
    );
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.HF_OTP_I,
        ProcedureConst.ACTIVE
      )
    );
  };

  // Triggers series of actions to retrieve details specific to a patient.
  const getData = (patientId: string) => {
    // Start of retrieval
    dispatch(setProcedureOngoing(true));
    setRetrieving(true);

    agentDTA.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.RETRIEVE_DETAILS, true)
    );
    agentAPI.addFact(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.VIEW_DETAILS, patientId),
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

  // Retrieves patients after rendering
  useEffect(() => {
    getPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Retrieves patients when internet connection is detected
  // In the case where there was no internet connection previously
  useEffect(() => {
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      getPatients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netInfo]);

  // Detects completion of retrieval procedure
  useEffect(() => {
    if (retrieving && !procedureOngoing) {
      setRetrieving(false);
      if (!showGraph) {
        setShowGraph(true);
      }
    }
  }, [procedureOngoing, retrieving, showGraph]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filterPatients = (item: FilterTagProps[]) => {
    // Prob replaced with api call here
    // just mocking a filter now
    const filtered: PatientInfo[] = [];
    for (let i = 0; i < filteredPatients.length; i += 1) {
      filteredPatients[i].id === "1"
        ? filtered.push(filteredPatients[i])
        : null;
    }
    setFilteredPatients(filtered);
  };
  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper fixed>
      <View
        style={styles.container}
        pointerEvents={modalVisible ? "none" : "auto"}
      >
        {/* Left tab */}
        <View
          style={{ flex: 1, backgroundColor: colors.primaryContrastTextColor }}
        >
          <RowSelectionWrapper
            title={i18n.t("TabTitle.Patients")}
            riskFilterTag
            onRiskFilterClick={filterPatients}
            placeholder={i18n.t("Patients.SearchBarPlaceholder")}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            ItemSeparatorComponent={() => <ItemSeparator />}
            data={filteredPatients}
            renderItem={({ item }) => (
              <PatientDetailsRow
                generalDetails={item}
                patientClass={item.NHYAclass}
                age={23}
              />
            )}
            keyExtractor={(item) => item.patientID}
          />
        </View>

        {/* Right screen */}
        <View
          style={{ flex: 2, backgroundColor: colors.primaryWebBackgroundColor }}
        >
          {/* Patient name and avatar header */}
          <ContactTitle name={selectedPatient.name} isPatient />
          <Tab.Navigator
            tabBarOptions={{
              indicatorStyle: {
                backgroundColor: colors.primaryBarColor
              },
              style: {
                backgroundColor: colors.primaryContrastTextColor
              }
            }}
          >
            {/* OVERVIEW tab */}
            <Tab.Screen name={i18n.t("Patients.Overview")}>
              {() => <PatientOverview patient={selectedPatient} />}
            </Tab.Screen>

            {/* PARAMETERS tab */}
            <Tab.Screen name={i18n.t("Patients.Parameters")}>
              {() => <PatientParameter patient={selectedPatient} />}
            </Tab.Screen>

            {/* ICD/CRT tab */}
            <Tab.Screen name={i18n.t("Patients.ICD/CRT")}>
              {() => <PatientIcdCrt patient={selectedPatient} />}
            </Tab.Screen>

            {/* HISTORY tab */}
            <Tab.Screen name={i18n.t("Patients.History")}>
              {() => (
                <PatientHistory
                  patient={selectedPatient}
                  alertHistoryFunc={{
                    setDisplayHistory: setDisplayHistory,
                    setModalAlertVisible: setModalAlertVisible
                  }}
                  medicalRecordFunc={{
                    setViewMedicalModal: setViewMedicalModal,
                    setDisplayMedicalRecord: setDisplayMedicalRecord,
                    setAddMedicalRecord: setAddMedicalRecord
                  }}
                />
              )}
            </Tab.Screen>

            {/* INFO tab */}
            <Tab.Screen name={i18n.t("Patients.Info")}>
              {() => <PatientInformation patientInfo={selectedPatient} />}
            </Tab.Screen>
          </Tab.Navigator>
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
  modalContainer: {
    justifyContent: "center",
    height: "100%",
    width: "100%"
  }
});
