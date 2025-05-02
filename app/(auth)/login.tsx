import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import LoginScreen from "@/components/ui/LoginScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007BFF", 
    text: "#000000",
    background: "#FFFFFF",
    placeholder: "#666666",
  },
};

export default function Register() {
  return (
    <PaperProvider theme={theme}>
      <LoginScreen />
    </PaperProvider>
  );
}