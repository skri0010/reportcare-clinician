import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, FlatList, TextStyle, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import { PatientRequestRow } from "components/RowComponents/PatientRows/PatientRequestRow";
import { H4, H6 } from "components/Text";
import { CardWrapper } from "./CardWrapper";
// const Tab = createMaterialTopTabNavigator();

export const RequestsByMariaCard: FC = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const titleColor = { color: colors.primaryTextColor } as TextStyle;
  const detailsColors = { color: colors.secondaryTextColor } as TextStyle;

  return (
    <CardWrapper>
      {/* Requests by MARIA */}
      <View style={styles.titleContainer}>
        <H4 text="Requests by Maria" style={[styles.title, titleColor]} />
        <H6 text="(2 remaining)" style={[styles.details, detailsColors]} />
      </View>
      {/* Patient Requests List */}
      <View style={[styles.content]}>
        <View style={[styles.patients]}>
          <FlatList
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            windowSize={3}
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
        </View>

        <View style={styles.buttonContainer}>
          {/* Might have to change to use absolute positioning later on */}
          <TouchableOpacity
            onPress={() => null}
            style={[
              { backgroundColor: colors.primaryButtonColor },
              styles.button
            ]}
          >
            <H6
              text="SHOW MORE"
              style={[
                { color: colors.primaryContrastTextColor },
                styles.buttonText
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  title: {
    fontWeight: "bold",
    paddingBottom: "8@ms"
  },
  details: {
    fontWeight: "bold"
  },
  content: {
    flexDirection: "column"
    // TO-DO jy: explore options to resolve flatlist height issue
  },
  patients: {
    maxHeight: "100%",
    marginBottom: "10@ms"
  },
  buttonText: {
    textAlign: "center"
  },
  button: {
    borderRadius: "6@ms",
    width: "50%",
    padding: "5@ms"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline"
  }
});
