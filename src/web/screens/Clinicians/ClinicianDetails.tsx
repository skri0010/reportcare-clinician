import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { ContactTitle } from "components/RowComponents/ContactTitle";
import i18n from "util/language/i18n";
import { InfoTitleBar } from "components/Bars/InfoTitleBar";
import { ClinicianInfoRow } from "./ClinicianInfoRow";
import { RootState, select } from "util/useRedux";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import { ScreenName } from "web/navigation";

export const ClinicianDetails: FC = () => {
  const { clinicianSelected } = select((state: RootState) => ({
    clinicianSelected: state.clinicians.clinicianSelected
  }));

  return (
    <View style={{ flex: 2 }}>
      {!clinicianSelected ? (
        <NoSelectionScreen
          screenName={ScreenName.CLINICIANS}
          subtitle={i18n.t("Clinicians.NoSelection")}
        />
      ) : (
        <View>
          <ContactTitle name={clinicianSelected.name} isPatient={false} />
          <View style={{ marginHorizontal: ms(40) }}>
            <InfoTitleBar title={i18n.t("Clinicians.GeneralDetails")} />
            <View style={styles.infoSection}>
              <ClinicianInfoRow
                title={i18n.t("Clinicians.Role")}
                content={i18n.t(`Auth_Registration.${clinicianSelected.role}`)}
                iconType="doctor"
              />
              <ClinicianInfoRow
                title={i18n.t("Clinicians.HospitalName")}
                content={clinicianSelected.hospitalName}
                iconType="hospital"
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "30@ms",
    marginLeft: "40@ms"
  },
  infoSection: {
    paddingLeft: "30@ms",
    paddingTop: "10@ms",
    paddingBottom: "20@ms",
    flex: 1
  }
});
