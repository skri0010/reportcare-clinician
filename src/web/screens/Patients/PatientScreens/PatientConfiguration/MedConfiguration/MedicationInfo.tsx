import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { MedInput, MedPrescription } from "rc_agents/model";
import { Label } from "components/Text/Label";
import { mockMedPrescriptions } from "mock/mockMedDosages";
import { H6 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";

interface MedicationInfo {
  configMedInfo: MedInput;
  isAdding: boolean;
  currentDosage?: string;
}

export const MedicationInfo: FC<MedicationInfo> = ({
  configMedInfo,
  isAdding,
  currentDosage = ""
}) => {
  const [medPrescription, setMedPrescription] = useState<
    MedPrescription | undefined
  >(
    configMedInfo.name === ""
      ? undefined
      : mockMedPrescriptions.filter((t) => t.name === configMedInfo.name)[0]
  );

  useEffect(() => {
    setMedPrescription(
      mockMedPrescriptions.filter((t) => t.name === configMedInfo.name)[0]
    );
  }, [configMedInfo.name]);

  return (
    <View>
      {medPrescription ? (
        <View>
          <Label
            text={i18n.t("Patient_Configuration.Medications.Recommendations")}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={styles.reccomendations}>
              <Label
                text={i18n.t("Patient_Configuration.Medications.StartDose")}
              />
              <H6 text={`${medPrescription.dosages.startDose} mg`} />
            </View>
            <View style={styles.reccomendations}>
              <Label
                text={i18n.t("Patient_Configuration.Medications.TargetDose")}
              />
              <H6 text={`${medPrescription.dosages.targetDose} mg`} />
            </View>
            <View style={styles.reccomendations}>
              <Label
                text={i18n.t("Patient_Configuration.Medications.Increments")}
              />
              <H6 text={medPrescription.dosages.increment} />
            </View>
          </View>
          <Label
            text={i18n.t("Patient_Configuration.Medications.CurrentDosage")}
          />
          {isAdding ? <H6 text="None" /> : <H6 text={currentDosage} />}
        </View>
      ) : (
        <H6 text="Click on medicine name to view more information" />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  reccomendations: {
    flexDirection: "column",
    flex: 1,
    padding: "3@ms"
  }
});
