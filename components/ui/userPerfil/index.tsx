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
    router.push("/landing");
    
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
    },
    {
      label: "Password",
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
    },
  ]

  return (
    <Form>
  
      <FormHeader>
        <Text style={styles.headerTitle}>Welcome back</Text>
      </FormHeader>

      <FormContent>
        <FormInputs inputs={inputFields} />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <Button label="Log in" onPress={handleLogin} style={styles.loginButton} />
      </FormContent>

      <FormFooter>
        <TouchableOpacity onPress={handleCreateAccount} >
          <Text style={styles.createAccount}>Don't have an account?</Text>
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
  },
  forgotPassword: {
    color: "#666666",
    fontSize: 16,
    textDecorationLine: "underline",
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#FF0000",
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
