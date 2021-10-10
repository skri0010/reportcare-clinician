import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, FlatList, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import { PatientRequestRow } from "components/RowComponents/PatientRows/PatientRequestRow";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { FloatingBottomButton } from "components/Buttons/FloatingBottomButton";
import i18n from "util/language/i18n";

interface RequestsByMariaCardProps {
  maxHeight: number;
}

export const RequestsByMariaCard: FC<RequestsByMariaCardProps> = ({
  maxHeight
}) => {
  // JH-TODO: Replace with actual models
  const maxPatientsShown = Math.min(mockPatients.length, 10); // At 10 items, `Show More` button is displayed
  const lastPatientIndex = maxPatientsShown - 1;

  return (
    <CardWrapper
      maxHeight={maxHeight}
      title={i18n.t("Home.RequestsByMaria")}
      subtitle={`(? ${i18n.t("Home.ItemsRemaining")})`}
    >
      {/* Patient Requests List */}
      <View style={styles.patientRequestsContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={mockPatients.slice(0, maxPatientsShown)}
          renderItem={({ item, index }) => {
            return index === lastPatientIndex ? (
              <>
                <PatientRequestRow
                  generalDetails={item}
                  // TODO clrify how are requests by maria stored
                  request="Verify titration values"
                  disabled
                  reduceOpacity
                />
                {/* Disable last row, display "Show More button" */}
                <FloatingBottomButton />
              </>
            ) : (
              <PatientRequestRow
                generalDetails={item}
                // TODO clrify how are requests by maria stored
                request="Verify titration values"
              />
            );
          }}
          keyExtractor={(item) => item.patientID!}
        />
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  patientRequestsContainer: {
    flex: 1
  },
  button: {
    borderRadius: "5@ms",
    width: "50%",
    padding: "5@ms"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "10@ms",
    width: "100%"
  },
  buttonText: {
    textAlign: "center"
  }
});
