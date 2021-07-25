import React, { FC, useState, useEffect } from "react";
import { View, FlatList, Button } from "react-native";
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
import {
  BeliefKeys,
  ClinicianAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import agentUXSA from "agents_implementation/agents/user-specific-assistant/UXSA";
import { mockPatients } from "mock/mockPatients";
import { mockVitals } from "mock/mockVitals";

export const PatientsTab: FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [graphIsReady, setReady] = useState<boolean>(false);
  const [vitalsData, setVitalsData] = useState<ReportVitals[]>([]);

  useEffect(() => {
    getPatients();
  }, []);

  // Triggers series of actions to get patients according to role.
  const getPatients = () => {
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

    // Waits for 0.5s before checking procedure state.
    setTimeout(() => {
      // Checks facts every 1s to determine if the chain of actions has been completed.
      const checkProcedure = setInterval(() => {
        const facts = agentAPI.getFacts();
        if (
          facts[BeliefKeys.PROCEDURE][ProcedureAttributes.HF_OTP_I] ===
          ProcedureConst.INACTIVE
        ) {
          const data: Patient[] =
            agentAPI.getFacts()[BeliefKeys.PATIENT]?.[PatientAttributes.ALL];
          if (data) {
            setPatients(data);
          }

          // To be removed: for testing purposes only
          const mockData: Patient[] = mockPatients.map((patient) => {
            return {
              details: patient.generalDetails,
              userId: patient.itemId,
              class: patient.patientClass,
              age: patient.age
            };
          });
          setPatients(mockData);

          clearInterval(checkProcedure);
          agentAPI.addFact(
            new Belief(BeliefKeys.PATIENT, PatientAttributes.ALL, null),
            false,
            true
          );
        }
      }, 1000);
    }, 500);
  };

  // Triggers series of actions to retrieve details specific to a patient.
  const getData = (patientId: string) => {
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

    // Waits for 0.5s before checking procedure state.
    setTimeout(() => {
      // Checks facts every 1s to determine if the chain of actions has been completed.
      const checkProcedure = setInterval(() => {
        const facts = agentAPI.getFacts();
        if (
          facts[BeliefKeys.PROCEDURE][ProcedureAttributes.HF_OTP_II] ===
          ProcedureConst.INACTIVE
        ) {
          const data: ReportVitals[] =
            facts[BeliefKeys.PATIENT]?.[PatientAttributes.DETAILS]
              ?.vitalsReports;
          if (data) {
            setVitalsData(data);
            setReady(true);
          }

          // To be removed: for testing purposes only
          setVitalsData(mockVitals);

          clearInterval(checkProcedure);
          agentAPI.addFact(
            new Belief(BeliefKeys.PATIENT, PatientAttributes.DETAILS, null),
            false,
            true
          );
        }
      }, 1000);
    }, 500);
  };

  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
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

      {/* To be removed: for testing purposes only */}
      {graphIsReady && (
        <Button
          title="Hide Graphs"
          onPress={() => {
            setReady(false);
          }}
        />
      )}

      {/* TODO: Move graphs to PatientsDetails section */}
      {graphIsReady && <ParameterGraphs data={vitalsData} />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  searchBarWrapper: {
    paddingBottom: "15@ms"
  }
});
