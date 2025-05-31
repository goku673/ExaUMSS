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

  // Asegúrate de que todas las traducciones devuelvan componentes válidos
  const tabTitles = {
    inicio: t('layout.inicio') || 'Inicio',
    perfil: t('layout.perfil') || 'Perfil',
    guia: t('layout.guia') || 'Guía',
    practicas: t('layout.practicas') || 'Prácticas',
    ajustes: t('layout.ajustes') || 'Ajustes'
  };

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
          title: tabTitles.inicio,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          title: tabTitles.perfil,
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
          title: tabTitles.guia,
        }}
      />
      <Tabs.Screen
        name="practices"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="archive" color={color} size={size} />
          ),
          title: tabTitles.practicas,
        }}
      />
      <Tabs.Screen
        name="settings" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          title: tabTitles.ajustes,
        }}
      />
    </Tabs>
  );
}