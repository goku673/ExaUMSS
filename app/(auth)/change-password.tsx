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
      color: colors.primary,
      fontSize: 14,
      marginTop: 4,
      marginLeft: 12,
    }
  });

  const [error, setError] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(t("change-password.fillAllFields"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("change-password.passwordsDontMatch"));
      return;
    }

    if (newPassword.length < 8) {
      setError(t("change-password.passwordTooShort"));
      return;
    }

    setError("");
    console.log("Password changed successfully");
    // Add your password change logic here
  };

  const baseInputProps = {
    secureTextEntry: true,
    icon: "lock",
    containerStyle: styles.inputContainer,
    labelStyle: { color: colors.text },
    iconColor: colors.icon,
    inputStyle: styles.inputBackground,
    textColor: colors.text,
    placeholderTextColor: colors.placeholder
  };

  const inputFields = [
    {
      ...baseInputProps,
      label: t("change-password.currentPassword"),
      value: currentPassword,
      onChangeText: (text: string) => {
        setCurrentPassword(text);
        setError("");
      }
    },
    {
      ...baseInputProps,
      label: t("change-password.newPassword"),
      value: newPassword,
      onChangeText: (text: string) => {
        setNewPassword(text);
        setError("");
      }
    },
    {
      ...baseInputProps,
      label: t("change-password.confirmPassword"),
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
          {t('change-password.changePassword')}
        </Text>
      </FormHeader>

      <FormContent>
        <FormInputs inputs={inputFields} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </FormContent>

      <FormFooter>
        <Button
          label={t('change-password.changeButton')}
          onPress={handleChangePassword}
          style={[styles.button, { backgroundColor: colors.primary }]}
          labelStyle={{ color: colors.buttonText }}
        />
      </FormFooter>
    </Form>
  );
};
export default ChangePasswordScreen;