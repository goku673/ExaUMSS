import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "./Text";

interface SettingItemProps {
  title: string;
  description?: string;
  onPress: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={styles.textContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      {description && <Text style={styles.itemDescription}>{description}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={20} color="#000" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default SettingItem;