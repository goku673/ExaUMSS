import React from "react";
import { StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Text, View } from "react-native";
import { Link } from "expo-router";
import Header from "../Header";
import Title from "../Title";


const FacultiesScreen = () => {
  const FACULTIES = [
    {
      id: '1',
      title: "Faculty of Medicine",
      description: "Medical sciences and healthcare programs",
      image: require("../../../assets/images/facMedicine.png")
    },
    {
      id: '2',
      title: "Faculty of Law",
      description: "Legal studies and jurisprudence",
      image: require("../../../assets/images/facLaw.png")
    },
    {
      id: '3',
      title: "Faculty of Economics", 
      description: "Money money money",
      image: require("../../../assets/images/facEconomy.png")
    },
    {
      id: '4',
      title: "Faculty of Engineering",
      description: "Engineering and technical",
      image: require("../../../assets/images/facTecno.png")
    }
  ];

  return (
    <ImageBackground 
      source={require("../../../assets/images/fondStart.png")}
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
                pathname: "/faculty-details",
                params: { 
                  title: faculty.title,
                  image: faculty.image
                }
              }}
              asChild
            >
              <TouchableOpacity style={styles.facultyCard}>
                <ImageBackground
                  source={faculty.image}
                  style={styles.facultyImage}
                  resizeMode="cover"
                  imageStyle={styles.imageStyle}
                >
                  <View style={styles.textOverlay}>
                    <Text style={styles.facultyName}>{faculty.title}</Text>
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

export default FacultiesScreen;