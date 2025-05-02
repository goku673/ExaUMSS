import React from "react";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

const Text: React.FC<TextProps> = ({ children, style }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  
  const styles = StyleSheet.create({
    text: {
      fontSize: 16,
      color: colors.text,
    },
  });

  return <RNText style={[styles.text, style]}>{children}</RNText>;
};

export default Text;