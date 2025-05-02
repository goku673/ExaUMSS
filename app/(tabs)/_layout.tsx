import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

export default function TabsLayout() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { 
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          bottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="landing"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          title: t('layout.inicio'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          title: t('layout.perfil'),
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
          title: t('layout.guia'),
        }}
      />
      <Tabs.Screen
        name="practices"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="archive" color={color} size={size} />
          ),
          title: t('layout.practicas'),
        }}
      />
      <Tabs.Screen
        name="settings" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          title: t('layout.ajustes'),
        }}
      />
    </Tabs>
  );
}
/*
//probar
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "@/components/ui/LoginScreen";
import { ThemeProvider } from "@/components/ui/ThemeContext";
import "@/services/i18n";

export default function LoginLayout() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <LoginScreen />
      </PaperProvider>
    </ThemeProvider>
  );
}

*/