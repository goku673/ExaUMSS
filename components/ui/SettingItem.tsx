// SettingItem.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

interface SettingItemProps {
  title: string;
  onPress: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, onPress }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
  },
});

export default SettingItem;