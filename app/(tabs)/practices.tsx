import type React from "react"
import { useEffect, useState, useRef } from "react"
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
  Alert,
  Linking,
  RefreshControl,
} from "react-native"
import Text from "@/components/ui/Text"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { getAllMaterials } from "@/firebase/firebaseServices"
import { WebView } from "react-native-webview"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useTranslation } from "react-i18next"

interface Material {
  id: string
  nombre: string
  descripcion: string
  facultadNombre: string
  archivoUrl: string
  tipo: string
  fecha: string
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const PracticeAllScreen: React.FC = () => {
  const router = useRouter()
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  const [materials, setMaterials] = useState<Material[]>([])
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([])
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(true)
  const [focusedSearch, setFocusedSearch] = useState(false)

  // Estado para visor
  const [viewerVisible, setViewerVisible] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<{ url: string; tipo: string; nombre: string } | null>(null)
  const [loadingViewer, setLoadingViewer] = useState(false)
  const [viewerError, setViewerError] = useState(false)

  // Agregar estos estados después de los estados existentes
  const [refreshing, setRefreshing] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(0)

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(screenHeight)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  // Filtros
  const [activeFilter, setActiveFilter] = useState<string>("todos")

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true)
      try {
        const all = await getAllMaterials()
        setMaterials(all)
        setFilteredMaterials(all)

        // Animación de entrada
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()
      } catch (error) {
        console.error("Error al cargar materiales:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMaterials()
  }, [])

