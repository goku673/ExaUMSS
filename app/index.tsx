import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import RotatingCube from "@/components/ui/RotatingCube";
import { Redirect } from "expo-router";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    
    return (
      <View style={styles.container}>
        <RotatingCube />
      </View>
    );
  }

  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});