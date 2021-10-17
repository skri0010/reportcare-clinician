import { MedicationInfo } from "aws/API";
import React, { FC } from "react";
import { FlatList } from "react-native";
import i18n from "util/language/i18n";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";

interface MedicationCardProps {
  medication?: MedicationInfo[] | null;
}

export const MedicationCard: FC<MedicationCardProps> = ({ medication }) => {
  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.Medications.Medications")}
      iconName="pill"
    >
      {medication && medication.length > 0 ? (
        <FlatList
          data={medication}
          horizontal
          renderItem={({ item }) => (
            <BaseDetailsContent
              title={item.name}
              content={`${item.dosage} mg`}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <NoListItemMessage
          screenMessage={i18n.t("Alerts.Medications.NoMedicationRecord")}
        />
      )}
    </BaseDetailsCard>
  );
};
