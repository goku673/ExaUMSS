import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Text from "../Text";
import Button from "../Button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

const EditProfile: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("Freddy Amin");
  const [gender, setGender] = useState("Masculino");
  const [age, setAge] = useState("22");
  const [joinedDate, setJoinedDate] = useState("2025");

  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t, i18n } = useTranslation();

  // Estilos dinámicos
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
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginLeft: 16,
      color: colors.text,
    },
    form: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.label,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 14,
      fontSize: 16,
      marginBottom: 20,
      color: colors.text,
      backgroundColor: colors.inputBackground,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      marginBottom: 12,
    },
    languageButton: {
      paddingVertical: 12,
      backgroundColor: colors.primaryLight,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
    },
  });

  const handleSave = () => {
    console.log("Profile updated:", { name, gender, age, joinedDate });
    router.back();
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(nextLang);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("editProfile.title")}</Text>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        <Text style={styles.label}>{t("editProfile.name")}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={t("editProfile.namePlaceholder")}
          placeholderTextColor={colors.placeholder}
        />

        <Text style={styles.label}>{t("editProfile.gender")}</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          placeholder={t("editProfile.genderPlaceholder")}
          placeholderTextColor={colors.placeholder}
        />

        <Text style={styles.label}>{t("editProfile.age")}</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder={t("editProfile.agePlaceholder")}
          keyboardType="numeric"
          placeholderTextColor={colors.placeholder}
        />

        <Text style={styles.label}>{t("editProfile.joinedDate")}</Text>
        <TextInput
          style={styles.input}
          value={joinedDate}
          onChangeText={setJoinedDate}
          placeholder={t("editProfile.joinedDatePlaceholder")}
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <Button
        label={t("editProfile.saveButton")}
        onPress={handleSave}
        style={styles.saveButton}
        labelStyle={{ color: colors.buttonText }}
      />

      <Button
        label={t("editProfile.toggleLanguage")}
        onPress={toggleLanguage}
        style={styles.languageButton}
        labelStyle={{ color: colors.text }}
      />
    </ScrollView>
  );
};

export default EditProfile;