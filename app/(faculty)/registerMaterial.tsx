"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { getAllFaculties, createMaterial, getMaterialsByFaculty } from "@/firebase/firebaseServices"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"

interface Facultad {
  id: string
  nombre: string
  descripcion: string
  imagen: string
}

interface Material {
  id: string
  nombre: string
  descripcion: string
  tipo: string
  archivoUrl: string
  fecha: string
}

const storage = getStorage()

const RegisterMaterials: React.FC = () => {
  const [facultades, setFacultades] = useState<Facultad[]>([])
  const [facultadSeleccionada, setFacultadSeleccionada] = useState<Facultad | null>(null)
  const [materiales, setMateriales] = useState<Material[]>([])
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [archivo, setArchivo] = useState<any>(null)
  const [tipo, setTipo] = useState("pdf")
  const [uploading, setUploading] = useState(false)
  const [fecha, setFecha] = useState("")
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
    } catch {
      Alert.alert("Error", "No se pudieron cargar las facultades")
    } finally {
      setLoading(false)
    }
  }

  const fetchMateriales = async (facultadId: string) => {
    try {
      const data = await getMaterialsByFaculty(facultadId)
      setMateriales(data)
    } catch {
      Alert.alert("Error", "No se pudieron cargar los materiales")
    }
  }

  const handleSelectFacultad = (facultad: Facultad) => {
    setFacultadSeleccionada(facultad)
    fetchMateriales(facultad.id)
    resetForm()
  }

  const resetForm = () => {
    setNombre("")
    setDescripcion("")
    setArchivo(null)
    setFecha("")
    setTipo("pdf")
  }

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0]
        setArchivo(file)
        setTipo(file.mimeType?.startsWith("image") ? "imagen" : "pdf")
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo seleccionar el archivo")
    }
  }

  const uploadFileAndGetUrl = async (file: any) => {
    const response = await fetch(file.uri)
    const blob = await response.blob()
    const filename = `facultades/${facultadSeleccionada?.id}/materiales/${Date.now()}_${file.name}`
    const storageRef = ref(storage, filename)
    await uploadBytes(storageRef, blob)
    return await getDownloadURL(storageRef)
  }

  const handleCreateMaterial = async () => {
    if (!facultadSeleccionada) {
      Alert.alert("Error", "Selecciona una facultad")
      return
    }
    if (!nombre.trim() || !descripcion.trim() || !archivo || !fecha.trim()) {
      Alert.alert("Error", "Completa todos los campos")
      return
    }

    setUploading(true)
    try {
      const archivoUrl = await uploadFileAndGetUrl(archivo)
      await createMaterial(facultadSeleccionada.id, {
        nombre: nombre.trim(),
        fecha: fecha.trim(),
        tipo,
        archivoUrl,
        descripcion: descripcion.trim(),
      })
      resetForm()
      Alert.alert("Éxito", "Material registrado correctamente")
      fetchMateriales(facultadSeleccionada.id)
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el material")
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
    facultyButton: {
      backgroundColor: colors.background,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginRight: 12,
      borderWidth: 1,
      borderColor: colors.border,
      minWidth: 120,
      alignItems: "center",
    },
    facultyButtonSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    facultyButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    facultyButtonTextSelected: {
      color: "#ffffff",
    },
    materialCard: {
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
    materialHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    materialName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      flex: 1,
      marginRight: 12,
    },
    materialType: {
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    materialTypeText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#ffffff",
      textTransform: "uppercase",
    },
    materialDescription: {
      fontSize: 14,
      color: colors.secondaryText,
      marginBottom: 8,
      lineHeight: 20,
    },
    materialDate: {
      fontSize: 12,
      color: colors.secondaryText,
      fontWeight: "500",
    },
    emptyContainer: {
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.secondaryText,
      marginTop: 16,
      textAlign: "center",
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
    filePicker: {
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: "dashed",
      borderRadius: 16,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 80,
    },
    filePickerWithFile: {
      borderStyle: "solid",
      borderColor: colors.primary,
    },
    filePickerText: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
      marginTop: 8,
    },
    filePickerIcon: {
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
          <Text style={styles.headerTitle}>Gestión de Materiales</Text>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Seleccionar Facultad */}
          <View style={styles.section}>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="school-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                Selecciona una Facultad
              </Text>

              <FlatList
                data={facultades}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectFacultad(item)}
                    style={[styles.facultyButton, facultadSeleccionada?.id === item.id && styles.facultyButtonSelected]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.facultyButtonText,
                        facultadSeleccionada?.id === item.id && styles.facultyButtonTextSelected,
                      ]}
                    >
                      {item.nombre}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          {facultadSeleccionada && (
            <>
              {/* Materiales Existentes */}
              <View style={styles.section}>
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitle}>
                    <Ionicons name="library-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                    Materiales de {facultadSeleccionada.nombre} ({materiales.length})
                  </Text>

                  <FlatList
                    data={materiales}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.materialCard}>
                        <View style={styles.materialHeader}>
                          <Text style={styles.materialName}>{item.nombre}</Text>
                          <View style={styles.materialType}>
                            <Text style={styles.materialTypeText}>{item.tipo}</Text>
                          </View>
                        </View>
                        <Text style={styles.materialDescription} numberOfLines={2}>
                          {item.descripcion}
                        </Text>
                        <Text style={styles.materialDate}>📅 {item.fecha}</Text>
                      </View>
                    )}
                    ListEmptyComponent={
                      <View style={styles.emptyContainer}>
                        <Ionicons name="document-outline" size={64} color={colors.secondaryText} />
                        <Text style={styles.emptyText}>No hay materiales registrados para esta facultad</Text>
                      </View>
                    }
                    scrollEnabled={false}
                  />
                </View>
              </View>

              {/* Registrar Material */}
              <View style={styles.section}>
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitle}>
                    <Ionicons name="add-circle-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                    Registrar Nuevo Material
                  </Text>

                  {/* Nombre */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre del Material</Text>
                    <TextInput
                      style={[styles.input, focusedField === "nombre" && styles.inputFocused]}
                      value={nombre}
                      onChangeText={setNombre}
                      placeholder="Ej: Examen de Admisión 2024"
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
                      placeholder="Describe el contenido del material..."
                      placeholderTextColor={colors.secondaryText}
                      multiline
                      numberOfLines={3}
                      onFocus={() => setFocusedField("descripcion")}
                      onBlur={() => setFocusedField(null)}
                      editable={!uploading}
                    />
                  </View>

                  {/* Fecha */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Fecha (YYYY-MM-DD)</Text>
                    <TextInput
                      style={[styles.input, focusedField === "fecha" && styles.inputFocused]}
                      value={fecha}
                      onChangeText={setFecha}
                      placeholder="2024-01-15"
                      placeholderTextColor={colors.secondaryText}
                      onFocus={() => setFocusedField("fecha")}
                      onBlur={() => setFocusedField(null)}
                      editable={!uploading}
                    />
                  </View>

                  {/* Archivo */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Archivo</Text>
                    <TouchableOpacity
                      style={[styles.filePicker, archivo && styles.filePickerWithFile]}
                      onPress={pickFile}
                      activeOpacity={0.7}
                      disabled={uploading}
                    >
                      <Ionicons
                        name={archivo ? "document-text" : "cloud-upload-outline"}
                        size={32}
                        color={archivo ? colors.primary : colors.secondaryText}
                        style={styles.filePickerIcon}
                      />
                      <Text style={styles.filePickerText}>
                        {archivo ? archivo.name : "Seleccionar archivo (PDF o imagen)"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Botón Crear */}
                  <TouchableOpacity
                    style={[styles.createButton, uploading && styles.createButtonDisabled]}
                    onPress={handleCreateMaterial}
                    disabled={uploading}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.createButtonText}>{uploading ? "Registrando..." : "Registrar Material"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default RegisterMaterials
