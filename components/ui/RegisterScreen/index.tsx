import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Form from "../Form";
import FormHeader from "../FormHeader";
import FormContent from "../FormContent";
import FormFooter from "../FormFooter";
import FormInputs from "../FormInputs";
import Button from "../Button";
import Text from "../Text";
import IconButton from "../IconButton";
import { router } from "expo-router";

const RegisterScreen: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleRegister = () => {
    console.log("Register attempt with:", { firstName, lastName, email, password });
  };

  const handleBack = () => {
    router.push("/(auth)/login");
  };

  const inputFields = [
    { label: "First name", value: firstName, onChangeText: setFirstName, icon: "account" },
    { label: "Last name", value: lastName, onChangeText: setLastName, icon: "account" },
    { label: "Email", value: email, onChangeText: setEmail, icon: "email" },
    {
      label: "Password",
      value: password,
      onChangeText: setPassword,
      secureTextEntry: secureTextEntry,
      icon: "lock",
    },
  ];

  return (
    <Form>
      <View style={styles.backButtonContainer}>
        <IconButton icon="arrow-left" onPress={handleBack} />
      </View>
      <FormHeader>
        <Text style={styles.headerTitle}>Sign up</Text>
      </FormHeader>
      <FormContent>
        <FormInputs inputs={inputFields} />
      </FormContent>
      <FormFooter>
        <Button 
          label="Create account" 
          onPress={handleRegister} 
          style={styles.registerButton} 
        />
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backToLogin}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </FormFooter>
    </Form>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  registerButton: {
    marginTop: 16,
  },
  backToLogin: {
    color: "#666",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 16,
    textAlign: "center",
  },
  backButtonContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  }
});

export default RegisterScreen;