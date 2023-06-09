import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H4, H5 } from "components/Text/index";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootState, select } from "util/useRedux";

interface ClinicianInfoRowProps {
  title: string;
  content: string;
  iconType: string;
  subcontent?: string;
}

export enum InfoIcon {
  GENDER = "person",
  BIRTHDATE = "cake",
  LOCATION = "location-on",
  CLASS = "groups",
  LANGUAGE = "g-translate",
  PHONE = "phone-in-talk",
  EMAIL = "email",
  ADDRESS = "home",
  EMERGENCY = "contact-phone",
  HOSPITAL = "local-hospital",
  DOCTOR = "user-md"
}

export const ClinicianInfoRow: FC<ClinicianInfoRowProps> = ({
  title,
  content,
  iconType,
  subcontent
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View style={styles.container}>
      <Icon
        name={iconType}
        size={ms(15)}
        style={{ paddingRight: ms(10), color: colors.primaryIconColor }}
      />
      <View style={styles.content}>
        <H4 text={`${title}:`} style={styles.infoTitle} />
        <H4 text={`${content}`} style={{ paddingRight: ms(5) }} />
        {subcontent ? <H5 text={`(${subcontent})`} style={null} /> : null}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingBottom: "10@ms",
    flexDirection: "row",
    alignItems: "center"
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  infoTitle: { fontWeight: "bold", paddingRight: "5@ms" }
});
