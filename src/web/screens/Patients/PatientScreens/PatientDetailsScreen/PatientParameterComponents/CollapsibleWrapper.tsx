import { IconButton, IconType } from "components/Buttons/IconButton";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { H4 } from "components/Text";
import React, { FC, useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { RootState } from "util/useRedux";

interface CollapsibleWrapperProps {
  headerTitle: string;
}

export const CollapsibleWrapper: FC<CollapsibleWrapperProps> = ({
  headerTitle,
  children
}) => {
  const { colors, fonts } = useSelector((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapse = useCallback(
    () => setCollapsed(!collapsed),
    [collapsed]
  );

  return (
    // Toggleable Header
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.touchableHeader}>
        <View style={styles.headerRow}>
          <IconButton
            name={collapsed ? "expand-more" : "expand-less"}
            onPress={toggleCollapse}
            type={IconType.MATERIAL}
            size={fonts.h5Size}
            containerStyle={styles.iconContainerStyle}
            containerBackgroundColor={colors.primaryWebBackgroundColor}
            iconStyle={{ color: colors.primaryIconColor }}
          />
          <H4 text={headerTitle} />
        </View>
        <ItemSeparator topSpacing={ms(4)} bottomSpacing={ms(2)} />
      </TouchableOpacity>

      {!collapsed ? children : null}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: "8@ms"
  },
  touchableHeader: {
    paddingBottom: "5@ms"
  },
  headerRow: {
    flexDirection: "row"
  },
  iconContainerStyle: {
    justifyContent: "center",
    paddingTop: "2@ms",
    paddingRight: "5@ms"
  }
});
