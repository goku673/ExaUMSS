import type React from "react"
import { useState } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native"
import Text from "@/components/ui/Text"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"
import { changeUserPassword } from "@/firebase/firebaseServices"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [error, setError] = useState("")
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()
  const router = useRouter()

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(t("Change-password.llenaloscampos"))
      return
    }

    if (newPassword !== confirmPassword) {
      setError(t("Change-password.contraseñaCorta"))
      return
    }

    if (newPassword.length < 8) {
      setError(t("Change-password.cambioContraseña"))
      return
    }

    setError("")
    setLoading(true)

    try {
      await changeUserPassword(currentPassword, newPassword)

      Alert.alert("Éxito", t("Change-password.success"), [
        {
          text: "OK",
          onPress: () => {
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            router.back()
          },
        },
      ])
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        setError(t("Change-password.invalidCurrentPassword"))
      } else if (error.code === "auth/weak-password") {
        setError(t("Change-password.weakPassword"))
      } else {
        setError(t("Change-password.errorGeneric"))
      }
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
    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: 24,
    },
    titleCard: {
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
      alignItems: "center",
    },
    titleIcon: {
      backgroundColor: colors.primary + "20",
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
      lineHeight: 24,
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
      paddingRight: 100,
      minHeight: 56,
    },
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    inputError: {
      borderColor: "#ef4444",
      borderWidth: 2,
    },
    inputIcon: {
      position: "absolute",
      left: 16,
      top: 18,
    },
    passwordToggle: {
      position: "absolute",
      right: 16,
      top: 18,
      padding: 4,
    },
    errorContainer: {
      backgroundColor: "#ef444415",
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#ef444430",
    },
    errorText: {
      color: "#ef4444",
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
    },
    passwordRequirements: {
      backgroundColor: colors.primary + "15",
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.primary + "30",
    },
    requirementTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primary,
      marginBottom: 8,
    },
    requirement: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    requirementText: {
      fontSize: 12,
      color: colors.primary,
      marginLeft: 8,
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    changeButton: {
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
    changeButtonDisabled: {
      backgroundColor: colors.secondaryText,
      opacity: 0.6,
    },
    changeButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },
  })

  const inputFields = [
    {
      key: "current",
      label: t("Change-password.contraseñaActual"),
      value: currentPassword,
      onChangeText: setCurrentPassword,
      placeholder: "Ingresa tu contraseña actual",
      showPassword: showCurrentPassword,
      setShowPassword: setShowCurrentPassword,
    },
    {
      key: "new",
      label: t("Change-password.nuevaContraseña"),
      value: newPassword,
      onChangeText: setNewPassword,
      placeholder: "Mínimo 8 caracteres",
      showPassword: showNewPassword,
      setShowPassword: setShowNewPassword,
    },
    {
      key: "confirm",
      label: t("Change-password.confirmarContraseña"),
      value: confirmPassword,
      onChangeText: setConfirmPassword,
      placeholder: "Repite la nueva contraseña",
      showPassword: showConfirmPassword,
      setShowPassword: setShowConfirmPassword,
    },
  ]

  const passwordRequirements = [
    { text: "Mínimo 8 caracteres", met: newPassword.length >= 8 },
    { text: "Al menos una letra mayúscula", met: /[A-Z]/.test(newPassword) },
    { text: "Al menos una letra minúscula", met: /[a-z]/.test(newPassword) },
    { text: "Al menos un número", met: /\d/.test(newPassword) },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cambiar Contraseña</Text>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            {/* Title Card */}
            <View style={styles.titleCard}>
              <View style={styles.titleIcon}>
                <Ionicons name="shield-checkmark" size={30} color={colors.primary} />
              </View>
              <Text style={styles.title}>{t("Change-password.buttonChangePasword")}</Text>
              <Text style={styles.subtitle}>
                Actualiza tu contraseña para mantener tu cuenta segura. Asegúrate de usar una contraseña fuerte.
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                Información de Seguridad
              </Text>

              {inputFields.map((field) => (
                <View key={field.key} style={styles.inputContainer}>
                  <Text style={styles.label}>{field.label}</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        focusedField === field.key && styles.inputFocused,
                        error && styles.inputError,
                      ]}
                      value={field.value}
                      onChangeText={(text) => {
                        field.onChangeText(text)
                        setError("")
                      }}
                      placeholder={field.placeholder}
                      placeholderTextColor={colors.secondaryText}
                      secureTextEntry={!field.showPassword}
                      onFocus={() => setFocusedField(field.key)}
                      onBlur={() => setFocusedField(null)}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                    />
                    <TouchableOpacity
                      style={styles.passwordToggle}
                      onPress={() => field.setShowPassword(!field.showPassword)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={field.showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={colors.secondaryText}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Password Requirements */}
              {newPassword.length > 0 && (
                <View style={styles.passwordRequirements}>
                  <Text style={styles.requirementTitle}>Requisitos de contraseña:</Text>
                  {passwordRequirements.map((req, index) => (
                    <View key={index} style={styles.requirement}>
                      <Ionicons
                        name={req.met ? "checkmark-circle" : "ellipse-outline"}
                        size={16}
                        color={req.met ? "#10b981" : colors.primary}
                      />
                      <Text style={[styles.requirementText, { color: req.met ? "#10b981" : colors.primary }]}>
                        {req.text}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Error Message */}
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Change Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.changeButton, loading && styles.changeButtonDisabled]}
              onPress={handleChangePassword}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.changeButtonText}>
                {loading ? "Cambiando contraseña..." : t("Change-password.buttonChangePasword")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen