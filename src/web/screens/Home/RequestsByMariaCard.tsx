import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, FlatList, TextStyle, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import { PatientRequestRow } from "components/RowComponents/PatientRows/PatientRequestRow";
import { H4, H7 } from "components/Text";

// const Tab = createMaterialTopTabNavigator();

export const RequestsByMariaCard: FC = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const titleColor = { color: colors.primaryTextColor } as TextStyle;
  const detailsColors = { color: colors.secondaryTextColor } as TextStyle;

  return (
    <View style={styles.card}>
      {/* Requests by MARIA */}
      <View style={styles.titleContainer}>
        <H4 text="Requests by Maria" style={[styles.title, titleColor]} />
        <H7 text="   (2 remaining)" style={[styles.details, detailsColors]} />
      </View>
      {/* Patient Requests List */}
      <FlatList
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListHeaderComponent={() => <ItemSeparator />}
        ListFooterComponent={() => <ItemSeparator />}
        data={mockPatients}
        renderItem={({ item }) => (
          <PatientRequestRow
            generalDetails={item.generalDetails}
            request={item.request}
          />
        )}
        keyExtractor={(item) => item.itemId}
      />
      <View style={styles.buttonContainer}>
        {/* Might have to change to use absolute positioning later on */}
        <TouchableOpacity
          onPress={() => null}
          style={[
            { backgroundColor: colors.primaryButtonColor },
            styles.button
          ]}
        >
          <H4
            text="SHOW MORE"
            style={[
              { color: colors.primaryContrastTextColor },
              styles.buttonText
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  card: {
    backgroundColor: "white",
    padding: "10@ms",
    margin: "20@ms",
    borderRadius: "5@ms",
    height: "78%"
  },
  title: {
    fontWeight: "bold",
    paddingBottom: "8@ms"
  },
  details: {
    fontWeight: "bold"
  },
  buttonText: {
    textAlign: "center"
  },
  button: {
    height: "30@ms",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6@ms",
    width: "60%"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: "10@ms"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }
});
