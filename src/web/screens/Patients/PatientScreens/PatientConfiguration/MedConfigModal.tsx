import React, { FC, useState } from "react";
import { View } from "react-native";
import i18n from "util/language/i18n";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedInput, PatientDetails } from "rc_agents/model";
import { H4, H5, H6 } from "components/Text";
import { AdaptiveTwoScreenWrapper } from "web/screens/AdaptiveTwoScreenWrapper";
import { MedicationList } from "./MedicationList";
import { ClinicianDetails } from "web/screens/Clinicians/ClinicianDetails";
import { MedConfigurationScreen } from "./MedConfigurationScreen";

interface MedConfigModalProps {
  details: PatientDetails;
}

export const MedConfigModal: FC<MedConfigModalProps> = ({ details }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [medToUpdate, setMedToUpdate] = useState<MedInput | undefined>(
    undefined
  );

  const updateMed = (medInfo: MedInput) => {
    setMedToUpdate(medInfo);
  };

  return (
    <View
      style={[
        styles.form,
        {
          backgroundColor: colors.primaryBackgroundColor
        }
      ]}
    >
      <View>
        <H5 text={i18n.t("Patient_Configuration.Label.MedicationForm")} />
        <View style={styles.container}>
          <AdaptiveTwoScreenWrapper
            LeftComponent={
              <MedicationList details={details} updateMed={updateMed} />
            }
            RightComponent={
              <View
                style={{
                  flex: 2,
                  backgroundColor: colors.primaryWebBackgroundColor
                }}
              >
                <MedConfigurationScreen medInfo={medToUpdate} />
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "row", height: "100%" },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: "10@ms",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: "60@ms"
  },
  form: {
    paddingTop: "5@ms",
    borderRadius: "3@ms"
  }
});
