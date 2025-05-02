import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import SettingItem from "../SettingItem";
import Title from "../Title";
import Text from "../Text";
import SelectorModal from "@/components/SelectorModal";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

type Language = "Español" | "Inglés";
type AppTheme = "Claro" | "Oscuro";

const convertTheme = (theme: AppTheme): 'light' | 'dark' => {
  return theme === "Oscuro" ? 'dark' : 'light';
};

const SettingsScreen: React.FC = () => {
  const router = useRouter();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const colors = getThemeColors(theme);
  const { t, i18n } = useTranslation();
  
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingTop: 40,
          flex: 1,
          backgroundColor: colors.background,
          padding: 16,
        },
        title: {
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 24,
          color: colors.text,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: "600",
          color: colors.textSecondary,
          marginTop: 24,
          marginBottom: 12,
          textTransform: "uppercase",
        },
      }),
    [colors]
  );

  // Manejar cambio de idioma
  const handleLanguageChange = (selectedLanguage: string) => {
    if (selectedLanguage === "Español" || selectedLanguage === "Inglés") {
      i18n.changeLanguage(selectedLanguage === "Español" ? "es" : "en");
    }
    setLanguageModalVisible(false);
  };

  // Manejar cambio de tema
  const handleThemeChange = (selectedTheme: string) => {
    if (selectedTheme === "Claro" || selectedTheme === "Oscuro") {
      setTheme(selectedTheme as AppTheme);
    }
    setThemeModalVisible(false);
  };

  return (
    <View style={dynamicStyles.container}>
      <Title style={dynamicStyles.title}>{t("setting.settings")}</Title>

      {/* Sección de Cuenta */}
      <Text style={dynamicStyles.sectionTitle}>{t("setting.account")}</Text>
      <SettingItem
        title={t("setting.changePassword")}
        onPress={() => router.push("/change-password")}
      />

      {/* Sección de Notificaciones */}
      <Text style={dynamicStyles.sectionTitle}>{t("setting.notifications")}</Text>
      <SettingItem
        title={t("setting.manageNotifications")}
        onPress={() => router.push("/notifications")}
      />

      {/* Sección de Idioma */}
      <Text style={dynamicStyles.sectionTitle}>{t("setting.language")}</Text>
      <SettingItem 
        title={t("setting.language")}
        onPress={() => setLanguageModalVisible(true)}
      />

      {/* Sección de Tema */}
      <Text style={dynamicStyles.sectionTitle}>{t("setting.theme")}</Text>
      <SettingItem
        title={t(`setting.${theme.toLowerCase()}`)}
        onPress={() => setThemeModalVisible(true)}
      />

      {/* Modales */}
      <SelectorModal
        visible={languageModalVisible}
        title={t("setting.selectLanguage")}
        options={[t("setting.spanish"), t("setting.english")]}
        onSelect={handleLanguageChange}
        onClose={() => setLanguageModalVisible(false)}
      />
      
      <SelectorModal
        visible={themeModalVisible}
        title={t("setting.selectTheme")}
        options={[t("setting.light"), t("setting.dark")]}
        onSelect={handleThemeChange}
        onClose={() => setThemeModalVisible(false)}
      />
    </View>
  );
};

export default SettingsScreen;