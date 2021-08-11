import React, { FC, useContext } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { ClinicianInfo } from "aws/models";
import { H3, H4 } from "components/Text";
import { select, RootState } from "util/useRedux";
import { CardWrapper } from "../Home/CardWrapper";
import { ScreenWrapper } from "../ScreenWrapper";
import { ClinicianContext } from "./CliniciansTab";
import { ContactTitle } from "./ContactTitle";

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
            <H4 text={information} style={{ marginBottom: ms(25) }}/>
        </View>
    );
};

export const ClinicianDetails: FC = () => { 
    const { colors } = select((state: RootState) => ({
      colors: state.settings.colors
    }));

    const generalDetails = useContext(ClinicianContext);
    return (
        <ScreenWrapper>
            <ContactTitle name={generalDetails.name} isPatient={false}/>
            <View style={styles.container}>
            <ClinicianSection title="Clinician Name:" information={generalDetails.name}/>
            <ClinicianSection title="Hospital Name:" information={generalDetails.hospitalName}/>
            <ClinicianSection title="Role:" information={generalDetails.role}/>
            <ClinicianSection title="Email:" information={generalDetails.id}/>
            </View>
        </ScreenWrapper>

    );
};

const styles = ScaledSheet.create({
    container: {
        margin: "30@ms",
        marginLeft: "40@ms"
    }
});