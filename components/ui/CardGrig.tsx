import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "./Modal";
import FacultyCard from "./FacultyCard";
import Card from "./Card";
import { images } from "@/assets/images";
import Text from "./Text";
import { useRouter } from "expo-router";
// refactorizar

const CardGrid: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleCardPress = (title: string) => {
    if (title === "Faculty") {
      setVisible(true);
    }else if (title === "Guide") {
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
          title="Facultad"
          description="Acceder a los recursos de la facultad"
          image={images.faculty}
          onPress={() => handleCardPress("Faculty")}
        />
        <Card
          title="Reciente"
          description="Ver tus exámenes recientes"
          image={images.recent}
          onPress={() => handleCardPress("Recent")}
        />
        <Card
          title="Quia"
          description="Lea la guía del usuario"
          image={images.guide}
          onPress={() => handleCardPress("Guide")}
        />
      </View>
      <Modal visible={visible} onDismiss={hideModal} title="Select your faculty">
        <Text style={styles.title}>Selecciona tu facultad</Text>
        <View style={styles.facultyGrid}>
          <FacultyCard
            title="Facultad de Medicina"
            image={images.medicina}
            onPress={() => {
              handleFacultySelect("medicina");
              hideModal();
            }}
          />
          <FacultyCard
            title="Facultad de Derecho"
            image={images.law}
            onPress={() => {
              handleFacultySelect("derecho");
              hideModal();
            }}
          />
          <FacultyCard
            title="Facultad de Arquitectura"
            image={images.faculty}
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 16,
  },
});

export default CardGrid;