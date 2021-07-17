import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import {
  View,
  FlatList,
  TextStyle,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import { PatientRequestRow } from "components/RowComponents/PatientRows/PatientRequestRow";
import { H4, H6 } from "components/Text";
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
        <H6 text="   (2 remaining)" style={[styles.details, detailsColors]} />
      </View>
      {/* Patient Requests List */}
      <View style={styles.content}>
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
    </View>
  );
};

const styles = ScaledSheet.create({
  card: {
    backgroundColor: "white",
    padding: "10@ms",
    margin: "20@ms",
    borderRadius: "5@ms",
    height: "100%"
  },
  title: {
    fontWeight: "bold",
    paddingBottom: "8@ms"
  },
  details: {
    fontWeight: "bold"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    // TO-DO jy: explore options to resolve flatlist height issue
    maxHeight: Dimensions.get("window").height * 0.41
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }
});
