/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { PatientInfo } from "aws/API";
import { mockPatients } from "mock/mockPatients";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { FilterTagProps } from "web/RiskFilterComponent";
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
import agentUXSA from "rc_agents/agents/user-specific-assistant/UXSA";
import { setProcedureOngoing } from "ic-redux/actions/agents/actionCreator";
import { useNetInfo } from "@react-native-community/netinfo";
import i18n from "util/language/i18n";
import { PatientDetailsNavigationStack } from "./PatientScreens/PatientDetailsNavigationStack";
import { PatientHistoryModal } from "./PatientDetailsScreen/PatientHistoryScreens/PatientHistoryModals";
import { WithSideTabsProps, ScreenName } from "web/screens";

export const PatientsScreen: FC<WithSideTabsProps[ScreenName.PATIENT]> = ({
  route
}) => {
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
  rowSelection: { flex: 1 }
});
