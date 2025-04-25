import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Text from "../Text";
import Button from "../Button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/assets/images";

const AdminProfile: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={images.profileFake}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Freddy Amin, Masculino, edad 22</Text>
        <Text style={styles.profileJoined}>Unido en 2025</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label="Editar Perfil"
          onPress={() => router.push("/(auth)/editprofile")}
          style={styles.editButton}
        />
        <Button
          label="Gestionar Descargas"
          onPress={() => console.log("Gestionar Descargas")}
          style={[styles.manageButton, styles.manageButtonText]}
        />
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressText}>Progreso</Text>
        <Text style={styles.progressPercentage}>50%</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressComplete} />
        </View>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Historial de Descargas</Text>
        <View style={styles.historyItem}>
          <Ionicons name="document-text-outline" size={24} color="#000" />
          <View style={styles.historyTextContainer}>
            <Text style={styles.historyItemTitle}>Anatomía - 2020</Text>
            <Text style={styles.historyItemDate}>8 de enero, 2022</Text>
          </View>
        </View>
        <View style={styles.historyItem}>
          <Ionicons name="document-text-outline" size={24} color="#000" />
          <View style={styles.historyTextContainer}>
            <Text style={styles.historyItemTitle}>Biología - 2020</Text>
            <Text style={styles.historyItemDate}>9 de diciembre, 2021</Text>
          </View>
        </View>
        <View style={styles.historyItem}>
          <Ionicons name="document-text-outline" size={24} color="#000" />
          <View style={styles.historyTextContainer}>
            <Text style={styles.historyItemTitle}>Química - 2020</Text>
            <Text style={styles.historyItemDate}>10 de noviembre, 2021</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    color: "#000",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  profileJoined: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  editButton: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  manageButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  manageButtonText: {
    color: "#fff",
  },
  progressSection: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressComplete: {
    width: "50%",
    height: "100%",
    backgroundColor: "#007BFF",
  },
  historySection: {
    marginBottom: 24,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  historyTextContainer: {
    marginLeft: 16,
  },
  historyItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  historyItemDate: {
    fontSize: 14,
    color: "#666",
  },
});

export default AdminProfile;