import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { H2 } from "components/Text";
import { PeopleAvatar } from "components/RowComponents/PeopleAvatar";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { AgentTrigger } from "rc_agents/trigger";
import { useNetInfo } from "@react-native-community/netinfo";

interface ContactTitleProps {
  name: string;
  // eslint-disable-next-line react/no-unused-prop-types
  image?: string; // FUTURE-TODO: Replace with image implementation
  isPatient: boolean;
  patientId?: string;
  setSharePatient?: (state: boolean) => void;
}

export const ContactTitle: FC<ContactTitleProps> = ({
  name,
  isPatient,
  patientId,
  setSharePatient
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [isOnline, setIsOnline] = useState(false);

  const netInfo = useNetInfo();

  useEffect(() => {
    // Internet connection detected
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      setIsOnline(true);
    }
    // No internet connection
    else if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      setIsOnline(false);
    }
  }, [netInfo]);

  // Triggers retrieval of clinicians for sharing patient and loads the modal.
  const onShareIconPress = () => {
    if (patientId && setSharePatient) {
      AgentTrigger.triggerRetrieveSharingClinicians(patientId);
      setSharePatient(true);
    }
  };

  return (
    <View
      style={[
        styles.rowStyle,
        { backgroundColor: colors.primaryBackgroundColor }
      ]}
    >
      {/* Image (left container) */}
      <View style={styles.avatarContainer}>
        <PeopleAvatar iconType={isPatient ? "person" : "user-md"} />
      </View>
      <H2 text={name} style={{ fontWeight: "bold" }} />

      {/* Icon button for sharing a patient */}
      {isPatient && (
        <IconButton
          name="share-variant"
          disabled={!isOnline}
          type={IconType.MATERIAL_COMMUNITY}
          onPress={onShareIconPress}
          iconStyle={{
            color: isOnline
              ? colors.acceptButtonColor
              : colors.primaryDeactivatedButtonColor
          }}
          containerBackgroundColor="transparent"
          containerStyle={{ paddingLeft: ms(10), alignSelf: "center" }}
        />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  rowStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "7@ms",
    paddingRight: "10@ms",
    paddingLeft: "10@ms"
  }
});
