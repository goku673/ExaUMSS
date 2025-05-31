import React from "react";
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

interface ButtonProps {
  label: string;
  onPress: () => void;
  mode?: "text" | "outlined" | "contained";
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  translate?: boolean;
  compact?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  mode = "contained",
  style,
  labelStyle,
  icon,
  loading = false,
  disabled = false,
  translate = true,
  compact = false,
}) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();

  // Default button colors based on theme and mode
  const getButtonColors = () => {
    if (mode === "contained") {
      return {
        backgroundColor: colors.primary,
        textColor: colors.buttonText,
        borderColor: colors.primary,
      };
    }
    if (mode === "outlined") {
      return {
        backgroundColor: "transparent",
        textColor: colors.primary,
        borderColor: colors.primary,
      };
    }
    // text mode
    return {
      backgroundColor: "transparent",
      textColor: colors.primary,
      borderColor: "transparent",
    };
  };

  const buttonColors = getButtonColors();

  const styles = StyleSheet.create({
    button: {
      borderRadius: 12,
      marginVertical: 8,
      borderWidth: mode === "outlined" ? 1 : 0,
      borderColor: buttonColors.borderColor,
      backgroundColor: buttonColors.backgroundColor,
      elevation: mode === "contained" ? 2 : 0,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: mode === "contained" ? 0.2 : 0,
      shadowRadius: 4,
    },
    compact: {
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    regular: {
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    label: {
      fontWeight: "600",
      fontSize: 16,
      color: buttonColors.textColor,
    },
    disabled: {
      opacity: 0.6,
    },
  });

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      style={[
        styles.button,
        compact ? styles.compact : styles.regular,
        disabled && styles.disabled,
        style,
      ]}
      labelStyle={[styles.label, labelStyle]}
      textColor={buttonColors.textColor}
      icon={icon}
      loading={loading}
      disabled={disabled}
      contentStyle={{ flexDirection: icon ? "row-reverse" : "row" }}
    >
      {translate ? t(label) : label}
    </PaperButton>
  );
};

export default Button;