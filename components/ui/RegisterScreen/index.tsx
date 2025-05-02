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
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

const RegisterScreen: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();

  const handleRegister = () => {
    console.log("Register attempt with:", { firstName, lastName, email, password });
  };

  const handleBack = () => {
    router.push("/(auth)/login");
  };

  const dynamicStyles = StyleSheet.create({
    headerTitle: {
      fontSize: 36,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 20,
    },
    backToLogin: {
      color: colors.secondaryText,
      fontSize: 16,
      textDecorationLine: "underline",
      marginTop: 16,
      textAlign: "center",
    },
    registerButton: {
      marginTop: 16,
    },
    backButtonContainer: {
      alignItems: "flex-end",
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 6,
    }
  });

  const inputFields = [
    { label: t("register.name"), value: firstName, onChangeText: setFirstName, icon: "account" },
    { label: t("register.apellido"), value: lastName, onChangeText: setLastName, icon: "account" },
    { label: t("register.email"), value: email, onChangeText: setEmail, icon: "email" },
    {
      label: t("register.email"),
      value: password,
      onChangeText: setPassword,
      secureTextEntry: secureTextEntry,
      icon: "lock",
    },
  ];

  return (
    <Form>
      <View style={dynamicStyles.backButtonContainer}>
        <IconButton icon="arrow-left" onPress={handleBack} />
      </View>
      <FormHeader>
        <Text style={dynamicStyles.headerTitle}>{t("register.createAccount")}</Text>
      </FormHeader>
      <FormContent>
        <FormInputs inputs={inputFields} />
      </FormContent>
      <FormFooter>
        <Button 
          label={t("register.createAccount")} 
          onPress={handleRegister} 
          style={dynamicStyles.registerButton} 
        />
        <TouchableOpacity onPress={handleBack}>
          <Text style={dynamicStyles.backToLogin}>{t("register.alreadyHaveAccount")}</Text>
        </TouchableOpacity>
      </FormFooter>
    </Form>
  );
};

export default RegisterScreen;