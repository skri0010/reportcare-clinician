import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { MedInput, MedPrescription } from "rc_agents/model";
import { Label } from "components/Text/Label";
import { mockMedPrescriptions } from "mock/mockMedDosages";
import { H6 } from "components/Text";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { Unit } from "util/const";

interface MedicationDetailsProps {
  medication: MedInput;
  currentDosage?: string;
}

export const MedicationDetails: FC<MedicationDetailsProps> = ({
  medication,
  currentDosage
}) => {
  const [medPrescription, setMedPrescription] = useState<
    MedPrescription | undefined
  >(undefined);

  useEffect(() => {
    setMedPrescription(
      mockMedPrescriptions.filter((t) => t.name === medication.name)[0]
    );
  }, [medication.name]);

  return (
    <View style={styles.container}>
      {medPrescription && (
        <View>
          <Label
            text={i18n.t("Patient_Configuration.Medications.Recommendations")}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={styles.detailContainer}>
              <H6
                text={`${i18n.t(
                  "Patient_Configuration.Medications.StartDose"
                )}:`}
                style={styles.detailTitle}
              />
              <H6
                text={`${medPrescription.dosages.startDose} ${Unit.DOSAGE}`}
              />
            </View>
            <View style={styles.detailContainer}>
              <H6
                text={`${i18n.t(
                  "Patient_Configuration.Medications.TargetDose"
                )}:`}
                style={styles.detailTitle}
              />
              <H6
                text={`${medPrescription.dosages.targetDose} ${Unit.DOSAGE}`}
              />
            </View>
            <View style={styles.detailContainer}>
              <H6
                text={`${i18n.t(
                  "Patient_Configuration.Medications.Increments"
                )}:`}
                style={styles.detailTitle}
              />
              <H6 text={medPrescription.dosages.increment} />
            </View>
          </View>
          <View style={[styles.detailContainer, styles.currentDosageContainer]}>
            <H6
              text={`${i18n.t(
                "Patient_Configuration.Medications.CurrentDosage"
              )}:`}
              style={styles.detailTitle}
            />
            <H6
              text={
                currentDosage
                  ? `${currentDosage} ${Unit.DOSAGE}`
                  : i18n.t("Keywords.None")
              }
              style={{ marginLeft: ms(5), alignSelf: "baseline" }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap"
  },
  detailContainer: {
    flexDirection: "column",
    flex: 1,
    padding: "3@ms"
  },
  detailTitle: {
    fontWeight: "600"
  },
  currentDosageContainer: {
    flexDirection: "row",
    marginTop: "5@ms"
  }
});
