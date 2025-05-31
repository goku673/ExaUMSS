"use client"

import type React from "react"
import { useState } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native"
import Text from "../Text"
import { router } from "expo-router"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"
import { register } from "@/firebase/firebaseServices"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase/firebaseServices"
import { Ionicons } from "@expo/vector-icons"

const RegisterScreen: React.FC = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [gender, setGender] = useState("")
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [secureConfirmEntry, setSecureConfirmEntry] = useState(true)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  const handleRegister = async () => {
    console.log("handleRegister ejecutado")

    // Validaciones
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert(t("register.error"), t("register.allFieldsRequired"), [{ text: t("common.ok") }])
      return
    }

    if (password !== confirmPassword) {
      Alert.alert(t("register.error"), "Las contraseñas no coinciden", [{ text: t("common.ok") }])
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert(t("register.error"), t("register.invalidEmail"), [{ text: t("common.ok") }])
      return
    }

    if (password.length < 6) {
      Alert.alert(t("register.error"), t("register.passwordTooShort"), [{ text: t("common.ok") }])
      return
    }

    setLoading(true)
    try {
      const user = await register(email, password)

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        gender,
        isAdmin: false,
        joinedDate: new Date().toISOString(),
        profileImage: "",
      })

      Alert.alert(t("register.success"), t("register.accountCreated"), [
        {
          text: t("common.ok"),
          onPress: () => {
            console.log("Redirigiendo a login")
            router.push("/(auth)/login")
          },
        },
      ])
    } catch (error: any) {
      let errorMessage = t("register.generalError")

      if (error.code === "auth/email-already-in-use") {
        errorMessage = t("register.emailInUse")
      } else if (error.code === "auth/invalid-email") {
        errorMessage = t("register.invalidEmail")
      } else if (error.code === "auth/weak-password") {
        errorMessage = t("register.weakPassword")
      }

      Alert.alert(t("register.error"), errorMessage, [{ text: t("common.ok") }])
      console.error("Error en registro:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/(auth)/login")
  }

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    headerContainer: {
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    backButtonContainer: {
      position: "absolute",
      top: 20,
      left: 20,
      zIndex: 10,
    },
    backButton: {
      backgroundColor: colors.cardBackground,
      borderRadius: 24,
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
      marginTop: 40,
      marginBottom: 8,
      textAlign: "center",
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
      marginBottom: 32,
    },
    formContainer: {
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      backgroundColor: colors.cardBackground,
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
    inputIcon: {
      position: "absolute",
      right: 16,
      top: 18,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
      marginLeft: 4,
    },
    passwordToggle: {
      position: "absolute",
      right: 16,
      top: 18,
      padding: 4,
    },
    registerButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 16,
      marginTop: 24,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    registerButtonDisabled: {
      backgroundColor: colors.secondaryText,
      opacity: 0.6,
    },
    registerButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },
    backToLogin: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      marginTop: 16,
    },
    footerContainer: {
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
  })

  return (
    <KeyboardAvoidingView style={dynamicStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        style={dynamicStyles.container}
        contentContainerStyle={dynamicStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={dynamicStyles.backButtonContainer}>
          <TouchableOpacity style={dynamicStyles.backButton} onPress={handleBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.headerContainer}>
          <Text style={dynamicStyles.headerTitle}>{t("register.createAccount")}</Text>
          <Text style={dynamicStyles.headerSubtitle}>Completa los datos para crear tu cuenta</Text>
        </View>

        <View style={dynamicStyles.formContainer}>
          {/* Nombre */}
          <View style={dynamicStyles.inputContainer}>
            <Text style={dynamicStyles.label}>{t("register.name")}</Text>
            <View style={dynamicStyles.inputWrapper}>
              <TextInput
                style={[dynamicStyles.input, focusedField === "firstName" && dynamicStyles.inputFocused]}
                onChangeText={setFirstName}
                value={firstName}
                placeholder="Ingresa tu nombre"
                placeholderTextColor={colors.secondaryText}
                onFocus={() => setFocusedField("firstName")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="words"
                editable={!loading}
              />
              <View style={dynamicStyles.inputIcon}>
                <Ionicons name="person-outline" size={20} color={colors.secondaryText} />
              </View>
            </View>
          </View>

          {/* Apellido */}
          <View style={dynamicStyles.inputContainer}>
            <Text style={dynamicStyles.label}>{t("register.apellido")}</Text>
            <View style={dynamicStyles.inputWrapper}>
              <TextInput
                style={[dynamicStyles.input, focusedField === "lastName" && dynamicStyles.inputFocused]}
                onChangeText={setLastName}
                value={lastName}
                placeholder="Ingresa tu apellido"
                placeholderTextColor={colors.secondaryText}
                onFocus={() => setFocusedField("lastName")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="words"
                editable={!loading}
              />
              <View style={dynamicStyles.inputIcon}>
                <Ionicons name="person-outline" size={20} color={colors.secondaryText} />
              </View>
            </View>
          </View>

          {/* Email */}
          <View style={dynamicStyles.inputContainer}>
            <Text style={dynamicStyles.label}>{t("register.email")}</Text>
            <View style={dynamicStyles.inputWrapper}>
              <TextInput
                style={[dynamicStyles.input, focusedField === "email" && dynamicStyles.inputFocused]}
                onChangeText={setEmail}
                value={email}
                placeholder="ejemplo@correo.com"
                placeholderTextColor={colors.secondaryText}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                editable={!loading}
              />
              <View style={dynamicStyles.inputIcon}>
                <Ionicons name="mail-outline" size={20} color={colors.secondaryText} />
              </View>
            </View>
          </View>

          {/* Contraseña */}
          <View style={dynamicStyles.inputContainer}>
            <Text style={dynamicStyles.label}>{t("register.password")}</Text>
            <View style={dynamicStyles.inputWrapper}>
              <TextInput
                style={[dynamicStyles.input, focusedField === "password" && dynamicStyles.inputFocused]}
                onChangeText={setPassword}
                value={password}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={colors.secondaryText}
                secureTextEntry={secureTextEntry}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <TouchableOpacity
                style={dynamicStyles.passwordToggle}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.secondaryText}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirmar Contraseña */}
          <View style={dynamicStyles.inputContainer}>
            <Text style={dynamicStyles.label}>Confirmar contraseña</Text>
            <View style={dynamicStyles.inputWrapper}>
              <TextInput
                style={[dynamicStyles.input, focusedField === "confirmPassword" && dynamicStyles.inputFocused]}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Repite tu contraseña"
                placeholderTextColor={colors.secondaryText}
                secureTextEntry={secureConfirmEntry}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <TouchableOpacity
                style={dynamicStyles.passwordToggle}
                onPress={() => setSecureConfirmEntry(!secureConfirmEntry)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={secureConfirmEntry ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.secondaryText}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[dynamicStyles.registerButton, loading && dynamicStyles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={dynamicStyles.registerButtonText}>
              {loading ? "Creando cuenta..." : t("register.createAccount")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.footerContainer}>
          <TouchableOpacity onPress={handleBack} disabled={loading}>
            <Text style={dynamicStyles.backToLogin}>{t("register.alreadyHaveAccount")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
