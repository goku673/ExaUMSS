import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

interface TitleProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const Title: React.FC<TitleProps> = ({ children, style }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const styles = StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginVertical: 16,
    },
  });

  return <Text style={[styles.title, style]}>{children}</Text>;
};

export default Title;