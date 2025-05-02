import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "@/components/ui/ThemeContext";
import "@/services/i18n";
import { Stack } from "expo-router";
import { getThemeColors } from "@/components/theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemeWrapper />
    </ThemeProvider>
  );
}

function ThemeWrapper() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <PaperProvider
      theme={{
        colors: {
          primary: colors.primary,
          background: colors.background,
          text: colors.text,
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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}