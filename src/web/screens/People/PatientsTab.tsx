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
import { View, FlatList, Dimensions } from "react-native";
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

  const [selectedPatient] = useState(mockPatients[0]);

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
    <ScreenWrapper>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ flex: 1, height: Dimensions.get("window").height }}>
          <RowSelectionWrapper
            title="Patient"
            riskFilterTag
            onRiskFilterClick={filterPatients}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <ItemSeparator />}
              ListHeaderComponent={() => <ItemSeparator />}
              ListFooterComponent={() => <ItemSeparator />}
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
          </RowSelectionWrapper>
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
              {() => <PatientHistory patient={selectedPatient} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      </View>
    </ScreenWrapper>
  );
};
