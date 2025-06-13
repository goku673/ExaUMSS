import type React from "react"
import { useState, useEffect } from "react"
import { View, StyleSheet, ActivityIndicator, Animated, Dimensions, TouchableOpacity, ScrollView } from "react-native"
import { Modal, Portal } from "react-native-paper"
import FacultyCard from "./FacultyCard"
import Text from "./Text"
import { useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { getAllFaculties } from "@/firebase/firebaseServices"
import { Ionicons } from "@expo/vector-icons"

interface Facultad {
  id: string
  nombre: string
  descripcion: string
  imagen: string
}

const { height: screenHeight, width: screenWidth } = Dimensions.get("window")

const CardGrid: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [facultades, setFacultades] = useState<Facultad[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const colors = getThemeColors(theme)


  // Animaciones
  const slideAnim = useState(new Animated.Value(screenHeight))[0]
  const opacityAnim = useState(new Animated.Value(0))[0]
  const scaleAnim = useState(new Animated.Value(0.9))[0]

  useEffect(() => {
    const fetchFacultades = async () => {
      try {
        const data = await getAllFaculties()
        setFacultades(data)
      } finally {
        setLoading(false)
      }
    }
    fetchFacultades()
  }, [])

  useEffect(() => {
    if (visible) {
      // Animación de apertura
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      // Reset animaciones
      slideAnim.setValue(screenHeight)
      opacityAnim.setValue(0)
      scaleAnim.setValue(0.9)
    }
  }, [visible])

  const handleCardPress = (title: string) => {
    if (title === t("cardGrig.facultad")) {
      setVisible(true)
      console.log(`Card clicked: ${title}`)
    } else if (title === t("cardGrig.reciente")) {
      
      console.log(`Card clicked: ${title}`)
    } 
      else {
      router.push("/(tabs)/guide")
      console.log(`Card clicked: ${title}`)
      router.push("/(tabs)/guide")
    }
  }

  const hideModal = () => {
    // Animación de cierre
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false)
    })
  }

  const handleFacultySelect = (facultyId: string) => {
    router.push(`/(faculty)/${facultyId}`)
    hideModal()
  }

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 20,
      textAlign: "center",
    },
    cardsContainer: {
      gap: 16,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    cardWrapper: {
      flex: 1,
      marginHorizontal: 4,
    },
    fullWidthCard: {
      width: "100%",
    },
    modernCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    cardIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 20,
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    cardAction: {
      flexDirection: "row",
      alignItems: "center",
    },
    cardActionText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primary,
      marginRight: 4,
    },
    modalWrapper: {
      flex: 1,
      justifyContent: "flex-end",
      margin: 0,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    backdropTouchable: {
      flex: 1,
    },
    modalContainer: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      maxHeight: screenHeight * 0.85,
      minHeight: screenHeight * 0.6,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: -8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 20,
    },
    modalHandle: {
      width: 40,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      alignSelf: "center",
      marginTop: 12,
      marginBottom: 20,
    },
    modalHeader: {
      paddingHorizontal: 24,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
    },
    modalSubtitle: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: 24,
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    modalBody: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 20,
    },
    facultyGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 60,
    },
    loadingText: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 60,
    },
    emptyText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
    },
  })

  const cardData = [
    {
      title: t("cardGrig.facultad"),
      description: t("cardGrig.facultadContext"),
      icon: "school-outline",
      color: "#3b82f6",
      action: t("cardGrig.explore"),
    },
    
    {
      title: t("cardGrig.guia"),
      description: t("cardGrig.guiaContext"),
      icon: "book-outline",
      color: "#f59e0b",
      action: t("cardGrig.read"),
    },
  ]

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{t("cardGrig.recourses")}</Text>

        <View style={styles.cardsContainer}>
          {cardData.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.modernCard, index === 2 && styles.fullWidthCard]}
              onPress={() => handleCardPress(card.title)}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.cardIcon, { backgroundColor: card.color }]}>
                  <Ionicons name={card.icon as any} size={24} color="#ffffff" />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.cardAction}>
                  <Text style={[styles.cardActionText, { color: card.color }]}>{card.action}</Text>
                  <Ionicons name="arrow-forward" size={16} color={card.color} />
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalWrapper}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: opacityAnim,
              },
            ]}
          >
            <TouchableOpacity style={styles.backdropTouchable} activeOpacity={1} onPress={hideModal} />
          </Animated.View>

          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t("cardGrig.title")}</Text>
              <Text style={styles.modalSubtitle}>{t("cardGrig.selectAFaculty")}</Text>

              <TouchableOpacity style={styles.closeButton} onPress={hideModal} activeOpacity={0.7}>
                <Ionicons name="close" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.facultyGrid}>
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>{t("cardGrig.loading")}</Text>
                  </View>
                ) : facultades.length > 0 ? (
                  facultades.map((fac) => (
                    <FacultyCard
                      key={fac.id}
                      title={fac.nombre}
                      image={{ uri: fac.imagen }}
                      titleStyle={{ color: colors.cardText }}
                      onPress={() => handleFacultySelect(fac.id)}
                    />
                  ))
                ) : (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="school-outline" size={64} color={colors.secondaryText} />
                    <Text style={styles.emptyText}>{t("cardGrig.noFaculties")}</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </Animated.View>
        </Modal>
      </Portal>
    </>
  )
}

export default CardGrid
