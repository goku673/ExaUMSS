import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

interface FacultyCardProps {
  title: string;
  image: any;
  onPress: () => void;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.facultyCard} onPress={onPress} activeOpacity={0.9}>
      <Image source={image} style={styles.facultyImage} />
      <View style={styles.facultyTitleContainer}>
        <Text style={styles.facultyTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  facultyCard: {
    width: "45%",
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  facultyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  facultyTitleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  facultyTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default FacultyCard;