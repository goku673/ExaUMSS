import React from "react";
import { StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Text, View } from "react-native";
import { Link } from "expo-router";
import Header from "../Header";
import Title from "../Title";
import images, { type ImageKey } from "../../../assets/images";

const Faculties = () => {
  const FACULTIES: Array<{
    id: string;
    title: string;
    description: string;
    imageKey: ImageKey;
  }> = [
    {
      id: '1',
      title: "Facultad de Medicina",
      description: "Medical sciences and healthcare programs",
      imageKey: "facMedicine"
    },
    {
      id: '2',
      title: "Facultad de Derecho",
      description: "Legal studies and jurisprudence",
      imageKey: "facLaw"
    },
    {
      id: '3',
      title: "Facultad de Economia", 
      description: "Money money money",
      imageKey: "facEconomy"
    },
    {
      id: '4',
      title: "Facultad de Ciencias y Tecnologia",
      description: "Engineering and technical",
      imageKey: "facTecno"
    }
  ];

  return (
    <ImageBackground 
      source={images.fondStart}
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <Title style={styles.headerTitle}>UMSS Centralized</Title>
        <Text style={styles.sectionTitle}>Select your faculty</Text>
        
        <View style={styles.facultiesContainer}>
          {FACULTIES.map((faculty) => (
            <Link 
              key={faculty.id}
              href={{
                pathname: "/facultyContent",
                params: { 
                  title: faculty.title,
                  imageKey: faculty.imageKey
                }
              }}
              asChild
            >
              <TouchableOpacity style={styles.facultyCard}>
                <ImageBackground
                  source={images[faculty.imageKey]}
                  style={styles.facultyImage}
                  resizeMode="cover"
                  imageStyle={styles.imageStyle}
                >
                  <View style={styles.textOverlay}>
                    <Text style={styles.facultyName}>
                      {faculty.title.replace("Faculty of ", "")}
                    </Text>
                    <Text style={styles.facultyDescription}>{faculty.description}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// Los estilos se mantienen igual que en tu versión
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  facultiesContainer: {
    paddingHorizontal: 16,
  },
  facultyCard: {
    height: 180,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  facultyImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    opacity: 0.9,
  },
  textOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  facultyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  facultyDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

export default Faculties;