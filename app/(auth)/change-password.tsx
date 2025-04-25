import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Form from "@/components/ui/Form";
import FormHeader from "@/components/ui/FormHeader";
import FormContent from "@/components/ui/FormContent";
import FormFooter from "@/components/ui/FormFooter";
import FormInputs from "@/components/ui/FormInputs";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";

const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Password changed successfully");
  };

  const inputFields = [
    {
      label: "Current Password",
      value: currentPassword,
      onChangeText: setCurrentPassword,
      secureTextEntry: true,
      icon: "lock",
    },
    {
      label: "New Password",
      value: newPassword,
      onChangeText: setNewPassword,
      secureTextEntry: true,
      icon: "lock",
    },
    {
      label: "Confirm New Password",
      value: confirmPassword,
      onChangeText: setConfirmPassword,
      secureTextEntry: true,
      icon: "lock",
    },
  ];

  return (
    <Form>
      <FormHeader>
        <Text style={styles.headerTitle}>Cambiar contraseña</Text>
      </FormHeader>

      <FormContent>
        <FormInputs inputs={inputFields} />
      </FormContent>
      <FormFooter>
        <Button
          label="Change Password"
          onPress={handleChangePassword}
          style={styles.button}
        />
      </FormFooter>
    </Form>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default ChangePasswordScreen;