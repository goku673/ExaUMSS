import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

interface FormFooterProps {
  children: React.ReactNode;
}

const FormFooter: React.FC<FormFooterProps> = ({ children }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const styles = StyleSheet.create({
    footer: {
      backgroundColor: colors.background,
    },
  });

  return <View style={styles.footer}>{children}</View>;
};

export default FormFooter;
