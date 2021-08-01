import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { ClinicianInfo } from "aws/models";
import { H3, H4 } from "components/Text";
import { select, RootState } from "util/useRedux";
import { CardWrapper } from "../Home/CardWrapper";

interface ClinicianDetails {
    generalDetails: ClinicianInfo;
}
export const ClinicianDetails: FC<ClinicianDetails> = ({
    generalDetails
}) => { 
    const { colors } = select((state: RootState) => ({
      colors: state.settings.colors
    }));

    return (
        <CardWrapper maxHeight={ms(120)}>
            <View style={{ display: "flex", flexDirection: "column" }}>
                <H3 text="Clinician Info:" style={{ fontWeight:"bold", color: colors.primaryTextColor }}/>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <H4 text="Name: " style={{ fontWeight: "bold", color: colors.primaryTextColor }}/>
                    <H4 text={generalDetails.name} style={{ color: colors.primaryTextColor }}/>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <H4 text="Hospital Name: " style={{ fontWeight: "bold", color: colors.primaryTextColor }}/>
                    <H4 text={generalDetails.hospitalName} style={{ color: colors.primaryTextColor }}/>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <H4 text="Email: " style={{ fontWeight: "bold", color: colors.primaryTextColor }}/>
                    <H4 text={generalDetails.id} style={{ color: colors.primaryTextColor }}/>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <H4 text="Role: " style={{ fontWeight: "bold", color: colors.primaryTextColor }}/>
                    <H4 text={generalDetails.role} style={{ color: colors.primaryTextColor }}/>
                </View>
            </View>
        </CardWrapper>

    );
};