import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, FlatList, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/rowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import { PatientRequestRow } from "components/rowComponents/PatientRows/PatientRequestRow";
import { H4, H6 } from "components/text";
import { CardWrapper } from "./CardWrapper";
import { FloatingBottomButton } from "components/buttons/FloatingShowMoreButton";
import i18n from "util/language/i18n";

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
        <H4
          text={i18n.t("Home.RequestsByMaria")}
          style={[styles.title, titleColor]}
        />
        <H6
          text={`(2 ${i18n.t("Home.ItemsRemaining")})`}
          style={[styles.details, detailsColors]}
        />
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  title: {
    fontWeight: "bold",
    paddingBottom: "8@ms",
    paddingRight: "5@ms"
  },
  patientRequestsContainer: {
    flex: 1,
    paddingTop: "15@ms"
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
