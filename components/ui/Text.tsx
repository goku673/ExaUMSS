import React from "react";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[] | null | undefined;
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

  // Normaliza y filtra estilos nulos/undefined
  const normalizedStyle = style
    ? Array.isArray(style)
      ? [styles.text, ...style.filter(Boolean)]
      : [styles.text, style]
    : [styles.text];

  return <RNText style={normalizedStyle}>{children}</RNText>;
};

export default Text;