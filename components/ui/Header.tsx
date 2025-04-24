import React from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import IconButton from "./IconButton";

const Header: React.FC = () => (
  <View style={styles.container}>
    <Link href="/adminProfile" asChild>
      <IconButton icon="account" onPress={() => {}} />
    </Link>
    <IconButton icon="magnify" onPress={() => console.log("Search pressed")} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
});

export default Header;