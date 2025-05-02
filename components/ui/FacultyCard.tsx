import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";
import Text from "@/components/ui/Text";

interface FacultyCardProps {
  title: string;
  image: any;
  onPress: () => void;
  translate?: boolean;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ 
  title, 
  image, 
  onPress, 
  translate = true 
}) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    facultyCard: {
      width: "48%",
      aspectRatio: 1.2,
      borderRadius: 12,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === "Oscuro" ? 0.2 : 0.1,
      shadowRadius: 4,
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
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    facultyTitle: {
      fontWeight: "600",
      fontSize: 16,
      color: colors.buttonText,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity
      style={styles.facultyCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={image} style={styles.facultyImage} />
      <View style={styles.facultyTitleContainer}>
        <Text style={styles.facultyTitle}>
          {translate ? t(title) : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FacultyCard;