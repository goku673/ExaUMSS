import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Surface } from "react-native-paper";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

interface FormProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Form: React.FC<FormProps> = ({ children, style }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
      elevation: 4,
      borderRadius: 8,
    },
  });

  return <Surface style={[styles.container, style]}>{children}</Surface>;
};

export default Form;
