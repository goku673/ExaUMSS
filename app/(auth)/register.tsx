import React from "react";
import RegisterScreen from "@/components/ui/RegisterScreen";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

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
      <RegisterScreen />
    </PaperProvider>
  )
  
}