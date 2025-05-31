import type React from "react"
import { useState } from "react"
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import Text from "../Text"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"
import { useUser } from "@/context/UserContext"
import { updateUserProfile } from "@/firebase/firebaseServices"
import type { KeyboardTypeOptions } from "react-native";

const EditProfile: React.FC = () => {
  const router = useRouter()
  const { user, setUser } = useUser()
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  if (!user) {
    router.replace("/(auth)/login")
    return null
  }

  const joinedDate = user?.joinedDate || ""

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert(t("editProfile.error"), "El nombre es requerido", [{ text: t("common.ok") }])
      return
    }

    setLoading(true)
    try {
      await updateUserProfile(user.uid, {
        name,
        gender,
        age,
      })

      setUser({
        ...user,
        displayName: name,
        gender,
        age,
      })

      Alert.alert(t("editProfile.success"), t("editProfile.profileUpdated"), [
        { text: t("common.ok"), onPress: () => router.back() },
      ])
    } catch (error) {
      Alert.alert(t("editProfile.error"), t("editProfile.updateFailed"), [{ text: t("common.ok") }])
      console.error("Error al actualizar perfil:", error)
    } finally {
      setLoading(false)
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
    formContainer: {
      paddingHorizontal: 20,
      paddingTop: 24,
    },
    formCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },
    formTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputWrapper: {
      position: "relative",
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
      paddingRight: 50,
      minHeight: 56,
    },
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    inputDisabled: {
      backgroundColor: colors.border,
      opacity: 0.6,
    },
    inputIcon: {
      position: "absolute",
      right: 16,
      top: 18,
    },
    saveButtonContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      alignItems: "center",
    },
    saveButtonDisabled: {
      backgroundColor: colors.secondaryText,
      opacity: 0.6,
    },
    saveButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },
    infoCard: {
      backgroundColor: colors.primary + "15",
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.primary + "30",
    },
    infoText: {
      fontSize: 14,
      color: colors.primary,
      textAlign: "center",
      lineHeight: 20,
    },
  })

  const inputFields: {
  key: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon: string;
  editable: boolean;
  keyboardType?: KeyboardTypeOptions;
}[] = [
    {
      key: "name",
      label: t("editProfile.name"),
      value: name,
      onChangeText: setName,
      placeholder: t("editProfile.namePlaceholder"),
      icon: "person-outline",
      editable: true,
    },
    {
      key: "gender",
      label: t("editProfile.gender"),
      value: gender,
      onChangeText: setGender,
      placeholder: t("editProfile.genderPlaceholder"),
      icon: "male-female-outline",
      editable: true,
    },
    {
      key: "age",
      label: t("editProfile.age"),
      value: age,
      onChangeText: setAge,
      placeholder: t("editProfile.agePlaceholder"),
      icon: "calendar-outline",
      keyboardType: "numeric",
      editable: true,
    },
    {
      key: "joinedDate",
      label: t("editProfile.joinedDate"),
      value: joinedDate,
      onChangeText: () => {},
      placeholder: t("editProfile.joinedDatePlaceholder"),
      icon: "time-outline",
      editable: false,
    },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("editProfile.title")}</Text>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* Info Card */}
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                Actualiza tu información personal. Los cambios se guardarán en tu perfil.
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>
                <Ionicons name="create-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                Información Personal
              </Text>

              {inputFields.map((field) => (
                <View key={field.key} style={styles.inputContainer}>
                  <Text style={styles.label}>{field.label}</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        focusedField === field.key && styles.inputFocused,
                        !field.editable && styles.inputDisabled,
                      ]}
                      value={field.value}
                      onChangeText={field.onChangeText}
                      placeholder={field.placeholder}
                      placeholderTextColor={colors.secondaryText}
                      {...(field.keyboardType ? { keyboardType: field.keyboardType } : {})}
                      editable={field.editable && !loading}
                      onFocus={() => setFocusedField(field.key)}
                      onBlur={() => setFocusedField(null)}
                      autoCapitalize={field.key === "name" ? "words" : "none"}
                    />
                    <View style={styles.inputIcon}>
                      <Ionicons
                        name={field.icon as any}
                        size={20}
                        color={!field.editable ? colors.secondaryText : colors.secondaryText}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity
              style={[styles.saveButton, loading && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>{loading ? "Guardando..." : t("editProfile.saveButton")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default EditProfile
