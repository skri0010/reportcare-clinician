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


export const AlertDetailsScreen: FC = () => {
    const context = useContext(AlertContext);
    const findSymptoms = (vitalsReportID: string, symptomReportID: string) => {
        console.log(vitalsReportID);
        console.log(symptomReportID);
        // TODO: to be replaced with an API or agent call
        let symptom = mockSymptomRecords[0];
        let vitals = mockVitals[0];
        for (let i=0; i<mockSymptomRecords.length; i += 1){
            if (mockSymptomRecords[i].id === symptomReportID){
                symptom = mockSymptomRecords[i];
            }
        }
    
        for (let i=0; i<mockVitals.length; i += 1){
            if (mockVitals[i].id === vitalsReportID){
                vitals = mockVitals[i];
            }
        }
    
        return (
            <View>
            <H3 text={symptom.patientID}/>
            <H3 text={vitals.patientID}/>
            </View>
        );
    
    };
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <H4 text={context.patientName} style={styles.patientName}/>
                <H3 text="Alert Summary" style={styles.headers} />
                <H4 text={context.summary} />
                <H3 text="Alert Details" style={styles.informationTitle} />
                {findSymptoms(context.vitalsReportID, context.symptomReportID)}
            </View>
        </ScreenWrapper>
    );

};

const styles = ScaledSheet.create({
    container: {
        margin: "30@ms",
        marginLeft: "40ms"
    },
    patientName: {
        fontWeight: "bold",
        paddingBottom: "20@ms"
    },
    headers: {
        fontWeight: "bold",
        paddingBottom: "17@ms"
    },
    informationTitle: {
        fontWeight: "bold"
    }
});