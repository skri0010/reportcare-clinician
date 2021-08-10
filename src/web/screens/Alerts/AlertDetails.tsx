import React, { FC, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H2, H3, H4, H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ScreenWrapper } from "../ScreenWrapper";
import { AlertContext } from "./AlertScreen";
import { mockSymptomRecords } from "mock/mockSymptoms";
import { mockVitals } from "mock/mockVitals";
import { mockAlerts } from "mock/mockAlerts";
import { ReportVitals } from "aws/API";
import { ReportSymptom } from "aws/models";
import { AlertDetailsRow } from "../People/PatientDetailsScreen/PatientHistoryScreens/AlertHistoryModal";


export interface AlertDetailsProps {
    reportVitals: ReportVitals,
    reportSymptom: ReportSymptom
}
export const AlertDetails: FC<AlertDetailsProps> = ({ reportVitals, reportSymptom }) => {
    const { colors } = select((state: RootState) => ({
        colors: state.settings.colors
    }));
    return (
        <View style={{ flexDirection: "column" }}>
            <AlertDetailsRow detailTitle="BP: " detailContent={reportVitals.BPDi}/>
            <AlertDetailsRow detailTitle="Symptom: " detailContent={reportSymptom.Name}/>
            <AlertDetailsRow detailTitle="Severity: " detailContent={reportSymptom.Severity}/>
        </View>
    );


};

const styles = ScaledSheet.create({
    rowStyle: {
        paddingBottom: "10@ms"
    },
    boldText: {
        fontWeight: "bold"
    }
});