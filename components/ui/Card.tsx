import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

interface CardProps {
  title: string;
  description: string;
  image: any;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, image, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "flex-start",
    marginBottom: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  title: {
    fontSize: 18, 
    fontWeight: "bold", 
    textAlign: "left",
    color: "#333", 
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    textAlign: "left",
    color: "#666",
  },
});

export default Card;