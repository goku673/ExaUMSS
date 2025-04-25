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

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    router.push("/(tabs)/landing");
    
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

 
  const inputFields = [
    {
      label: "username",
      value: username,
      onChangeText: setUsername,
      secureTextEntry: false,
      icon: "account",
    },
    {
      label: "Password",
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
      icon: "lock",
    },
  ]

  return (
    <Form>
  
      <FormHeader>
        <Text style={styles.headerTitle}>Bienbenido a ExaUMSS</Text>
      </FormHeader>

      <FormContent>
        <FormInputs inputs={inputFields} />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Olvidaste tu correo?</Text>
        </TouchableOpacity>

        <Button label="Ingresar" onPress={handleLogin} style={styles.loginButton} />
      </FormContent>

      <FormFooter>
        <TouchableOpacity onPress={handleCreateAccount} >
          <Text style={styles.createAccount}>No tienes cuenta?</Text>
        </TouchableOpacity>
      </FormFooter>
    </Form>
  )
}

const styles = StyleSheet.create({
  backButtonContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000000",
    alignItems: "center",
  },
  forgotPassword: {
    color: "#666666",
    fontSize: 16,
    textDecorationLine: "underline",
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
  },
  createAccount: {
    color: "#666666",
    fontSize: 16,
    textDecorationLine: "underline",
    marginBottom: 8,
    
  },
})

export default LoginScreen
