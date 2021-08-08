import React, { FC } from "react";
import { ViewBase, View, FlatList } from "react-native";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";
import { Alert } from "aws/API";
import i18n from "util/language/i18n";
import { mockCompletedAlerts } from "mock/mockAlerts";
import { AlertRow } from "components/RowComponents/AlertRow";
import { AlertRowTabProps } from "./AlertCurrentTab";
import { ScreenWrapper } from "../ScreenWrapper";

export const AlertCompletedTab: FC<AlertRowTabProps> = ({ setAlertSelected }) => {
    const { colors } = select((state: RootState) => ({
        colors: state.settings.colors
    }));

    function onCardPress(item: Alert){
        setAlertSelected(item);
    }

    return (
        <ScreenWrapper>
            <SearchBarComponent
            onSearchClick={() => {
                null;
            }}
            onUserInput = {() => {
                null;
            }}
            containerStyle= {{ backgroundColor: colors.primaryContrastTextColor }}
            placeholder="Search..."
            />
            <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ItemSeparator />}
            data={mockCompletedAlerts}
            renderItem={({ item }) => (
                <AlertRow
                alertDetails={item}
                onCardPress={() => onCardPress(item)}
                />
            )}
            />
        </ScreenWrapper>
    );
};