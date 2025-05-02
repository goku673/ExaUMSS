import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Form from "@/components/ui/Form";
import FormHeader from "@/components/ui/FormHeader";
import FormContent from "@/components/ui/FormContent";
import FormFooter from "@/components/ui/FormFooter";
import FormInputs from "@/components/ui/FormInputs";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 80,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 24,
      color: colors.text,
    },
    button: {
      marginTop: 24,
      borderRadius: 12,
      paddingVertical: 14,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputBackground: {
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    errorText: {
      color: colors.text,
      fontSize: 14,
      marginTop: 4,
      marginLeft: 12,
    },
    labelStyle: { 
      color: colors.text,
      fontSize: 16,
      fontWeight: "600"
    },
  });

  const [error, setError] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(t("Change-password.llenaloscampos"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("Change-password.contraseñaCorta"));
      return;
    }

    if (newPassword.length < 8) {
      setError(t("Change-password.cambioContraseña"));
      return;
    }

    setError("");
    console.log("Password changed successfully");
  };

  const baseInputProps = {
    secureTextEntry: true,
    icon: "lock",
    containerStyle: styles.inputContainer,
    labelStyle: { color: colors.text },
    iconColor: colors.icon,
    inputStyle: styles.inputBackground,
    textColor: colors.subtitle,
    placeholderTextColor: colors.placeholder
  };

  const inputFields = [
    {
      ...baseInputProps,
      label: t("Change-password.contraseñaActual"),
      value: currentPassword,
      onChangeText: (text: string) => {
        setCurrentPassword(text);
        setError("");
      }
    },
    {
      ...baseInputProps,
      label: t("Change-password.nuevaContraseña"),
      value: newPassword,
      onChangeText: (text: string) => {
        setNewPassword(text);
        setError("");
      }
    },
    {
      ...baseInputProps,
      label: t("Change-password.confirmarContraseña"),
      value: confirmPassword,
      onChangeText: (text: string) => {
        setConfirmPassword(text);
        setError("");
      }
    }
  ];

  return (
    <Form style={styles.container}>
      <FormHeader>
        <Text style={styles.headerTitle}>
          {t('Change-password.buttonChangePasword')}
        </Text>
      </FormHeader>

      <FormContent>
        <FormInputs inputs={inputFields} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </FormContent>

      <FormFooter>
        <Button
          label={t('Change-password.buttonChangePasword')}
          onPress={handleChangePassword}
          style={[styles.button, { backgroundColor: colors.primary }]}
          labelStyle={{ color: colors.text }}
        />
      </FormFooter>
    </Form>
  );
};
export default ChangePasswordScreen;