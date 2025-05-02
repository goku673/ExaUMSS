import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "./Modal";
import FacultyCard from "./FacultyCard";
import Card from "./Card";
import { images } from "@/assets/images";
import Text from "./Text";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

const CardGrid: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  // Estilos dinámicos que dependen del tema
  const dynamicStyles = {
    title: {
      fontSize: 20,
      fontWeight: "bold" as const,
      textAlign: "left" as const,
      marginBottom: 16,
      color: colors.text,
    },
  };

  const handleCardPress = (title: string) => {
    if (title === t("cardGrig.facultad")) {
      setVisible(true);
    } else if (title === t("cardGrig.reciente")) {
      router.push("/(tabs)/guide");
    } else {
      console.log(`Card clicked: ${title}`);
    }
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleFacultySelect = (faculty: string) => {
    const formattedFaculty = faculty.toLowerCase();
    router.push(`/(faculty)/${formattedFaculty}`);
  };

  return (
    <>
      <View style={styles.container}>
        <Card
          title={t("cardGrig.facultad")}
          description={t("cardGrig.facultadContext")}
          image={images.faculty}
          onPress={() => handleCardPress(t("cardGrig.facultad"))}
          titleStyle={{ color: colors.cardText }}
          descriptionStyle={{ color: colors.cardText }}
          containerStyle={{ backgroundColor: colors.cardBackground }}
        />
        <Card
          title={t("cardGrig.reciente")}
          description={t("cardGrig.recienteContext")}
          image={images.recent}
          onPress={() => handleCardPress(t("cardGrig.reciente"))}
          titleStyle={{ color: colors.cardText }}
          descriptionStyle={{ color: colors.cardText }}
          containerStyle={{ backgroundColor: colors.cardBackground }}
        />
        <Card
          title={t("cardGrig.guia")}
          description={t("cardGrig.guiaContext")}
          image={images.guide}
          onPress={() => handleCardPress(t("cardGrig.guia"))}
          titleStyle={{ color: colors.cardText }}
          descriptionStyle={{ color: colors.cardText }}
          containerStyle={{ backgroundColor: colors.cardBackground }}
        />
      </View>
      <Modal visible={visible} onDismiss={hideModal}>
        <Text style={dynamicStyles.title}>{t("cardGrig.title")}</Text>
        <View style={styles.facultyGrid}>
          <FacultyCard
            title={t("cardGrig.facMed")}
            image={images.medicina}
            titleStyle={{ color: colors.cardText }}
            onPress={() => {
              handleFacultySelect("medicina");
              hideModal();
            }}
          />
          <FacultyCard
            title={t("cardGrig.facDer")}
            image={images.law}
            titleStyle={{ color: colors.cardText }}
            onPress={() => {
              handleFacultySelect("derecho");
              hideModal();
            }}
          />
          <FacultyCard
            title={t("cardGrig.facArq")}
            image={images.faculty}
            titleStyle={{ color: colors.cardText }}
            onPress={() => {
              handleFacultySelect("arquitectura");
              hideModal();
            }}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  facultyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
});

export default CardGrid;