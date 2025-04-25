import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Text from "../Text";
import Button from "../Button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const EditProfile: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("Freddy Amin");
  const [gender, setGender] = useState("Masculino");
  const [age, setAge] = useState("22");
  const [joinedDate, setJoinedDate] = useState("2025");

  const handleSave = () => {
    console.log("Profile updated:", { name, gender, age, joinedDate });
    router.back(); // Regresa a la pantalla anterior
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </View>

      {/* Formulario de edición */}
      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ingrese su nombre"
        />

        <Text style={styles.label}>Género</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          placeholder="Ingrese su género"
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Ingrese su edad"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Fecha de Unión</Text>
        <TextInput
          style={styles.input}
          value={joinedDate}
          onChangeText={setJoinedDate}
          placeholder="Ingrese la fecha de unión"
        />
      </View>

      {/* Botón de guardar */}
      <Button
        label="Guardar Cambios"
        onPress={handleSave}
        style={styles.saveButton}
        // Removed textStyle prop as it is not supported by the Button component
      />
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
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: "#000",
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfile;