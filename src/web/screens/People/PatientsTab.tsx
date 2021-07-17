import React, { FC, useState, useEffect } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ScaledSheet } from "react-native-size-matters";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ParameterGraphs } from "components/Visualizations/ParameterGraphs";
import { ReportVitals } from "aws/models";
import { Patient } from "agents_implementation/agent_framework/model";
import agentDTA from "agents_implementation/agents/data-assistant/DTA";
import Belief from "agents_implementation/agent_framework/base/Belief";
import ProcedureConst from "agents_implementation/agent_framework/const/ProcedureConst";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import agentUXSA from "agents_implementation/agents/user-specific-assistant/UXSA";

export const PatientsTab: FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [graphIsReady, setReady] = useState<boolean>(false);
  const [vitalsData, setVitalsData] = useState<ReportVitals[]>([]);

  useEffect(() => {
    getPatients();
  }, []);

  // Triggers series of actions to get patients according to role.
  const getPatients = () => {
    agentUXSA.addBelief(new Belief("Clinician", "retrieveRole", true));
    agentAPI.addFact(
      new Belief("Procedure", "HF-OTP-I", ProcedureConst.ACTIVE)
    );

    // Waits for 0.5s before checking procedure state.
    setTimeout(() => {
      // Checks facts every 1s to determine if the chain of actions has been completed.
      const checkProcedure = setInterval(() => {
        const facts = agentAPI.getFacts();
        if (facts.Procedure["HF-OTP-I"] === ProcedureConst.INACTIVE) {
          const data: Patient[] = agentDTA.getBeliefs().Patient.all;
          if (data) {
            setPatients(data);
          }
          clearInterval(checkProcedure);
          agentAPI.addFact(new Belief("Patient", "all", null), true, true);
        }
      }, 1000);
    }, 500);
  };

  // Triggers series of actions to retrieve details specific to a patient.
  const getData = (patientId: string) => {
    agentDTA.addBelief(new Belief("Patient", "retrieveDetails", true));
    agentDTA.addBelief(new Belief("Patient", "viewDetails", patientId));
    agentAPI.addFact(
      new Belief("Procedure", "HF-OTP-II", ProcedureConst.ACTIVE)
    );

    // Waits for 0.5s before checking procedure state.
    setTimeout(() => {
      // Checks facts every 1s to determine if the chain of actions has been completed.
      const checkProcedure = setInterval(() => {
        const facts = agentAPI.getFacts();
        if (facts.Procedure["HF-OTP-II"] === ProcedureConst.INACTIVE) {
          const data: ReportVitals[] = facts.Patient.details.vitalsReports;
          if (data) {
            setVitalsData(data);
            setReady(true);
          }
          clearInterval(checkProcedure);
          agentAPI.addFact(new Belief("Patient", "details", null), true, true);
        }
      }, 1000);
    }, 500);
  };

  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.searchBarWrapper]}>
          <SearchBarComponent
            onUserInput={() => {
              null;
            }}
            onSearchClick={() => {
              null;
            }}
            placeholder="Search patients"
          />
        </View>
        <FlatList
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListHeaderComponent={() => <ItemSeparator />}
          ListFooterComponent={() => <ItemSeparator />}
          data={patients}
          renderItem={({ item }) => (
            <PatientDetailsRow
              generalDetails={item.details}
              patientClass={item.class}
              age={item.age}
              onRowPress={() => getData(item.details.id)}
            />
          )}
          keyExtractor={(item) => item.userId}
        />
        {graphIsReady && <ParameterGraphs data={vitalsData} />}
      </SafeAreaView>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  searchBarWrapper: {
    paddingBottom: "15@ms"
  }
});
