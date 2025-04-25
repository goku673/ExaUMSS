import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SettingItem from "../SettingItem";
import Title from "../Title";
import Text from "../Text";
import { useRouter } from "expo-router";
import SelectorModal from "@/components/SelectorModal";

const SettingsScreen: React.FC = () => {
  const router = useRouter();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [language, setLanguage] = useState("Español");
  const [theme, setTheme] = useState("Claro");

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Configuración</Title>

      {/* Sección de Cuenta */}
      <Text style={styles.sectionTitle}>Cuenta</Text>
      <SettingItem
        title="Cambiar contraseña"
        onPress={() => router.push("/change-password")}
      />

      {/* Sección de Notificaciones */}
      <Text style={styles.sectionTitle}>Notificaciones</Text>
      <SettingItem
        title="Gestionar notificaciones"
        onPress={() => router.push("/notifications")}
      />

      {/* Sección de Idioma */}
      <Text style={styles.sectionTitle}>Idioma</Text>
      <SettingItem
        title={language}
        onPress={() => setLanguageModalVisible(true)}
      />

      {/* Sección de Tema */}
      <Text style={styles.sectionTitle}>Tema</Text>
      <SettingItem
        title={theme}
        onPress={() => setThemeModalVisible(true)}
      />

      {/* Modales */}
      <SelectorModal
        visible={languageModalVisible}
        title="Seleccionar Idioma"
        options={["Español", "Inglés"]}
        onSelect={(selectedLanguage) => {
          setLanguage(selectedLanguage);
          setLanguageModalVisible(false);
        }}
        onClose={() => setLanguageModalVisible(false)}
      />
      <SelectorModal
        visible={themeModalVisible}
        title="Seleccionar Tema"
        options={["Claro", "Oscuro"]}
        onSelect={(selectedTheme) => {
          setTheme(selectedTheme);
          setThemeModalVisible(false);
        }}
        onClose={() => setThemeModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginTop: 24,
    marginBottom: 12, 
    textTransform: "uppercase",
  },
});

export default SettingsScreen;