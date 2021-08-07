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
import agentDTA from "agents_implementation/agents/data-assistant/DTA";
import Belief from "agents_implementation/agent_framework/base/Belief";
import {
  BeliefKeys,
  ClinicianAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import agentUXSA from "agents_implementation/agents/user-specific-assistant/UXSA";
import { setProcedureOngoing } from "ic-redux/actions/agents/actionCreator";
import { useNetInfo } from "@react-native-community/netinfo";
import i18n from "util/language/i18n";
import { PatientInformation } from "./PatientDetailsScreen/PatientInformation";

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

  const initialMedicalRecord = {
    id: "",
    patientId: "",
    record: "",
    content: ""
  };

  interface PopUpModalProps {
    visible: boolean;
    onRequestClose: () => void;
  }

  const [filteredPatients, setFilteredPatients] =
    useState<PatientInfo[]>(mockPatients);

  const [selectedPatient] = useState(mockPatients[0]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalVisible, setModalVisible] = useState(false);

  const [modalAlertVisible, setModalAlertVisible] = useState<boolean>(false);
  const [displayHistory, setDisplayHistory] =
    useState<AlertHistory>(initialAlertHistory);

  const [viewMedicalModal, setViewMedicalModal] = useState<boolean>(false);
  const [displayMedicalRecord, setDisplayMedicalRecord] =
    useState<MedicalRecords>(initialMedicalRecord);

  const [addMedicalRecord, setAddMedicalRecord] = useState<boolean>(false);

  const [retrieving, setRetrieving] = useState(false); // used locally to indicate ongoing retrieval of details
  const [showGraph, setShowGraph] = useState(false); // used locally for graph display

  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  // Wanted to use this as reusable component for pop up modal
  // But the slide animation during closing of modal is choppy for some reason
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const PopUpModal: FC<PopUpModalProps> = ({
    visible,
    onRequestClose,
    children
  }) => {
    return (
      <Modal
        transparent
        visible={visible}
        animationType="slide"
        onRequestClose={() => {
          onRequestClose;
        }}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.overlayColor }
          ]}
        >
          {children}
        </View>
      </Modal>
    );
  };

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
      {/* <View style={{ flexDirection: "row", height: "100%" }}> */}
      <View
        style={styles.container}
        pointerEvents={modalVisible ? "none" : "auto"}
      >
        <View style={{ flex: 1 }}>
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
        <View
          style={{ flex: 2, backgroundColor: colors.primaryWebBackgroundColor }}
        >
          <ContactTitle name={selectedPatient.name} isPatient />
          <Tab.Navigator
            tabBarOptions={{
              indicatorStyle: {
                backgroundColor: colors.primaryTextColor
              },
              style: {
                backgroundColor: colors.primaryWebBackgroundColor
              }
            }}
          >
            <Tab.Screen name={i18n.t("Patients.Overview")}>
              {() => <PatientOverview patient={selectedPatient} />}
            </Tab.Screen>
            <Tab.Screen name={i18n.t("Patients.Parameters")}>
              {() => <PatientParameter patient={selectedPatient} />}
            </Tab.Screen>
            <Tab.Screen name={i18n.t("Patients.ICD/CRT")}>
              {() => <PatientIcdCrt patient={selectedPatient} />}
            </Tab.Screen>
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
            <Tab.Screen name={i18n.t("Patients.Info")}>
              {() => <PatientInformation patientInfo={selectedPatient} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      </View>

      <View style={styles.modalView}>
        <Modal
          transparent
          visible={modalAlertVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalAlertVisible(false);
          }}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.overlayColor }
            ]}
          >
            <AlertHistoryModal
              name={selectedPatient.name}
              setModalAlertVisible={setModalAlertVisible}
              alertHistory={displayHistory}
            />
          </View>
        </Modal>
        <Modal
          transparent
          visible={viewMedicalModal}
          animationType="slide"
          onRequestClose={() => {
            setViewMedicalModal(false);
          }}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.overlayColor }
            ]}
          >
            <ViewMedicalRecords
              setViewMedicalModal={setViewMedicalModal}
              medicalRecord={displayMedicalRecord}
            />
          </View>
        </Modal>
        <Modal
          transparent
          visible={addMedicalRecord}
          animationType="slide"
          onRequestClose={() => {
            setAddMedicalRecord(false);
          }}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.overlayColor }
            ]}
          >
            <AddMedicalRecord setAddMedicalRecord={setAddMedicalRecord} />
          </View>
        </Modal>
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
