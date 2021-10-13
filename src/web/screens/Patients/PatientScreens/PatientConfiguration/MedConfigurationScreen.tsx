import React, { FC, useEffect, useState } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { ContactTitle } from "components/RowComponents/ContactTitle";
import i18n from "util/language/i18n";
import { InfoTitleBar } from "components/Bars/InfoTitleBar";
import { RootState, select } from "util/useRedux";
import { NoSelectionScreen } from "web/screens/Shared/NoSelectionScreen";
import { ScreenName } from "web/navigation";
import { MedInput } from "rc_agents/model";
import { setPatientMedInfo } from "rc_agents/storage/setItem";
import { H4 } from "components/Text";

interface MedConfigurationScreenProps {
  medInfo: MedInput | undefined;
}

export const MedConfigurationScreen: FC<MedConfigurationScreenProps> = ({
  medInfo
}) => {
  const [medToDisplay, setMedToDisplay] = useState<MedInput | undefined>(
    medInfo
  );

  useEffect(() => {
    setMedToDisplay(medInfo);
  }, [medInfo]);

  return (
    <View style={{ flex: 2 }}>
      {!medToDisplay ? (
        <NoSelectionScreen
          screenName={ScreenName.CLINICIANS}
          subtitle={i18n.t("Clinicians.NoSelection")}
        />
      ) : (
        <View>
          <InfoTitleBar title="Medication Details" />
          <H4 text={`${medToDisplay.name}`} />
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
