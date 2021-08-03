// import { Patient } from "agents_implementation/agent_framework/model";
// import agentDTA from "agents_implementation/agents/data-assistant/DTA";
// import Belief from "agents_implementation/agent_framework/base/Belief";
// import ProcedureConst from "agents_implementation/agent_framework/const/ProcedureConst";
// import agentAPI from "agents_implementation/agent_framework/AgentAPI";
// import agentUXSA from "agents_implementation/agents/user-specific-assistant/UXSA";
// import { mockVitals } from "mock/mockVitals";
// import { RiskLevel } from "models/RiskLevel";
// import { SearchBarComponent } from "components/Bars/SearchBarComponent";
// import { ScaledSheet } from "react-native-size-matters";
import React, { FC, useState } from "react";
import { View, FlatList, Modal } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { PatientInfo } from "aws/models";
import { mockPatients } from "mock/mockPatients";
import { RowSelectionWrapper } from "../RowSelectionTab";
import { FilterTagProps } from "web/RiskFilterTab";
import { PatientOverview } from "./PatientDetailsScreen/PatientOverview";
import { RootState, select } from "util/useRedux";
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

const Tab = createMaterialTopTabNavigator();

export const PatientsTab: FC = () => {
  // const [patients, setPatients] = useState<Patient[]>([]);
  // const [graphIsReady, setReady] = useState<boolean>(false);
  // const [vitalsData, setVitalsData] = useState<ReportVitals[]>([]);

  // useEffect(() => {
  //   getPatients();
  // }, []);

  // // Triggers series of actions to get patients according to role.
  // const getPatients = () => {
  //   agentUXSA.addBelief(new Belief("Clinician", "retrieveRole", true));
  //   agentAPI.addFact(
  //     new Belief("Procedure", "HF-OTP-I", ProcedureConst.ACTIVE)
  //   );

  //   // Waits for 0.5s before checking procedure state.
  //   setTimeout(() => {
  //     // Checks facts every 1s to determine if the chain of actions has been completed.
  //     const checkProcedure = setInterval(() => {
  //       const facts = agentAPI.getFacts();
  //       if (facts.Procedure["HF-OTP-I"] === ProcedureConst.INACTIVE) {
  //         const data: Patient[] = agentAPI.getFacts().Patient?.all;
  //         if (data) {
  //           setPatients(data);
  //         }

  //         // To be removed: for testing purposes only
  //         const mockData: Patient[] = mockPatients.map((patient) => {
  //           return {
  //             details: patient,
  //             userId: patient.patientID,
  //             age: 53,
  //             riskLevel: RiskLevel.UNASSIGNED
  //           };
  //         });
  //         setPatients(mockData);

  //         clearInterval(checkProcedure);
  //         agentAPI.addFact(new Belief("Patient", "all", null), false, true);
  //       }
  //     }, 1000);
  //   }, 500);
  // };

  // // Triggers series of actions to retrieve details specific to a patient.
  // const getData = (patientId: string) => {
  //   agentDTA.addBelief(new Belief("Patient", "retrieveDetails", true));
  //   agentAPI.addFact(new Belief("Patient", "viewDetails", patientId), false);
  //   agentAPI.addFact(
  //     new Belief("Procedure", "HF-OTP-II", ProcedureConst.ACTIVE)
  //   );

  //   // Waits for 0.5s before checking procedure state.
  //   setTimeout(() => {
  //     // Checks facts every 1s to determine if the chain of actions has been completed.
  //     const checkProcedure = setInterval(() => {
  //       const facts = agentAPI.getFacts();
  //       if (facts.Procedure["HF-OTP-II"] === ProcedureConst.INACTIVE) {
  //         const data: ReportVitals[] = facts.Patient?.details.vitalsReports;
  //         if (data) {
  //           setVitalsData(data);
  //           setReady(true);
  //         }

  //         // To be removed: for testing purposes only
  //         setVitalsData(mockVitals);

  //         clearInterval(checkProcedure);
  //         agentAPI.addFact(new Belief("Patient", "details", null), false, true);
  //       }
  //     }, 1000);
  //   }, 500);
  // };

  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [filteredPatients, setFilteredPatients] =
    useState<PatientInfo[]>(mockPatients);

  const initialAlertHistory = {
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
    patientId: "",
    record: "",
    content: ""
  };

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

  interface PopUpModalProps {
    visible: boolean;
    onRequestClose: () => void;
  }

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
            title="Patient"
            riskFilterTag
            onRiskFilterClick={filterPatients}
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
            <Tab.Screen name="Overview">
              {() => <PatientOverview patient={selectedPatient} />}
            </Tab.Screen>
            <Tab.Screen name="Parameters">
              {() => <PatientParameter patient={selectedPatient} />}
            </Tab.Screen>
            <Tab.Screen name="ICD/CRT">
              {() => <PatientIcdCrt patient={selectedPatient} />}
            </Tab.Screen>
            <Tab.Screen name="History">
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
