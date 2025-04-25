import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface TitleProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const Title: React.FC<TitleProps> = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>; 
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 16,
  },
});

export default Title;