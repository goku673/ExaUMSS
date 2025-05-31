"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native"
import Text from "@/components/ui/Text"
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { createFaculty, getAllFaculties } from "@/firebase/firebaseServices"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"

const storage = getStorage()

interface Facultad {
  id: string
  nombre: string
  descripcion: string
  imagen: string
}

const RegisterFaculty: React.FC = () => {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [imagen, setImagen] = useState("")
  const [uploading, setUploading] = useState(false)
  const [facultades, setFacultades] = useState<Facultad[]>([])
  const [loading, setLoading] = useState(true)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const router = useRouter()
  const { theme } = useTheme()
  const colors = getThemeColors(theme)

  useEffect(() => {
    fetchFacultades()
  }, [])

  const fetchFacultades = async () => {
    try {
      const data = await getAllFaculties()
      setFacultades(data)
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las facultades")
    } finally {
      setLoading(false)
    }
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permisos", "Se necesitan permisos para acceder a la galería")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagen(result.assets[0].uri)
    }
  }

  const uploadImageAndGetUrl = async (uri: string) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    const filename = `facultades/${Date.now()}.jpg`
    const storageRef = ref(storage, filename)
    await uploadBytes(storageRef, blob)
    return await getDownloadURL(storageRef)
  }

  const handleCreate = async () => {
    if (!nombre.trim() || !descripcion.trim() || !imagen) {
      Alert.alert("Error", "Completa todos los campos")
      return
    }

    setUploading(true)
    try {
      const imageUrl = await uploadImageAndGetUrl(imagen)
      await createFaculty({ nombre: nombre.trim(), descripcion: descripcion.trim(), imagen: imageUrl })
      setNombre("")
      setDescripcion("")
      setImagen("")
      Alert.alert("Éxito", "Facultad registrada correctamente")
      fetchFacultades()
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar la facultad")
    } finally {
      setUploading(false)
    }
  }

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    backButton: {
      backgroundColor: colors.cardBackground,
      borderRadius: 24,
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
    },
    scrollContent: {
      paddingBottom: 32,
    },
    section: {
      marginHorizontal: 20,
      marginTop: 24,
    },
    sectionCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    facultyCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    facultyImage: {
      width: 60,
      height: 60,
      borderRadius: 12,
      marginRight: 16,
      backgroundColor: colors.border,
    },
    facultyInfo: {
      flex: 1,
    },
    facultyName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    facultyDescription: {
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 20,
    },
    emptyContainer: {
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.secondaryText,
      marginTop: 16,
    },
    formContainer: {
      marginTop: 24,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
      marginLeft: 4,
    },
    input: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 16,
      color: colors.text,
      minHeight: 56,
    },
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: "top",
    },
    imagePickerContainer: {
      marginBottom: 20,
    },
    imagePicker: {
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: "dashed",
      borderRadius: 16,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 160,
    },
    imagePickerWithImage: {
      borderStyle: "solid",
      borderColor: colors.primary,
    },
    selectedImage: {
      width: "100%",
      height: 120,
      borderRadius: 12,
      marginBottom: 12,
    },
    imagePickerText: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
      marginTop: 8,
    },
    imagePickerIcon: {
      marginBottom: 8,
    },
    createButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 16,
      marginTop: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      alignItems: "center",
    },
    createButtonDisabled: {
      backgroundColor: colors.secondaryText,
      opacity: 0.6,
    },
    createButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "700",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.text,
    },
  })

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando facultades...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gestión de Facultades</Text>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Facultades Registradas */}
          <View style={styles.section}>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="school-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                Facultades Registradas ({facultades.length})
              </Text>

              <FlatList
                data={facultades}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.facultyCard}>
                    <Image source={{ uri: item.imagen }} style={styles.facultyImage} />
                    <View style={styles.facultyInfo}>
                      <Text style={styles.facultyName}>{item.nombre}</Text>
                      <Text style={styles.facultyDescription}>
                        {item.descripcion}
                      </Text>
                    </View>
                  </View>
                )}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Ionicons name="school-outline" size={64} color={colors.secondaryText} />
                    <Text style={styles.emptyText}>No hay facultades registradas</Text>
                  </View>
                }
                scrollEnabled={false}
              />
            </View>
          </View>

          {/* Registrar Nueva Facultad */}
          <View style={styles.section}>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="add-circle-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                Registrar Nueva Facultad
              </Text>

              <View style={styles.formContainer}>
                {/* Nombre */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nombre de la Facultad</Text>
                  <TextInput
                    style={[styles.input, focusedField === "nombre" && styles.inputFocused]}
                    value={nombre}
                    onChangeText={setNombre}
                    placeholder="Ej: Facultad de Ingeniería"
                    placeholderTextColor={colors.secondaryText}
                    onFocus={() => setFocusedField("nombre")}
                    onBlur={() => setFocusedField(null)}
                    editable={!uploading}
                  />
                </View>

                {/* Descripción */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Descripción</Text>
                  <TextInput
                    style={[styles.input, styles.textArea, focusedField === "descripcion" && styles.inputFocused]}
                    value={descripcion}
                    onChangeText={setDescripcion}
                    placeholder="Describe la facultad y sus características..."
                    placeholderTextColor={colors.secondaryText}
                    multiline
                    numberOfLines={4}
                    onFocus={() => setFocusedField("descripcion")}
                    onBlur={() => setFocusedField(null)}
                    editable={!uploading}
                  />
                </View>

                {/* Imagen */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Imagen de la Facultad</Text>
                  <TouchableOpacity
                    style={[styles.imagePicker, imagen && styles.imagePickerWithImage]}
                    onPress={pickImage}
                    activeOpacity={0.7}
                    disabled={uploading}
                  >
                    {imagen ? (
                      <>
                        <Image source={{ uri: imagen }} style={styles.selectedImage} />
                        <Text style={styles.imagePickerText}>Toca para cambiar imagen</Text>
                      </>
                    ) : (
                      <>
                        <Ionicons
                          name="image-outline"
                          size={48}
                          color={colors.secondaryText}
                          style={styles.imagePickerIcon}
                        />
                        <Text style={styles.imagePickerText}>Toca para seleccionar imagen</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>

                {/* Botón Crear */}
                <TouchableOpacity
                  style={[styles.createButton, uploading && styles.createButtonDisabled]}
                  onPress={handleCreate}
                  disabled={uploading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.createButtonText}>{uploading ? "Registrando..." : "Registrar Facultad"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default RegisterFaculty
