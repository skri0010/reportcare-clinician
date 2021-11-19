import React, { FC, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ScaledSheet } from "react-native-size-matters";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { agentDTA } from "rc_agents/agents";
import { Belief } from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { RootState, select, useDispatch } from "util/useRedux";
import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import { useNetInfo } from "@react-native-community/netinfo";
import { setProcedureOngoing } from "ic-redux/actions/agents/procedureActionCreator";
import i18n from "util/language/i18n";
import { AgentTrigger } from "rc_agents/trigger";

export const PatientsTab: FC = () => {
  const { patients, procedureOngoing } = select((state: RootState) => ({
    patients: state.patients.patients,
    procedureOngoing: state.procedures.procedureOngoing
  }));

  const [retrieving, setRetrieving] = useState(false); // used locally to indicate ongoing retrieval of details
  const [showGraph, setShowGraph] = useState(false); // used locally for graph display

  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  // Triggers series of actions to get patients according to role.
  const getPatients = () => {
    // Start of retrieval
    dispatch(setProcedureOngoing(true));
    AgentTrigger.triggerRetrievePatientsByRole();
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
          placeholder={i18n.t("Patients.SearchBarPlaceholder")}
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
            onRowPress={() => getData(item.patientID)}
          />
        )}
        keyExtractor={(item) => item.patientID}
      />

      {(retrieving || procedureOngoing) && <LoadingIndicator />}
    </MobileScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  searchBarWrapper: {
    paddingBottom: "15@ms"
  }
});
