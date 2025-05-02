import React from "react";
import Modal from "@/components/ui/Modal";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/components/ui/ThemeContext";
import { useTranslation } from "react-i18next";

interface SelectorModalProps {
  visible: boolean;
  title: string;
  options: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
  translateOption?: (option: string) => string;
}

const SelectorModal: React.FC<SelectorModalProps> = ({
  visible,
  title,
  options,
  onSelect,
  onClose,
  translateOption,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const backgroundColor = theme === "Oscuro" ? "#333" : "#fff";
  const textColor = theme === "Oscuro" ? "#fff" : "#000";

  return (
    <Modal visible={visible} onDismiss={onClose}>
      <View style={[styles.modalContent, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        {options.map((option, index) => (
          <TouchableOpacity key={index} onPress={() => onSelect(option)}>
            <Text style={[styles.option, { color: textColor }]}>
              {translateOption ? translateOption(option) : option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default SelectorModal;