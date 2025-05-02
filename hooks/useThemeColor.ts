// useThemeColors.ts
import { useColorScheme } from "react-native";
import { getThemeColors } from "@/components/theme";;

export const useThemeColors = (themeOverride?: "Claro" | "Oscuro") => {
  const systemScheme = useColorScheme();
  const theme = themeOverride ?? (systemScheme === "dark" ? "Oscuro" : "Claro");
  return getThemeColors(theme);
};

