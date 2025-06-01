"use client"

import React, { useEffect, useState } from "react"
import { View, StyleSheet, SafeAreaView, SectionList, TouchableOpacity, Linking } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import Text from "@/components/ui/Text"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"
import { getMaterialsByFaculty, getAllFaculties } from "@/firebase/firebaseServices"
import { Ionicons } from "@expo/vector-icons"

interface Material {
  id: string
  nombre: string
  descripcion: string
  tipo: string
  archivoUrl: string
  fecha: string
}

const FacultyScreen: React.FC = () => {
  const { fac } = useLocalSearchParams()
  const router = useRouter()
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  const [materialsByYear, setMaterialsByYear] = useState<any[]>([])
  const [facultyName, setFacultyName] = useState<string>("")
  const [loading, setLoading] = useState(true)

  // Memoized styles
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },
        safeArea: {
          flex: 1,
          backgroundColor: colors.background,
        },
        headerContainer: {
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
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          backgroundColor: colors.cardBackground,
          borderRadius: 24,
          width: 48,
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
        },
        header: {
          fontSize: 22,
          fontWeight: "700",
          textAlign: "center",
          color: colors.text,
          marginTop: 48,
          marginBottom: 8,
          paddingHorizontal: 60,
          lineHeight: 28,
        },
        subtitle: {
          fontSize: 14,
          color: colors.secondaryText,
          textAlign: "center",
          marginBottom: 16,
        },
        contentContainer: {
          flex: 1,
          paddingHorizontal: 20,
        },
        sectionHeaderContainer: {
          backgroundColor: colors.primary,
          marginTop: 24,
          marginBottom: 12,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        sectionHeader: {
          fontWeight: "700",
          fontSize: 18,
          color: "#ffffff",
          marginLeft: 8,
        },
        materialCard: {
          marginVertical: 6,
          padding: 20,
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        },
        materialHeader: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        },
        materialTitle: {
          fontWeight: "700",
          fontSize: 16,
          color: colors.text,
          flex: 1,
          marginRight: 12,
          lineHeight: 22,
        },
        materialType: {
          backgroundColor: colors.primary,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
          alignSelf: "flex-start",
        },
        materialTypeText: {
          color: "#ffffff",
          fontSize: 12,
          fontWeight: "600",
          textTransform: "uppercase",
        },
        materialDesc: {
          color: colors.secondaryText,
          fontSize: 14,
          lineHeight: 20,
          marginBottom: 12,
        },
        materialMeta: {
          color: colors.secondaryText,
          fontSize: 12,
          marginBottom: 16,
          fontWeight: "500",
        },
        downloadButton: {
          backgroundColor: colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 3,
        },
        downloadButtonText: {
          color: "#ffffff",
          fontWeight: "600",
          fontSize: 14,
          marginLeft: 8,
        },
        emptyContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 60,
        },
        emptyText: {
          fontSize: 16,
          color: colors.secondaryText,
          textAlign: "center",
          marginTop: 16,
        },
        loadingContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [colors, theme],
  )

  useEffect(() => {
    const fetchData = async () => {
      if (!fac) return

      setLoading(true)
      try {
        const facultyId = Array.isArray(fac) ? fac[0] : fac

        // Obtener nombre de la facultad
        const allFaculties = await getAllFaculties()
        const faculty = allFaculties.find((f) => f.id === facultyId)
        setFacultyName(faculty?.nombre || facultyId)

        // Obtener materiales y agrupar por año
        const materials: Material[] = await getMaterialsByFaculty(facultyId)
        const grouped: { [year: string]: Material[] } = {}

        materials.forEach((mat) => {
          const year = mat.fecha?.slice(0, 4) || "Sin año"
          if (!grouped[year]) grouped[year] = []
          grouped[year].push(mat)
        })

        const sections = Object.keys(grouped)
          .sort((a, b) => b.localeCompare(a)) // años descendente
          .map((year) => ({
            title: year,
            data: grouped[year],
          }))

        setMaterialsByYear(sections)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fac])

  const renderMaterialCard = ({ item }: { item: Material }) => (
    <View style={styles.materialCard}>
      <View style={styles.materialHeader}>
        <Text style={styles.materialTitle}>{item.nombre}</Text>
        <View style={styles.materialType}>
          <Text style={styles.materialTypeText}>{item.tipo}</Text>
        </View>
      </View>

      <Text style={styles.materialDesc}>{item.descripcion}</Text>
      <Text style={styles.materialMeta}>📅 {item.fecha}</Text>

      <TouchableOpacity
        onPress={() => Linking.openURL(item.archivoUrl)}
        style={styles.downloadButton}
        activeOpacity={0.8}
      >
        <Ionicons name={item.tipo === "pdf" ? "document-text" : "image"} size={16} color="#ffffff" />
        <Text style={styles.downloadButtonText}>{item.tipo === "pdf" ? "Ver/Descargar PDF" : "Ver Imagen"}</Text>
      </TouchableOpacity>
    </View>
  )

  const renderSectionHeader = ({ section: { title } }: any) => (
    <View style={styles.sectionHeaderContainer}>
      <Ionicons name="calendar" size={20} color="#ffffff" />
      <Text style={styles.sectionHeader}>{title}</Text>
    </View>
  )

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.emptyText}>{t("practice.MaterialsLoading")}</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>{t("[fac].entranceExamsFor", { faculty: facultyName })}</Text>
          <Text style={styles.subtitle}>{t("[fac].materials")}</Text>
        </View>

        <View style={styles.contentContainer}>
          <SectionList
            sections={materialsByYear}
            keyExtractor={(item) => item.id}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderMaterialCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="document-outline" size={64} color={colors.secondaryText} />
                <Text style={styles.emptyText}>{t("[fac].noMaterials")}</Text>
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FacultyScreen
