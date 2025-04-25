import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EditProfile from "@/components/ui/editProfile";
import AdminProfile from "@/components/ui/adminProfile";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <AdminProfile/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});