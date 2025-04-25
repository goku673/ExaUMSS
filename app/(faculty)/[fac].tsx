import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
import Text from "@/components/ui/Text";
import FacultyMaterials from "@/components/ui/FacultyMaterials";
import { useLocalSearchParams } from "expo-router";

// refactorizar  todo
const FacultyScreen: React.FC = () => {
  const { fac } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <IconButton
        icon="arrow-left"
        size={24}
        onPress={() => router.push("..")} 
        style={styles.backButton}
      />
      <Text style={styles.header}>Exámenes de ingreso para {fac || "desconocida"}</Text>
      <FacultyMaterials />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
    color: "#000",
    marginTop: 48, // Espacio para el botón de volver
  },
});

export default FacultyScreen;