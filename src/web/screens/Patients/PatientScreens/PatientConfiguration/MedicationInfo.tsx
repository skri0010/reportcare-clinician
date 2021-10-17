import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { MedInput, MedPrescription } from "rc_agents/model";
import { Label } from "components/Text/Label";
import { mockMedPrescriptions } from "mock/mockMedDosages";
import { H6 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";

interface MedicationInfo {
  configMedInfo: MedInput;
  isAdding: boolean;
}

export const MedicationInfo: FC<MedicationInfo> = ({
  configMedInfo,
  isAdding
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
          <Label text="Recommendations: " />
          <View style={{ flexDirection: "row" }}>
            <View style={styles.reccomendations}>
              <Label text="Start Dose: " />
              <H6 text={`${medPrescription.dosages.startDose} mg`} />
            </View>
            <View style={styles.reccomendations}>
              <Label text="Target Dosage: " />
              <H6 text={`${medPrescription.dosages.targetDose} mg`} />
            </View>
            <View style={styles.reccomendations}>
              <Label text="Increments: " />
              <H6 text={medPrescription.dosages.increment} />
            </View>
          </View>
          <Label text="Current Dosage: " />
          {isAdding ? <H6 text="None" /> : <H6 text={configMedInfo.dosage} />}
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
