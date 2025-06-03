"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { useRouter } from "expo-router"
import Text from "@/components/ui/Text"
import SelectorModal from "@/components/SelectorModal"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"
import { Ionicons } from "@expo/vector-icons"

type Language = "Español" | "Inglés"
type AppTheme = "Claro" | "Oscuro"

const convertTheme = (theme: AppTheme): "light" | "dark" => {
  return theme === "Oscuro" ? "dark" : "light"
}

type SettingItem = {
  title: string;
  subtitle: string;
  icon: string;
  onPress: () => void;
  isDanger: boolean;
  value?: string;
};

const SettingsScreen: React.FC = () => {
  const router = useRouter()
  const [languageModalVisible, setLanguageModalVisible] = useState(false)
  const [themeModalVisible, setThemeModalVisible] = useState(false)
  const { theme, setTheme } = useTheme()
  const colors = getThemeColors(theme)
  const { t, i18n } = useTranslation()

  const currentLanguage = i18n.language === "es" ? "Español" : "Inglés"

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: colors.background,
        },
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 26,
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        backButton: {
          backgroundColor: colors.cardBackground,
          borderRadius: 24,
          width: 48,
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        headerTitle: {
          fontSize: 22,
          fontWeight: "700",
          color: colors.text,
        },
        scrollContent: {
          paddingBottom: 32,
        },
        welcomeCard: {
          backgroundColor: colors.cardBackground,
          borderRadius: 20,
          padding: 24,
          marginHorizontal: 20,
          marginTop: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 6,
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: "center",
        },
        welcomeIcon: {
          backgroundColor: colors.primary + "20",
          borderRadius: 30,
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16,
        },
        welcomeTitle: {
          fontSize: 24,
          fontWeight: "700",
          color: colors.text,
          textAlign: "center",
          marginBottom: 8,
        },
        welcomeSubtitle: {
          fontSize: 16,
          color: colors.secondaryText,
          textAlign: "center",
          lineHeight: 24,
        },
        section: {
          marginHorizontal: 20,
          marginTop: 24,
        },
        sectionCard: {
          backgroundColor: colors.cardBackground,
          borderRadius: 20,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 6,
          borderWidth: 1,
          borderColor: colors.border,
        },
        sectionHeader: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        },
        sectionIconContainer: {
          backgroundColor: colors.primary + "20",
          borderRadius: 12,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: "700",
          color: colors.text,
        },
        settingItem: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.background,
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        },
        settingItemLast: {
          marginBottom: 0,
        },
        settingIcon: {
          backgroundColor: colors.primary + "15",
          borderRadius: 12,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
        },
        settingContent: {
          flex: 1,
        },
        settingTitle: {
          fontSize: 16,
          fontWeight: "600",
          color: colors.text,
          marginBottom: 2,
        },
        settingSubtitle: {
          fontSize: 14,
          color: colors.secondaryText,
        },
        settingValue: {
          fontSize: 14,
          fontWeight: "600",
          color: colors.primary,
          marginRight: 8,
        },
        settingArrow: {
          marginLeft: 8,
        },
        dangerItem: {
          backgroundColor: "#ef444415",
          borderColor: "#ef444430",
        },
        dangerIcon: {
          backgroundColor: "#ef444420",
        },
        dangerTitle: {
          color: "#ef4444",
        },
      }),
    [colors],
  )

  const handleLanguageChange = (selectedLanguage: string) => {
    if (selectedLanguage === t("setting.spanish") || selectedLanguage === t("setting.english")) {
      const newLocale = selectedLanguage === t("setting.spanish") ? "es" : "en"
      i18n.changeLanguage(newLocale)
    }
    setLanguageModalVisible(false)
  }

  const handleThemeChange = (selectedTheme: string) => {
    if (selectedTheme === t("setting.light") || selectedTheme === t("setting.dark")) {
      setTheme(selectedTheme as AppTheme)
    }
    setThemeModalVisible(false)
  }

  const settingSections: {
      title: string;
      icon: string;
      items: SettingItem[];
    }[] = [
    {
      title: t("setting.account"),
      icon: "person-outline",
      items: [
        {
          title: t("setting.changePassword"),
          subtitle: "Actualiza tu contraseña de acceso",
          icon: "lock-closed-outline",
          onPress: () => router.push("/change-password"),
          isDanger: false,
        },
      ],
    },
    {
      title: t("setting.personalization"),
      icon: "color-palette-outline",
      items: [
        {
          title: t("setting.language"),
          subtitle: "Idioma de la aplicación",
          icon: "language-outline",
          value: currentLanguage,
          onPress: () => setLanguageModalVisible(true),
          isDanger: false,
        },
        {
          title: t("setting.theme"),
          subtitle: "Apariencia de la aplicación",
          icon: "contrast-outline",
          value: theme,
          onPress: () => setThemeModalVisible(true),
          isDanger: false,
        },
      ],
    },
    {
      title: t("setting.notifications"),
      icon: "notifications-outline",
      items: [
        {
          title: t("setting.manageNotifications"),
          subtitle: "Configura tus notificaciones",
          icon: "settings-outline",
          onPress: () => router.push("/notifications"),
          isDanger: false,
        },
      ],
    },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("setting.settings")}</Text>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeIcon}>
              <Ionicons name="settings" size={30} color={colors.primary} />
            </View>
            <Text style={styles.welcomeTitle}>{t("setting.configuration")}</Text>
            <Text style={styles.welcomeSubtitle}>{t("setting.configurationText")}</Text>
          </View>
          {settingSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIconContainer}>
                    <Ionicons name={section.icon as any} size={20} color={colors.primary} />
                  </View>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>

                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      item.isDanger && styles.dangerItem,
                      itemIndex === section.items.length - 1 && styles.settingItemLast,
                    ]}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.settingIcon, item.isDanger && styles.dangerIcon]}>
                      <Ionicons name={item.icon as any} size={20} color={item.isDanger ? "#ef4444" : colors.primary} />
                    </View>

                    <View style={styles.settingContent}>
                      <Text style={[styles.settingTitle, ...(item.isDanger ? [styles.dangerTitle] : [])]}>{item.title}</Text>
                      <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                    </View>

                    {item.value && <Text style={styles.settingValue}>{item.value}</Text>}

                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.secondaryText}
                      style={styles.settingArrow}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        
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
    </SafeAreaView>
  )
}

export default SettingsScreen
