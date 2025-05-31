import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SettingsComponent from "@/components/ui/Setting";

export default function SettingsScreen() {
  return <SettingsComponent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});