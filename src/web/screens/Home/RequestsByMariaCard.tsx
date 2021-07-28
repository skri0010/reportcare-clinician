import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, FlatList, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import { PatientRequestRow } from "components/RowComponents/PatientRows/PatientRequestRow";
import { H3, H5 } from "components/Text";
import { CardWrapper } from "./CardWrapper";
import { FloatingShowMoreButton } from "components/Buttons/FloatingShowMoreButton";

interface RequestsByMariaCardProps {
  maxHeight: number;
}

export const RequestsByMariaCard: FC<RequestsByMariaCardProps> = ({
  maxHeight
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const titleColor = { color: colors.primaryTextColor } as TextStyle;
  const detailsColors = { color: colors.secondaryTextColor } as TextStyle;
  // JH-TODO: Replace with actual models
  const maxPatientsShown = Math.min(mockPatients.length, 10); // At 10 items, `Show More` button is displayed
  const lastPatientIndex = maxPatientsShown - 1;

  return (
    <CardWrapper maxHeight={maxHeight}>
      {/* Requests by MARIA */}
      <View style={styles.titleContainer}>
        <H3 text="Requests by Maria" style={[styles.title, titleColor]} />
        <H5 text="   (2 remaining)" style={[styles.details, detailsColors]} />
      </View>
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
                <FloatingShowMoreButton />
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  title: {
    fontWeight: "bold",
    paddingBottom: "8@ms"
  },
  patientRequestsContainer: {
    flex: 1
  },
  details: {
    fontWeight: "bold"
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