import React from "react";
import { View, StyleSheet } from "react-native";
import AdminProfile from "@/components/ui/adminProfile";
import { useTheme } from "@/components/ui/ThemeContext";

export default function ProfileScreen() {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme === "Oscuro" ? "#121212" : "#FFF" }]}>
      <AdminProfile/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});