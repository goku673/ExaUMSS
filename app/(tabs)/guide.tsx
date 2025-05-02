import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";
import Text from "@/components/ui/Text";

export default function GuideScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 16,
      textAlign: "center",
    },
    stepContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
      backgroundColor: colors.cardBackground,
      padding: 16,
      borderRadius: 8,
    },
    stepNumber: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primary,
      marginRight: 12,
      minWidth: 24,
    },
    stepText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
      lineHeight: 24,
    },
    videoContainer: {
      marginVertical: 16,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: colors.cardBackground,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    footer: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 14,
      textAlign: "center",
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 24,
    },
  });

  const guideSteps = [
    t('guide.description1'),
    t('guide.description2'),
    t('guide.description3'),
    t('guide.description4'),
    t('guide.description5'),
  ];

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.title}>{t('guide.title')}</Text>
        <Text style={styles.subtitle}>{t('guide.description0')}</Text>
      </View>

      <View style={styles.section}>
        {guideSteps.map((step, index) => (
          <View key={`step-${index}`} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{index + 1}.</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>{t('guide.helpVideo')}</Text>
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={200}
            play={false}
            videoId="HJS39OsYEN8"
          />
        </View>
      </View>

      <Text style={styles.footer}>
        {t('guide.description6')}
      </Text>
    </ScrollView>
  );
}