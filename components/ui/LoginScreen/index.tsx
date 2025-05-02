"use client"

import type React from "react"
import { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Form from "../Form"
import FormHeader from "../FormHeader"
import FormContent from "../FormContent"
import FormFooter from "../FormFooter"
import FormInputs from "../FormInputs"
import Text from "../Text"
import Button from "../Button"
import IconButton from "../IconButton"
import { router } from "expo-router"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  const handleLogin = () => {
    router.push("/(tabs)/landing")
  }

  const handleForgotPassword = () => {
    console.log("Forgot password")
  }

  const handleCreateAccount = () => {
    router.push("/(auth)/register")
  }

  const handleBack = () => {
    console.log("Go back")
  }

  const dynamicStyles = StyleSheet.create({
    backButtonContainer: {
      alignItems: "flex-end",
      marginBottom: 10,
    },
    headerTitle: {
      fontSize: 36,
      fontWeight: "bold",
      color: colors.text,
      alignItems: "center",
    },
    forgotPassword: {
      color: colors.secondaryText,
      fontSize: 16,
      textDecorationLine: "underline",
      marginBottom: 24,
    },
    loginButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
    },
    createAccount: {
      color: colors.secondaryText,
      fontSize: 16,
      textDecorationLine: "underline",
      marginBottom: 8,
    },
  })

  const inputFields = [
    {
      label: t("login.username"),
      value: username,
      onChangeText: setUsername,
      secureTextEntry: false,
      icon: "account",
    },
    {
      label: t("login.password"),
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
      icon: "lock",
    },
  ]

  return (
    <Form>
      <FormHeader>
        <Text style={dynamicStyles.headerTitle}>{t("login.welcomeMessage")}</Text>
      </FormHeader>

      <FormContent>
        <FormInputs inputs={inputFields} />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={dynamicStyles.forgotPassword}>{t("login.forgotPassword")}</Text>
        </TouchableOpacity>

        <Button 
          label={t("login.login")} 
          onPress={handleLogin} 
          style={dynamicStyles.loginButton} 
        />
      </FormContent>

      <FormFooter>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={dynamicStyles.createAccount}>{t("login.noAccount")}</Text>
        </TouchableOpacity>
      </FormFooter>
    </Form>
  )
}

export default LoginScreen