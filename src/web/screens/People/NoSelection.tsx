import React, { FC } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "..";
import  Icon from "react-native-vector-icons/MaterialIcons";


interface NoSelectionProps {
    screenName: ScreenName,
    subtitle: string
}
export const NoSelection: FC<NoSelectionProps> = ({
    screenName,
    subtitle
}) => {
    return (
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100% "}}>
            <H4 text={subtitle} style={{ marginTop: ms(20) }}/>
        </View>
    );
};