import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import i18n from "util/language/i18n";
import { MedInput, MedPrescription } from "rc_agents/model";
import { Label } from "components/Text/Label";
import { mockMedPrescriptions } from "mock/mockMedDosages";
import { H6 } from "components/Text";

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
          <Label text="Recommended Start Dosage: " />
          <H6 text={`${medPrescription.dosages.startDose} mg`} />
          <Label text="Recommended Target Dosage: " />
          <H6 text={`${medPrescription.dosages.targetDose} mg`} />
          <Label text="Recommended Increments: " />
          <H6 text={medPrescription.dosages.increment} />
          <Label text="Current Dosage: " />
          {isAdding ? <H6 text="None" /> : <H6 text={configMedInfo.dosage} />}
        </View>
      ) : (
        <H6 text="Click on medicine name to view more information" />
      )}
    </View>
  );
};
