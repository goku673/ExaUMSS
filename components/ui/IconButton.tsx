import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { IconButton as PaperIconButton } from "react-native-paper";

interface IconButtonProps {
  icon: string;
  size?: number;
  onPress: () => void;
  style?: ViewStyle;
}

const IconButton = React.forwardRef<any, IconButtonProps>(
  ({ icon, size = 24, onPress, style }, ref) => (
    <PaperIconButton
      ref={ref}
      icon={icon}
      size={size}
      onPress={onPress}
      style={[styles.iconButton, style]}
    />
  )
);

const styles = StyleSheet.create({
  iconButton: {
    margin: 0,
  },
});

export default IconButton;
