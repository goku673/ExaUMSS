import React from "react";
import { StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Text, View } from "react-native";
import { Link } from "expo-router";
import Header from "../Header";
import Banner from "../Banner";
import Title from "../Title";
import images, { type ImageKey } from "../../../assets/images";

const HomeScreen: React.FC = () => {
  const OPTIONS: Array<{
    title: string;
    subtitle: string;
    imageKey: ImageKey;
    route?: string;
  }> = [
    {
      title: "Faculty",
      subtitle: "Access faculty resources",
      imageKey: "faculty",
      route: "/faculties"
    },
    {
      title: "Recent",
      subtitle: "View your recent exams",
      imageKey: "recent"
    },
    {
      title: "Guide",
      subtitle: "Read the user guide",
      imageKey: "guide"
    }
  ];

  return (
    <ImageBackground 
      source={images.fondStart} // Usamos la imagen desde images.ts
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <Banner />
        
        <View style={styles.contentContainer}>
          <Title style={styles.title}>UMSS Centralized</Title>
          
          {OPTIONS.map((option, index) => {
            const content = (
              <TouchableOpacity style={styles.optionContainer}>
                <ImageBackground 
                  source={images[option.imageKey]} // Imagen desde images.ts
                  style={styles.optionBackground}
                  resizeMode="cover"
                  imageStyle={styles.optionImageStyle}
                >
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
// '"/faculties" | '
            return option.route ? ( 
              <Link key={index} href="/faculties" asChild>
                {content}
              </Link>
            ) : (
              <View key={index}>{content}</View>
            );
          })}
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
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  optionContainer: {
    height: 120,
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
    opacity: 0.9,
  },
  optionTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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