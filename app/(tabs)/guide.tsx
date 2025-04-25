import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
// reafactorizar todo 
export default function GuideScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Guía de Usuario</Text>
      <Text style={styles.subtitle}>Sigue estos pasos para comenzar:</Text>

      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>1.</Text>
        <Text style={styles.stepText}>
          Abre la aplicación e inicia sesión con tus credenciales.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>2.</Text>
        <Text style={styles.stepText}>
          Navega a través de las pestañas para explorar diferentes secciones como Facultades, Perfil y Configuración.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>3.</Text>
        <Text style={styles.stepText}>
          Usa la pestaña de Facultades para acceder a recursos relacionados con tu facultad.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>4.</Text>
        <Text style={styles.stepText}>
          Actualiza la información de tu perfil en la pestaña Perfil.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>5.</Text>
        <Text style={styles.stepText}>
          Ajusta tus preferencias en la pestaña Configuración.
        </Text>
      </View>

      <Text style={styles.subtitle}>Video de ayuda:</Text>
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={200}
          play={false}
          videoId="HJS39OsYEN8" 
        />
      </View>

      <Text style={styles.footer}>
        Para más información, contacta con soporte.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200EE",
    marginRight: 8,
  },
  stepText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  videoContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  footer: {
    fontSize: 14,
    color: "#666",
    marginTop: 24,
    textAlign: "center",
  },
});