import { FloatingBottomButton } from "components/buttons/FloatingBottomButton";
import React, { FC, ReactElement, useState } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { isMobile } from "util/device";
import i18n from "util/language/i18n";

interface AdaptiveTwoScreenWrapperProps {
  LeftComponent: ReactElement<any, any>;
  RightComponent: ReactElement<any, any>;
  displayLeftComponentFirstOnMobile?: boolean;
}

export const AdaptiveTwoScreenWrapper: FC<AdaptiveTwoScreenWrapperProps> = ({
  LeftComponent,
  RightComponent,
  displayLeftComponentFirstOnMobile = false // Display right component first by default
}) => {
  const [displayLeft, setDisplayLeft] = useState(
    displayLeftComponentFirstOnMobile
  );

  const toggleDisplay = () => {
    setDisplayLeft(!displayLeft);
  };

  return isMobile ? (
    // For mobile, display either left or right component with a toggle button at the bottom
    <View style={styles.mobileContainer}>
      {displayLeft && LeftComponent}
      {!displayLeft && RightComponent}
      <FloatingBottomButton
        title={
          displayLeft
            ? i18n.t("MobileMessage.BackToDetails")
            : i18n.t("MobileMessage.ViewList")
        }
        onPress={toggleDisplay}
      />
      {/* <Button title="Change selection" onPress={toggleDisplay} /> */}
    </View>
  ) : (
    // For desktop, display left and right components normally
    <>
      {LeftComponent}
      {RightComponent}
    </>
  );
};

const styles = ScaledSheet.create({
  mobileContainer: {
    flexDirection: "column",
    width: "100%"
  }
});
