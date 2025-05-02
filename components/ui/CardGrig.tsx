import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "./Modal";
import FacultyCard from "./FacultyCard";
import Card from "./Card";
import { images } from "@/assets/images";
import Text from "./Text";
import { useRouter } from "expo-router";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

const CardGrid: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    facultyGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
      textAlign: "left",
    },
    modalContent: {
      padding: 16,
    }
  });

  const handleCardPress = (cardKey: string) => {
    switch(cardKey) {
      case 'facultad':
        setVisible(true);
        break;
      case 'reciente':
        router.push("/(tabs)/guide");
        break;
      case 'guia':
        router.push("/(tabs)/guide");
        break;
      default:
        console.log(`Card clicked: ${cardKey}`);
    }
  };

  const handleFacultySelect = (faculty: string) => {
    router.push(`/(faculty)/${faculty.toLowerCase()}`);
    setVisible(false);
  };

  const mainCards = [
    {
      key: 'facultad',
      title: t('cardGrig.facultad'),
      description: t('cardGrig.facultadContext'),
      image: images.faculty
    },
    {
      key: 'reciente',
      title: t('cardGrig.reciente'),
      description: t('cardGrig.recienteContext'),
      image: images.recent
    },
    {
      key: 'guia',
      title: t('cardGrig.guia'),
      description: t('cardGrig.guiaContext'),
      image: images.guide
    }
  ];

  const facultyCards = [
    {
      key: 'medicina',
      title: t('cardGrig.facMed'),
      image: images.medicina
    },
    {
      key: 'derecho',
      title: t('cardGrig.facDer'),
      image: images.law
    },
    {
      key: 'arquitectura',
      title: t('cardGrig.facArq'),
      image: images.faculty
    }
  ];

  return (
    <>
      <View style={styles.container}>
        {mainCards.map((card) => (
          <Card
            key={card.key}
            title={card.title}
            description={card.description}
            image={card.image}
            onPress={() => handleCardPress(card.key)}
          />
        ))}
      </View>

      <Modal 
        visible={visible} 
        onDismiss={() => setVisible(false)} 
        title={t("cardGrig.title")}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>{t('cardGrig.title')}</Text>
          <View style={styles.facultyGrid}>
            {facultyCards.map((faculty) => (
              <FacultyCard
                key={faculty.key}
                title={faculty.title}
                image={faculty.image}
                onPress={() => handleFacultySelect(faculty.key)}
              />
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CardGrid;
