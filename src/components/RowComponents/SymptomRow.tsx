import React, { FC } from "react";
import { View } from "react-native";
import i18n from "util/language/i18n";
import { ReportSymptom } from "aws/API";
import { ScaledSheet } from "react-native-size-matters";
import { displayPlaceholder } from "util/const";
import { InformationText } from "components/Text/InformationText";
import { CollapsibleWrapper } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameterComponents/CollapsibleWrapper";
import { RootState, select } from "util/useRedux";

interface SymptomRowProps {
  symptom: ReportSymptom;
}

export const SymptomRow: FC<SymptomRowProps> = ({ symptom }) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  return (
    <View style={styles.container}>
      <CollapsibleWrapper
        headerTitle={symptom.symptomName}
        size={fonts.h5Size}
        collapseInitially
        lowerSeparatorOpacity
      >
        {/* Summary */}
        <InformationText
          boldText={i18n.t("Patient_Overview.SymptomAttributes.Summary")}
          normalText={`${symptom.summary}`}
        />
        {/* Severity */}
        <InformationText
          boldText={i18n.t("Patient_Overview.SymptomAttributes.Severity")}
          normalText={`${symptom.severity}`}
        />
        {/* Activity name */}
        <InformationText
          boldText={i18n.t("Patient_Overview.SymptomAttributes.Activity")}
          normalText={`${symptom.activityName}`}
        />
        {/* Activity duration */}
        <InformationText
          boldText={i18n.t(
            "Patient_Overview.SymptomAttributes.ActivityDuration"
          )}
          normalText={`${
            symptom.durationInMinutes || displayPlaceholder
          } ${i18n.t("Patient_Overview.SymptomAttributes.DurationUnit")}`}
          nestedLevel={1}
        />
        {/* Activity location */}
        <InformationText
          boldText={i18n.t(
            "Patient_Overview.SymptomAttributes.ActivityLocation"
          )}
          normalText={`${symptom.location || displayPlaceholder}`}
          nestedLevel={1}
        />

        {/* Other optional activity attributes */}
        {symptom.weather || symptom.temperature || symptom.humidity ? (
          <>
            {/* Activity weather */}
            <InformationText
              boldText={i18n.t(
                "Patient_Overview.SymptomAttributes.ActivityWeather"
              )}
              normalText={`${symptom.weather || displayPlaceholder}`}
              nestedLevel={1}
            />
            {/* Activity temperature */}
            <InformationText
              boldText={i18n.t(
                "Patient_Overview.SymptomAttributes.ActivityTemperature"
              )}
              normalText={`${symptom.temperature || displayPlaceholder}${i18n.t(
                "Patient_Overview.SymptomAttributes.TemperatureUnit"
              )}`}
              nestedLevel={1}
            />
            {/* Activity humidity */}
            <InformationText
              boldText={i18n.t(
                "Patient_Overview.SymptomAttributes.ActivityHumidity"
              )}
              normalText={`${symptom.humidity || displayPlaceholder} ${i18n.t(
                "Patient_Overview.SymptomAttributes.HumidityUnit"
              )}`}
              nestedLevel={1}
            />{" "}
          </>
        ) : null}
      </CollapsibleWrapper>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {}
});
