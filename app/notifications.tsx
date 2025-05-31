import React, { useMemo } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "@/components/ui/Text";
import { router } from "expo-router";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

// Notification data with translations
const getNotifications = (t: (key: string) => string) => [
  { 
    id: "1", 
    title: t("notification.newExam"), 
    description: t("notification.newExamDesc") 
  },
  { 
    id: "2", 
    title: t("notification.reminder"), 
    description: t("notification.profileReminder") 
  },
  { 
    id: "3", 
    title: t("notification.update"), 
    description: t("notification.systemUpdate") 
  },
];

const NotificationsScreen: React.FC = () => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();

  const notifications = useMemo(() => getNotifications(t), [t]);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingTop: 50,
      backgroundColor: colors.cardBackground,
    },
    backButton: {
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    listContainer: {
      padding: 16,
    },
    notificationItem: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: colors.cardBackground,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    notificationDescription: {
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    emptyText: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
    },
  }), [colors]);

  const renderNotification = ({ item }: { item: typeof notifications[0] }) => (
    <TouchableOpacity 
      style={styles.notificationItem}
      onPress={() => console.log("Notification pressed", item.id)}
    >
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off" size={40} color={colors.secondaryText} />
      <Text style={styles.emptyText}>{t("notification.empty")}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('notification.title')}</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationsScreen;