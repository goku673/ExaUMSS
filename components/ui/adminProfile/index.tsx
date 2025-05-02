
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Text from "../Text";
import Button from "../Button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/assets/images";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

const AdminProfile: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
      paddingTop: 40,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 16,
      color: colors.text,
    },
    profileSection: {
      alignItems: "center",
      marginBottom: 24,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    profileName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 1,
      textAlign: "center",
    },
    profileJoined: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      gap: 6,
    },
    editButton: {
      flex: 1,
      backgroundColor: colors.buttonBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    manageButton: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    progressSection: {
      marginBottom: 10,
    },
    progressText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    progressPercentage: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 12,
    },
    progressBar: {
      height: 10,
      backgroundColor: colors.inputBackground,
      borderRadius: 5,
      overflow: "hidden",
    },
    progressComplete: {
      width: "50%",
      height: "100%",
      backgroundColor: colors.primary,
    },
    historySection: {
      marginBottom: 40,
    },
    historyTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },
    historyItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 1,
      padding: 12,
      backgroundColor: colors.cardBackground,
      borderRadius: 8,
    },
    historyTextContainer: {
      flex: 1,
      marginLeft: 16,
    },
    historyItemTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    historyItemDate: {
      fontSize: 14,
      color: colors.secondaryText,
    },
  });

  const userInfo = {
    name: "Freddy Amin",
    gender: t("profile.male"),
    age: "22",
    joinYear: "2025",
    progress: "50",
    downloads: [
      { subject: t("profile.anatomy"), date: t("profile.january") + " 8, 2022" },
      { subject: t("profile.biology"), date: t("profile.december") + " 9, 2021" },
      { subject: t("profile.chemistry"), date: t("profile.november") + " 10, 2021" },
    ]
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("profile.title")}</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={images.profileFake}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>
          {t("profile.userInfo", {
            name: userInfo.name,
            gender: userInfo.gender,
            age: userInfo.age
          })}
        </Text>
        <Text style={styles.profileJoined}>
          {t("profile.joined", { year: userInfo.joinYear })}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          label={t("profile.edit")}
          onPress={() => router.push("/(auth)/editprofile")}
          style={styles.editButton}
          labelStyle={{ color: colors.text }}
        />
        <Button
          label={t("profile.manageDownloads")}
          onPress={() => console.log("Manage Downloads")}
          style={styles.manageButton}
          labelStyle={{ color: colors.text }}
        />
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressText}>{t("profile.progress")}</Text>
        <Text style={styles.progressPercentage}>{userInfo.progress}%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressComplete]} />
        </View>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>{t("profile.downloadHistory")}</Text>
        {userInfo.downloads.map((item, index) => (
          <TouchableOpacity key={index} style={styles.historyItem}>
            <Ionicons name="document-text-outline" size={24} color={colors.icon} />
            <View style={styles.historyTextContainer}>
              <Text style={styles.historyItemTitle}>{item.subject} - 2020</Text>
              <Text style={styles.historyItemDate}>{item.date}</Text>
            </View>
            <Ionicons name="download" size={20} color={colors.icon} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default AdminProfile;