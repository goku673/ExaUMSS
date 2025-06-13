"use client"
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"
import Text from "@/components/ui/Text"
import { Ionicons } from "@expo/vector-icons"

export default function GuideScreen() {
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 32,
    },
    headerContainer: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      backgroundColor: colors.cardBackground,
      marginHorizontal: 20,
      marginTop: 40,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 12,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
      lineHeight: 24,
    },
    stepsSection: {
      marginHorizontal: 20,
      marginTop: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    stepCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    stepHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    stepNumber: {
      backgroundColor: colors.primary,
      borderRadius: 20,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    stepNumberText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#ffffff",
    },
    stepContent: {
      flex: 1,
    },
    stepText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      fontWeight: "500",
    },
    videoSection: {
      marginHorizontal: 20,
      marginTop: 32,
    },
    videoCard: {
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
    videoTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 16,
      textAlign: "center",
      flexDirection: "row",
      alignItems: "center",
    },
    videoContainer: {
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: "#000",
    },
    footerContainer: {
      marginHorizontal: 20,
      marginTop: 24,
      backgroundColor: colors.primary + "15",
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.primary + "30",
    },
    footerText: {
      fontSize: 14,
      color: colors.primary,
      textAlign: "center",
      lineHeight: 22,
      fontWeight: "500",
    },
    iconContainer: {
      backgroundColor: colors.primary + "20",
      borderRadius: 12,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
  })

  const guideSteps = [
    t("guide.description1"),
    t("guide.description2"),
    t("guide.description3"),
    t("guide.description4"),
    t("guide.description5"),
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{t("guide.title")}</Text>
          <Text style={styles.subtitle}>{t("guide.description0")}</Text>
        </View>

        {/* Steps Section */}
        <View style={styles.stepsSection}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <View style={styles.iconContainer}>
              <Ionicons name="list-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>{t("guide.title2")}</Text>
          </View>

          {guideSteps.map((step, index) => (
            <View key={`step-${index}`} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Video Section */}
        <View style={styles.videoSection}>
          <View style={styles.videoCard}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Ionicons name="play-circle" size={24} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.videoTitle}>{t("guide.Help video")}</Text>
            </View>
            <View style={styles.videoContainer}>
              <YoutubePlayer height={220} play={false} videoId="GP7nj2UWLMU" />
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{t("guide.description6")}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
