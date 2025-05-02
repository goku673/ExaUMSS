import React from "react";
import { 
  View, 
  StyleSheet, 
  Image, 
  Text, 
  TouchableOpacity, 
  ImageSourcePropType,
  TextStyle,
  ViewStyle
} from "react-native";

interface FacultyCardProps {
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ 
  title, 
  image, 
  onPress,
  titleStyle,
  containerStyle
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, containerStyle]} 
      onPress={onPress}
    >
      <Image source={image} style={styles.image} />
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 18,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});

export default FacultyCard;