  useEffect(() => {
    let filtered = [...materials]

    // Aplicar filtro de tipo
    if (activeFilter !== "todos") {
      filtered = filtered.filter((mat) => mat.tipo.toLowerCase() === activeFilter.toLowerCase())
    }

    // Aplicar búsqueda
    if (searchText) {
      filtered = filtered.filter(
        (mat) =>
          mat.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
          mat.descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
          mat.facultadNombre.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    setFilteredMaterials(filtered)
  }, [searchText, materials, activeFilter])

  // Función para crear URL de Google Docs Viewer para PDFs
  const createPDFViewerUrl = (url: string) => {
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`
  }

  // Función para verificar si la URL es válida
  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleOpenMaterial = (url: string, tipo: string, nombre: string) => {
    if (!isValidUrl(url)) {
      Alert.alert("Error", "La URL del archivo no es válida")
      return
    }

    setSelectedMaterial({ url, tipo, nombre })
    setLoadingViewer(true)
    setViewerError(false)
    setViewerVisible(true)

    // Animaciones de apertura del modal
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()
  }

  // Función para refrescar la lista
  const onRefresh = async () => {
    setRefreshing(true)
    try {
      const all = await getAllMaterials()
      setMaterials(all)
      setFilteredMaterials(all)
      setForceUpdate((prev) => prev + 1) // Forzar re-render
    } catch (error) {
      console.error("Error al refrescar materiales:", error)
    } finally {
      setRefreshing(false)
    }
  }

  // Modificar la función handleCloseViewer
  const handleCloseViewer = () => {
    // Animaciones de cierre del modal
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setViewerVisible(false)
      setSelectedMaterial(null)
      setViewerError(false)
      setLoadingViewer(false)

      // Resetear animación de la lista para asegurar que se muestre
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()

      // Forzar actualización de la lista
      setForceUpdate((prev) => prev + 1)
    })
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  const handleDownload = async () => {
    if (selectedMaterial?.url) {
      try {
        await Linking.openURL(selectedMaterial.url)
      } catch (error) {
        Alert.alert("Error", "No se pudo abrir el enlace de descarga")
      }
    }
  }

  const handleWebViewError = () => {
    setLoadingViewer(false)
    setViewerError(true)
  }

  const handleWebViewLoad = () => {
    setLoadingViewer(false)
    setViewerError(false)
  }

  const handleImageError = () => {
    setLoadingViewer(false)
    setViewerError(true)
  }

  const handleImageLoad = () => {
    setLoadingViewer(false)
    setViewerError(false)
  }

  const renderItem = ({ item }: { item: Material }) => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
        activeOpacity={0.9}
        onPress={() => handleOpenMaterial(item.archivoUrl, item.tipo, item.nombre)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.nombre}</Text>
            <Text style={[styles.cardFaculty, { color: colors.secondaryText }]}>{item.facultadNombre}</Text>
          </View>
          <View
            style={[
              styles.cardBadge,
              {
                backgroundColor: item.tipo === "pdf" ? colors.primary : "#10b981",
              },
            ]}
          >
            <Ionicons
              name={item.tipo === "pdf" ? "document-text" : "image"}
              size={14}
              color="#ffffff"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.cardBadgeText}>{item.tipo.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={[styles.cardDescription, { color: colors.secondaryText }]} >
          {item.descripcion}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={[styles.cardDate, { color: colors.secondaryText }]}>
            <Ionicons name="calendar-outline" size={14} color={colors.secondaryText} /> {item.fecha || "Sin fecha"}
          </Text>
          <TouchableOpacity
            style={[styles.cardButton, { backgroundColor: colors.primary }]}
            onPress={() => handleOpenMaterial(item.archivoUrl, item.tipo, item.nombre)}
          >
            <Ionicons name="eye-outline" size={16} color="#ffffff" style={{ marginRight: 4 }} />
            <Text style={styles.cardButtonText}>{t("practice.seeMaterials")}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )

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
      paddingVertical: 36,
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
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    searchContainer: {
      marginBottom: 20,
    },
    searchInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: focusedSearch ? colors.primary : colors.border,
      paddingHorizontal: 16,
      height: 56,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: focusedSearch ? 0.15 : 0.05,
      shadowRadius: focusedSearch ? 8 : 4,
      elevation: focusedSearch ? 4 : 2,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      height: "100%",
    },
    clearButton: {
      padding: 8,
    },
    filtersContainer: {
      flexDirection: "row",
      marginBottom: 20,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.secondaryText,
      marginLeft: 4,
    },
    filterTextActive: {
      color: "#ffffff",
    },
    materialsListContainer: {
      flex: 1,
    },
    card: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    cardTitleContainer: {
      flex: 1,
      marginRight: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 4,
    },
    cardFaculty: {
      fontSize: 14,
      fontWeight: "500",
    },
    cardBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    cardBadgeText: {
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "600",
    },
    cardDescription: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 16,
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardDate: {
      fontSize: 12,
      fontWeight: "500",
    },
    cardButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    cardButtonText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "600",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 60,
    },
    emptyIcon: {
      marginBottom: 16,
    },
    emptyText: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
      marginTop: 8,
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
    modalContainer: {
      flex: 1,
      backgroundColor: "#000",
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: Platform.OS === "ios" ? 50 : 20,
      paddingBottom: 16,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    modalTitle: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
      flex: 1,
      textAlign: "center",
      marginHorizontal: 16,
    },
    modalActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionButton: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 8,
    },
    closeButton: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    viewerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageViewer: {
      width: screenWidth,
      height: screenHeight,
      resizeMode: "contain",
    },
    webViewContainer: {
      flex: 1,
      width: screenWidth,
      height: screenHeight,
      marginTop: Platform.OS === "ios" ? 90 : 70,
    },
    viewerLoadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 5,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },
    errorIcon: {
      marginBottom: 20,
    },
    errorTitle: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 12,
    },
    errorText: {
      color: "#cccccc",
      fontSize: 14,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: 24,
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    retryButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
    downloadButton: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    downloadButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
  })

  const filters = [
    { id: "todos", label: t("practice.allFiles"), icon: "apps" },
    { id: "pdf", label: "PDFs", icon: "document-text" },
    { id: "imagen", label: t("practice.images"), icon: "image" },
  ]

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>{t("practice.MaterialsLoading")}</Text>
        </View>
      </SafeAreaView>
    )
  }

  // Agregar un botón de refresh en el header
  const headerTitle = (
    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
      <Text style={styles.headerTitle}>{t("practice.title")}</Text>
      <TouchableOpacity
        style={[styles.backButton, { marginLeft: "auto", marginRight: 0 }]}
        onPress={onRefresh}
        activeOpacity={0.7}
      >
        <Ionicons name="refresh" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          {headerTitle}
        </View>

        <View style={styles.contentContainer}>
          {/* Barra de búsqueda */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons
                name="search"
                size={20}
                color={focusedSearch ? colors.primary : colors.secondaryText}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder= {t("practice.Search subject")}
                placeholderTextColor={colors.secondaryText}
                value={searchText}
                onChangeText={setSearchText}
                onFocus={() => setFocusedSearch(true)}
                onBlur={() => setFocusedSearch(false)}
              />
              {searchText.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={() => setSearchText("")}>
                  <Ionicons name="close-circle" size={20} color={colors.secondaryText} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Filtros */}
          <View style={styles.filtersContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterButton, activeFilter === filter.id && styles.filterButtonActive]}
                onPress={() => handleFilterChange(filter.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={filter.icon as any}
                  size={16}
                  color={activeFilter === filter.id ? "#ffffff" : colors.secondaryText}
                />
               <Text style={[styles.filterText, ...(activeFilter === filter.id ? [styles.filterTextActive] : [])]}>
                {filter.label}
              </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Lista de materiales */}
          <View style={styles.materialsListContainer}>
            <FlatList
              data={filteredMaterials}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              extraData={forceUpdate}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                />
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons
                    name={searchText ? "search-outline" : "document-outline"}
                    size={64}
                    color={colors.secondaryText}
                    style={styles.emptyIcon}
                  />
                  <Text style={styles.emptyText}>
                    {searchText ? `No se encontraron materiales para "${searchText}"` : "No hay materiales disponibles"}
                  </Text>
                  {searchText && (
                    <TouchableOpacity
                      style={[styles.cardButton, { backgroundColor: colors.primary, marginTop: 16 }]}
                      onPress={() => setSearchText("")}
                    >
                      <Text style={styles.cardButtonText}>{t("practice.clear")}</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.cardButton, { backgroundColor: colors.primary, marginTop: 16 }]}
                    onPress={onRefresh}
                  >
                    <Text style={styles.cardButtonText}>{t("practice.refresh")}</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>

        {/* Modal visor mejorado */}
        <Modal visible={viewerVisible} animationType="slide" onRequestClose={handleCloseViewer}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <View style={styles.modalContainer}>
            {/* Header del modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedMaterial?.nombre}
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.actionButton} onPress={handleDownload} activeOpacity={0.7}>
                  <Ionicons name="download-outline" size={20} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseViewer} activeOpacity={0.7}>
                  <Ionicons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Contenido del visor */}
            <Animated.View
              style={[
                styles.viewerContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
                },
              ]}
            >
              {viewerError ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle-outline" size={64} color="#ffffff" style={styles.errorIcon} />
                  <Text style={styles.errorTitle}>{t("practice.noMaterials")}</Text>
                  <Text style={styles.errorText}>
                    {t("practice.faileMaterial")}
                  </Text>
                  <TouchableOpacity
                    style={styles.retryButton}
                    onPress={() => {
                      setViewerError(false)
                      setLoadingViewer(true)
                    }}
                  >
                    <Text style={styles.retryButtonText}>{t("practice.retry")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                    <Text style={styles.downloadButtonText}>{t("practice.downloadFile")}</Text>
                  </TouchableOpacity>
                </View>
              ) : selectedMaterial?.tipo === "pdf" ? (
                <View style={styles.webViewContainer}>
                  <WebView
                    source={{ uri: createPDFViewerUrl(selectedMaterial.url) }}
                    style={{ flex: 1 }}
                    onLoadStart={() => setLoadingViewer(true)}
                    onLoadEnd={handleWebViewLoad}
                    onError={handleWebViewError}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    mixedContentMode="compatibility"
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false}
                  />
                </View>
              ) : (
                <Image
                  source={{ uri: selectedMaterial?.url }}
                  style={styles.imageViewer}
                  onLoadStart={() => setLoadingViewer(true)}
                  onLoadEnd={handleImageLoad}
                  onError={handleImageError}
                />
              )}

              {loadingViewer && !viewerError && (
                <View style={styles.viewerLoadingContainer}>
                  <ActivityIndicator size="large" color="#ffffff" />
                  <Text style={{ color: "#ffffff", marginTop: 16, fontSize: 16 }}>{t("practice.fileLoading")}</Text>
                </View>
              )}
            </Animated.View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

export default PracticeAllScreen
