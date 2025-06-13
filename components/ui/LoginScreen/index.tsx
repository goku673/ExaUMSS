import type React from "react"
import { useState, useEffect } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
} from "react-native"
import Text from "../Text"
import { router } from "expo-router"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"
import { login } from "@/firebase/firebaseServices"
import { useUser } from "@/context/UserContext"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase/firebaseServices"
import { Ionicons } from "@expo/vector-icons"
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser"
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth"
import { resetPassword } from "@/firebase/firebaseServices"

WebBrowser.maybeCompleteAuthSession()

const androidClientId = "8766145957-e450t3cme490tunubst9ihflpi3r3qg8.apps.googleusercontent.com"

const LoginScreen: React.FC = () => {
  const { setUser } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
  })

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (response?.type === "success") {
        setLoading(true)
        try {
          const { id_token } = response.params
          const auth = getAuth()
          const credential = GoogleAuthProvider.credential(id_token)
          const userCredential = await signInWithCredential(auth, credential)

          const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))
          let extraData = {}
          if (userDoc.exists()) {
            extraData = userDoc.data()
          }
          setUser({ ...userCredential.user, ...extraData })
          router.push("/(tabs)/landing")
        } catch (error) {
          Alert.alert(t("login.error"), t("login.googleLoginError"), [{ text: t("common.ok") }])
        } finally {
          setLoading(false)
        }
      }
    }
    signInWithGoogle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t("login.error"), t("login.allFieldsRequired"), [{ text: t("common.ok") }])
      return
    }

    setLoading(true)
    try {
      const userData = await login(email, password)
      const userDoc = await getDoc(doc(db, "users", userData.uid))
      let extraData = {}
      if (userDoc.exists()) {
        extraData = userDoc.data()
      }
      setUser({ ...userData, ...extraData })
      router.push("/(tabs)/landing")
    } catch (error: any) {
      let errorMessage = t("login.generalError")
      if (error.code === "auth/invalid-email") {
        errorMessage = t("login.invalidEmail")
      } else if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errorMessage = t("login.invalidCredentials")
      }
      Alert.alert(t("login.error"), errorMessage, [{ text: t("common.ok") }])
    } finally {
      setLoading(false)
    }
  }

const handleForgotPassword = async () => {
  if (!email) {
    Alert.alert(
      t("login.error"),
      "Por favor ingresa tu correo electrónico para restablecer tu contraseña.",
      [{ text: t("common.ok") }]
    );
    return;
  }
  try {
    await resetPassword(email);
    Alert.alert(
      "Correo enviado",
      "Te hemos enviado un correo para restablecer tu contraseña.",
      [{ text: t("common.ok") }]
    );
  } catch (error) {
    Alert.alert(
      t("login.error"),
      "No se pudo enviar el correo de restablecimiento. Verifica tu correo.",
      [{ text: t("common.ok") }]
    );
  }
};
  const handleCreateAccount = () => {
    router.push("/(auth)/register")
  }

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    headerContainer: {
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 24,
    },
    logo: {
      width: 80,
      height: 0,
      borderRadius: 20,
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
      marginTop: 8,
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
    forgotPasswordContainer: {
      alignItems: "flex-end",
      marginBottom: 24,
    },
    forgotPassword: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "600",
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      alignItems: "center",
    },
    loginButtonDisabled: {
      backgroundColor: colors.secondaryText,
      opacity: 0.6,
    },
    loginButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 24,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      color: colors.secondaryText,
      paddingHorizontal: 16,
      fontSize: 14,
    },
    googleButton: {
      backgroundColor: "#ffffff",
      borderRadius: 16,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    googleButtonText: {
      color: "#333333",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 12,
    },
    googleIcon: {
      width: 20,
      height: 20,
    },
    footerContainer: {
      paddingHorizontal: 24,
      paddingBottom: 32,
      alignItems: "center",
    },
    createAccount: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
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
        <View style={dynamicStyles.headerContainer}>
          <View style={dynamicStyles.logoContainer}>
            <Image source={{ uri: "https://placeholder.svg?height=80&width=80" }} style={dynamicStyles.logo} />
          </View>
          <Text style={dynamicStyles.headerTitle}>{t("login.welcomeMessage")}</Text>
          <Text style={dynamicStyles.headerSubtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={dynamicStyles.formContainer}>
          {/* Email */}
          <View style={dynamicStyles.inputContainer}>
            <Text style={dynamicStyles.label}>{t("login.email")}</Text>
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
            <Text style={dynamicStyles.label}>{t("login.password")}</Text>
            <View style={dynamicStyles.inputWrapper}>
              <TextInput
                style={[dynamicStyles.input, focusedField === "password" && dynamicStyles.inputFocused]}
                onChangeText={setPassword}
                value={password}
                placeholder="Ingresa tu contraseña"
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

          {/* <TouchableOpacity
            style={dynamicStyles.forgotPasswordContainer}
            onPress={handleForgotPassword}
            disabled={loading}
          >
            <Text style={dynamicStyles.forgotPassword}>{t("login.forgotPassword")}</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[dynamicStyles.loginButton, loading && dynamicStyles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={dynamicStyles.loginButtonText}>{loading ? "Iniciando sesión..." : t("login.login")}</Text>
          </TouchableOpacity>

          <View style={dynamicStyles.dividerContainer}>
            <View style={dynamicStyles.divider} />
            <Text style={dynamicStyles.dividerText}>O</Text>
            <View style={dynamicStyles.divider} />
          </View>

          <TouchableOpacity
            style={dynamicStyles.googleButton}
            onPress={() => promptAsync()}
            disabled={!request || loading}
            activeOpacity={0.8}
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
              }}
              style={dynamicStyles.googleIcon}
            />
            <Text style={dynamicStyles.googleButtonText}>{t("login.loginWithGoogle")}</Text>
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.footerContainer}>
          <TouchableOpacity onPress={handleCreateAccount} disabled={loading}>
            <Text style={dynamicStyles.createAccount}>{t("login.noAccount")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
