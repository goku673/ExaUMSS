import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener instalada esta librería
import Text from "@/components/ui/Text";
import { router } from "expo-router";

const notificaciones = [
  { id: "1", titulo: "Nuevo examen disponible", descripcion: "Consulta el último examen en tu facultad." },
  { id: "2", titulo: "Recordatorio", descripcion: "No olvides completar tu perfil." },
  { id: "3", titulo: "Actualización del sistema", descripcion: "El sistema se actualizará esta noche a las 12:00 AM." },
];

const PantallaNotificaciones: React.FC = () => {
  const renderizarNotificacion = ({ item }: { item: { id: string; titulo: string; descripcion: string } }) => (
    <View style={styles.itemNotificacion}>
      <Text style={styles.tituloNotificacion}>{item.titulo}</Text>
      <Text style={styles.descripcionNotificacion}>{item.descripcion}</Text>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <TouchableOpacity style={styles.botonAtras} onPress={() => router.push("/(tabs)/settings")}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.tituloEncabezado}>Notificaciones</Text>
      </View>
      <FlatList
        data={notificaciones}
        keyExtractor={(item) => item.id}
        renderItem={renderizarNotificacion}
        contentContainerStyle={styles.listaContenedor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  botonAtras: {
    marginRight: 16,
  },
  tituloEncabezado: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  listaContenedor: {
    padding: 16,
  },
  itemNotificacion: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tituloNotificacion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  descripcionNotificacion: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default PantallaNotificaciones;