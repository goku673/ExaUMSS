
import React from "react";
import { StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import Header from "../Header";
import Banner from "../Banner";
import Title from "../Title";
import CardGrid from "../CardGrig";

const HomeScreen: React.FC = () => {
  return (
    <ImageBackground 
      source={require("../../../assets/images/fondStart.png")}
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <Banner />
        
        <View style={styles.contentContainer}>
          <Title style={styles.title}>UMSS Centralized</Title>
          
          {/* Opción de Facultades con imagen de fondo */}
          <Link href="/faculties" asChild>
            <TouchableOpacity style={styles.optionContainer}>
              <ImageBackground 
                source={require("../../../assets/images/faculty.png")}
                style={styles.optionBackground}
                resizeMode="cover"
                imageStyle={styles.optionImageStyle}
              >
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Faculty</Text>
                  <Text style={styles.optionSubtitle}>Access faculty resources</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Link>

          {/* Opción de Recent con imagen de fondo */}
          <TouchableOpacity style={styles.optionContainer}>
            <ImageBackground 
              source={require("../../../assets/images/recent.png")}
              style={styles.optionBackground}
              resizeMode="cover"
              imageStyle={styles.optionImageStyle}
            >
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Recent</Text>
                <Text style={styles.optionSubtitle}>View your recent exams</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* Opción de Guide con imagen de fondo */}
          <TouchableOpacity style={styles.optionContainer}>
            <ImageBackground 
              source={require("../../../assets/images/guide.png")}
              style={styles.optionBackground}
              resizeMode="cover"
              imageStyle={styles.optionImageStyle}
            >
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Guide</Text>
                <Text style={styles.optionSubtitle}>Read the user guide</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    backgroundColor: "transparent",
    marginVertical: 20,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Texto blanco para contrastar con el fondo
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  optionContainer: {
    height: 120, // Altura fija para cada opción
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  optionBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  optionImageStyle: {
    opacity: 0.9, // Ligera transparencia para la imagen de fondo
  },
  optionTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para mejor legibilidad
    padding: 16,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

export default HomeScreen;