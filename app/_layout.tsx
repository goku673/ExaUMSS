import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "@/components/ui/ThemeContext";
import "@/services/i18n";
import { Stack } from "expo-router";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

export default function RootLayout() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <ThemeProvider>
      <PaperProvider
        theme={{
          colors: {
            primary: colors.primary,
            background: colors.background,
            text: colors.text,
            // Add other required Paper theme colors
          },
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen 
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}