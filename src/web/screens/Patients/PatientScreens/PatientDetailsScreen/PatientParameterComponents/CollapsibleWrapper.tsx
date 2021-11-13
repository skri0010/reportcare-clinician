import { IconButton, IconType } from "components/Buttons/IconButton";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { HBase } from "components/Text";
import React, { FC, useCallback, useState } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";

interface CollapsibleWrapperProps {
  headerTitle: string;
  containerStyle?: StyleProp<ViewStyle>;
  size?: number;
  collapseInitially?: boolean;
  lowerSeparatorOpacity?: boolean;
}

export const CollapsibleWrapper: FC<CollapsibleWrapperProps> = ({
  headerTitle,
  containerStyle,
  size,
  collapseInitially = false,
  lowerSeparatorOpacity = false,
  children
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const [collapsed, setCollapsed] = useState<boolean>(collapseInitially);

  const toggleCollapse = useCallback(
    () => setCollapsed(!collapsed),
    [collapsed]
  );

  return (
    // Toggleable Header
    <View
      style={[
        { paddingTop: ms(2), paddingBottom: collapsed ? ms(0) : ms(8) },
        containerStyle
      ]}
    >
      <TouchableOpacity onPress={toggleCollapse} style={styles.touchableHeader}>
        <View style={styles.headerRow}>
          <IconButton
            name={collapsed ? "expand-more" : "expand-less"}
            onPress={toggleCollapse}
            type={IconType.MATERIAL}
            size={size || fonts.h5Size}
            containerStyle={styles.iconContainerStyle}
            iconStyle={{ color: colors.primaryIconColor }}
          />
          <HBase text={headerTitle} size={size || fonts.h4Size} />
        </View>
        <ItemSeparator
          topSpacing={ms(4)}
          bottomSpacing={ms(2)}
          lowerSeparatorOpacity={lowerSeparatorOpacity}
        />
      </TouchableOpacity>

      {!collapsed ? children : null}
    </View>
  );
};

const styles = ScaledSheet.create({
  touchableHeader: {
    paddingBottom: "5@ms"
  },
  headerRow: {
    flexDirection: "row"
  },
  iconContainerStyle: {
    justifyContent: "center",
    paddingRight: "5@ms"
  }
});
