import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

interface ButtonProps {
  label: string;
  onPress: () => void;
  mode?: "text" | "outlined" | "contained";
  style?: object;
}

const Button: React.FC<ButtonProps> = ({ label, onPress, mode = "contained", style }) => (
    <PaperButton mode={mode} onPress={onPress} style={[styles.button, style]}>
      {label}
    </PaperButton>
  );



export default Button;

const styles = StyleSheet.create({
    button: {
      borderRadius: 8,
      paddingVertical: 8,
    },
  });