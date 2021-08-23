import React, { FC, useEffect, useState } from "react";
import { View, FlatList, Button } from "react-native";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ScaledSheet } from "react-native-size-matters";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
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
import { RootState, select, useDispatch } from "util/useRedux";
import { setProcedureOngoing } from "ic-redux/actions/agents/actionCreator";
import { LoadingIndicator } from "components/indicators/LoadingIndicator";
import { useNetInfo } from "@react-native-community/netinfo";

export const PatientsTab: FC = () => {
  const { patients, procedureOngoing } = select((state: RootState) => ({
    patients: state.agents.patients,
    procedureOngoing: state.agents.procedureOngoing
  }));

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
  }, [retrieving, procedureOngoing, showGraph]);

  // JH-TODO: Replace placeholder with i18n
  return (
    <MobileScreenWrapper>
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
            patient={item}
            onRowPress={() => getData(item.id)}
          />
        )}
        keyExtractor={(item) => item.patientID}
      />

      {/* To be removed: for testing purposes only */}
      {showGraph && (
        <Button
          title="Hide Graphs"
          onPress={() => {
            setShowGraph(false);
          }}
        />
      )}

      {/* TODO: Move graphs to PatientsDetails screen */}
      {/* {showGraph && <ParameterGraphs data={patientDetails.vitalsReports} />} */}

      {(retrieving || procedureOngoing) && <LoadingIndicator />}
    </MobileScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  searchBarWrapper: {
    paddingBottom: "15@ms"
  }
});
