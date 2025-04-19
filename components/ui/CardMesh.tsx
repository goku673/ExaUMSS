import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Card from "./Card";

// Definimos el tipo Faculty para mejor manejo de tipos
type Faculty = {
  id: string;
  title: string;
  image: string;
  description?: string;
};

const FACULTIES: Faculty[] = [
  { 
    id: '1',
    title: "Faculty of Medicine", 
    image: "https://via.placeholder.com/50",
    description: "Medical sciences and healthcare programs" 
  },
  { 
    id: '2',
    title: "Faculty of Law", 
    image: "https://via.placeholder.com/50",
    description: "Legal studies and jurisprudence" 
  },
  { 
    id: '3',
    title: "Faculty of Architecture", 
    image: "https://via.placeholder.com/50",
    description: "Design and construction disciplines" 
  },
  { 
    id: '4',
    title: "Faculty of Engineering", 
    image: "https://via.placeholder.com/50",
    description: "Engineering and technology programs" 
  },
  { 
    id: '5',
    title: "Faculty of Dentistry", 
    image: "https://via.placeholder.com/50",
    description: "Dental medicine and oral health" 
  },
  { 
    id: '6',
    title: "Faculty of Agriculture", 
    image: "https://via.placeholder.com/50",
    description: "Agricultural sciences and farming" 
  },
];

const CardMesh: React.FC = () => {
  return (
    <View style={styles.container}>
      {FACULTIES.map((faculty) => (
        <View key={faculty.id} style={styles.cardContainer}>
          <Link 
            href={{
              pathname: "../faculty-details",
              params: { 
                id: faculty.id,
                title: faculty.title,
                image: faculty.image
              }
            }} 
            asChild
          >
            <TouchableOpacity 
              activeOpacity={0.7}
              style={styles.touchable}
            >
              <Card
                title={faculty.title}
                description={faculty.description}
                image={faculty.image}
              />
            </TouchableOpacity>
          </Link>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardContainer: {
    width: "48%", // Mejor control del ancho
    marginBottom: 16,
  },
  touchable: {
    borderRadius: 8, // Para que coincida con el Card
    overflow: 'hidden', // Para mantener los bordes redondeados
  },
});

export default CardMesh;
/*
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Card from "./Card";

const FACULTIES = [
  { title: "Faculty of Medicine", image: "https://via.placeholder.com/50" },
  { title: "Faculty of Law", image: "https://via.placeholder.com/50" },
  { title: "Faculty of Architecture", image: "https://via.placeholder.com/50" },
  { title: "Faculty of Engineering", image: "https://via.placeholder.com/50" },
  { title: "Faculty of Dentistry", image: "https://via.placeholder.com/50" },
  { title: "Faculty of Agriculture", image: "https://via.placeholder.com/50" },
];

const CardMesh: React.FC = () => {
  return (
    <View style={styles.container}>
      {FACULTIES.map((faculty, index) => (
        <Link 
          href="/faculties"  // Cambiado a ruta simple
          key={index} 
          asChild
        >
          <TouchableOpacity>
            <Card
              title={faculty.title}
              description=""
              image={faculty.image}
            />
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});

export default CardMesh;
*/