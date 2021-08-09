import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { ClinicianInfo } from "aws/models";
import { H3, H4 } from "components/Text";
import { select, RootState } from "util/useRedux";
import { CardWrapper } from "../Home/CardWrapper";
import { ScreenWrapper } from "../ScreenWrapper";

interface ClinicianDetails {
    generalDetails: ClinicianInfo;
}

interface ClinicianSectionProps {
    title: string;
    information: string;
}

export const ClinicianSection: FC<ClinicianSectionProps> = ({ title, information }) => {
    return (
        <View>
            <H3 text={title} style={{ fontWeight: "bold", marginBottom: ms(10) }}/>
            <H4 text={information} style={{ marginBottom: ms(25) }} />
        </View>
    );
};

export const ClinicianDetails: FC<ClinicianDetails> = ({
    generalDetails
}) => { 
    const { colors } = select((state: RootState) => ({
      colors: state.settings.colors
    }));

    return (
        <ScreenWrapper>
            <View style={{ display: "flex", flexDirection: "column" }}>
                <H3 text="Clinician Info:" style={{ fontWeight:"bold", color: colors.primaryTextColor }}/>
            </View>
            <ClinicianSection title="Clinician Name:" information={generalDetails.name}/>
            <ClinicianSection title="Hospital Name:" information={generalDetails.hospitalName}/>
            <ClinicianSection title="Role:" information={generalDetails.role}/>
            <ClinicianSection title="Email:" information={generalDetails.id}/>
        </ScreenWrapper>

    );
};

const styles = ScaledSheet.create({
    rowStyle: {
        display: "flex",
        flexDirection: "column"
    }
});