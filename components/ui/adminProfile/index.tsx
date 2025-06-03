"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import Text from "../Text"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { images } from "@/assets/images"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"
import { useUser } from "@/context/UserContext"
import { logout } from "@/firebase/firebaseServices"
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const AdminProfile: React.FC = () => {
  const { user, setUser } = useUser()
  const router = useRouter()
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    createdAt: "",
    gender: "",
    age: "",
    joinedDate: "",
    isAdmin: false,
    profileImage: images.profileFake,
  })

  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const db = getFirestore()
          const userDocRef = doc(db, "users", user.uid)
          const userDoc = await getDoc(userDocRef)

          if (userDoc.exists()) {
            const data = userDoc.data()
            setUserData({
              ...userData,
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              email: data.email || user.email || "",
              createdAt: data.createdAt || "",
              gender: data.gender || userData.gender,
              isAdmin: data.isAdmin || false,
              age: data.age || userData.age,
              joinedDate: data.joinedDate || userData.joinedDate,
              profileImage: data.profileImage || user.photoURL || images.profileFake,
            })

            setUser({
              ...user,
              ...data,
            })
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error)
          Alert.alert(t("profile.error"), t("profile.errorFetchingData"), [{ text: t("common.ok") }])
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  const pickAndUploadImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== "granted") {
        Alert.alert(t("profile.permissionDenied"), t("profile.cameraRollPermission"), [{ text: t("common.ok") }])
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUploading(true)
        const imageUri = result.assets[0].uri

        const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1)

        try {
          const response = await fetch(imageUri)
          const blob = await response.blob()

          const storage = getStorage()
          const storageRef = ref(storage, `profileImages/${user?.uid}/${imageName}`)

          const uploadTask = await uploadBytes(storageRef, blob)
          const downloadURL = await getDownloadURL(uploadTask.ref)

          if (user?.uid) {
            const db = getFirestore()
            const userDocRef = doc(db, "users", user.uid)

            await updateDoc(userDocRef, {
              profileImage: downloadURL,
            })

            setUserData({
              ...userData,
              profileImage: downloadURL,
            })

            setUser({
              ...user,
              photoURL: downloadURL,
              profileImage: downloadURL,
            })

            Alert.alert(t("profile.success"), t("profile.imageUpdated"), [{ text: t("common.ok") }])
          }
        } catch (uploadError) {
          console.error("Error específico durante la subida:", uploadError)
          Alert.alert(
            "Error de subida",
            `Detalles: ${uploadError instanceof Error ? uploadError.message : String(uploadError)}`,
            [{ text: "OK" }],
          )
        }
      }
    } catch (error) {
      console.error("Error al subir imagen:", error)
      Alert.alert(t("profile.error"), t("profile.errorUploadingImage"), [{ text: t("common.ok") }])
    } finally {
      setUploading(false)
    }
  }

  const handleLogout = async () => {
    Alert.alert(
      t("profile.logout"),
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await logout()
              setUser(null)
              router.push("/(auth)/login")
            } catch (error) {
              console.error("Error logging out:", error)
            }
          },
        },
      ],
      { cancelable: true },
    )
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "--"
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    } catch (e) {
      return dateString
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
    scrollContent: {
      paddingBottom: 32,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 26,
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
    profileSection: {
      alignItems: "center",
      paddingVertical: 32,
      paddingHorizontal: 20,
      backgroundColor: colors.cardBackground,
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
    },
    profileImageContainer: {
      position: "relative",
      marginBottom: 20,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 4,
      borderColor: colors.primary,
    },
    editImageButton: {
      position: "absolute",
      bottom: 4,
      right: 4,
      backgroundColor: colors.primary,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.cardBackground,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    profileName: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
      textAlign: "center",
    },
    profileEmail: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
    },
    userInfoSection: {
      marginHorizontal: 20,
      marginTop: 24,
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    userInfoTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    userInfoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    userInfoItemLast: {
      borderBottomWidth: 0,
    },
    userInfoLabel: {
      fontSize: 14,
      color: colors.secondaryText,
      fontWeight: "500",
      flex: 1,
    },
    userInfoValue: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      flex: 1,
      textAlign: "right",
    },
    actionsSection: {
      marginHorizontal: 20,
      marginTop: 24,
    },
    actionButton: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionButtonPrimary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    actionButtonDanger: {
      backgroundColor: "#ef4444",
      borderColor: "#ef4444",
    },
    actionIcon: {
      marginRight: 16,
    },
    actionContent: {
      flex: 1,
    },
    actionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 2,
    },
    actionTitleWhite: {
      color: "#ffffff",
    },
    actionSubtitle: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    actionSubtitleWhite: {
      color: "rgba(255, 255, 255, 0.8)",
    },
    actionArrow: {
      marginLeft: 8,
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
          <Text style={styles.loadingText}>{t("profile.loading")}</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("profile.title")}</Text>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={
                  userData.profileImage
                    ? typeof userData.profileImage === "string"
                      ? { uri: userData.profileImage }
                      : userData.profileImage
                    : images.profileFake
                }
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.editImageButton}
                onPress={pickAndUploadImage}
                disabled={uploading}
                activeOpacity={0.8}
              >
                {uploading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons name="camera" size={20} color="white" />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>
              {userData.firstName && userData.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : user?.displayName || "Usuario"}
            </Text>
            <Text style={styles.profileEmail}>{userData.email}</Text>
          </View>

          <View style={styles.userInfoSection}>
            <Text style={styles.userInfoTitle}>
              <Ionicons name="person-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
              {t("profile.personalInfo")}
            </Text>

            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>{t("profile.name")}</Text>
              <Text style={styles.userInfoValue}>{userData.firstName || "--"}</Text>
            </View>

            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>{t("profile.lastName")}</Text>
              <Text style={styles.userInfoValue}>{userData.lastName || "--"}</Text>
            </View>

            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>{t("profile.email")}</Text>
              <Text style={styles.userInfoValue}>{userData.email}</Text>
            </View>

            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>{t("profile.registrationDate")}</Text>
              <Text style={styles.userInfoValue}>{formatDate(userData.joinedDate)}</Text>
            </View>

            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>{t("profile.gender")}</Text>
              <Text style={styles.userInfoValue}>{userData.gender || "--"}</Text>
            </View>

            <View style={[styles.userInfoItem, styles.userInfoItemLast]}>
              <Text style={styles.userInfoLabel}>{t("profile.age")}</Text>
              <Text style={styles.userInfoValue}>{userData.age || "--"}</Text>
            </View>
          </View>

{/* Actions Section */}
    <View style={styles.actionsSection}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => router.push("/(auth)/editprofile")}
        activeOpacity={0.7}
      >
        <Ionicons name="create-outline" size={24} color={colors.primary} style={styles.actionIcon} />
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>{t("profile.edit")}</Text>
          <Text style={styles.actionSubtitle}>{t("profile.edit2")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} style={styles.actionArrow} />
      </TouchableOpacity>

      {userData.isAdmin && (
        <>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={() => router.push("/(faculty)/registerFaculty")}
            activeOpacity={0.7}
          >
            <Ionicons name="school-outline" size={24} color="#ffffff" style={styles.actionIcon} />
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, styles.actionTitleWhite]}>{t("profile.manageFaculties")}</Text>
              <Text style={[styles.actionSubtitle, styles.actionSubtitleWhite]}>{t("profile.manageFacultiesText")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.8)" style={styles.actionArrow} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={() => router.push("/(faculty)/registerMaterial")}
            activeOpacity={0.7}
          >
            <Ionicons name="library-outline" size={24} color="#ffffff" style={styles.actionIcon} />
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, styles.actionTitleWhite]}>{t("profile.manageMaterials")}</Text>
              <Text style={[styles.actionSubtitle, styles.actionSubtitleWhite]}>
                {t("profile.manageMaterialsText")}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.8)" style={styles.actionArrow} />
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={[styles.actionButton, styles.actionButtonDanger]}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={24} color="#ffffff" style={styles.actionIcon} />
        <View style={styles.actionContent}>
          <Text style={[styles.actionTitle, styles.actionTitleWhite]}>{t("profile.logout")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.8)" style={styles.actionArrow} />
      </TouchableOpacity>
    </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AdminProfile
