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
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

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
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
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
    backgroundColor: `{colors.background}`,
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