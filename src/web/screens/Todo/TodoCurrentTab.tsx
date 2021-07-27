import React, { FC } from "react";
import { View, FlatList } from "react-native";
// import { ScreenWrapper } from "web/screens/ScreenWrapper";
// import { MainTitle } from "components/Text";
import { TodoRow } from "components/RowComponents/TodoRow";
import { mockPatientRowDetails } from "mock/mockTodoDetails";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
// import { TodoScreenProps } from "../TodoScreenProps";
import { ITodoDetails } from "models/TodoDetails";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";

interface TodoCurrentTabProps {
  setTodoSelected: (item: ITodoDetails) => void;
}

export const TodoCurrentTab: FC<TodoCurrentTabProps> = ({
  setTodoSelected
}) => {
  // JH-TODO Replace titles with i18n
  // JH-TODO Flatlist
  // JH-TODO Remove mock data

  function onCardPress(item: ITodoDetails) {
    setTodoSelected(item);
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={() => {
          null;
        }}
        containerStyle={{ backgroundColor: "white" }}
        placeholder="Search current todo"
      />
      {/* <MainTitle title="Current Todo" /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListHeaderComponent={() => <ItemSeparator />}
        ListFooterComponent={() => <ItemSeparator />}
        data={mockPatientRowDetails}
        renderItem={({ item }) => (
          <TodoRow
            todoDetails={item}
            riskLevel={RiskLevel.HIGH}
            onCardPress={() => onCardPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* <TodoRow
          todoDetails={mockPatientRowDetails[0]}
          riskLevel={RiskLevel.HIGH}
        /> */}
    </View>
  );
};
