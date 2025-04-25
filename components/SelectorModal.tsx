import React from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "./ui/Text";
interface SelectorModalProps {
  visible: boolean;
  title: string;
  options: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
}

const SelectorModal: React.FC<SelectorModalProps> = ({
  visible,
  title,
  options,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.modalOption}
              onPress={() => onSelect(option)}
            >
              <Text style={styles.modalOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Text style={styles.modalCloseText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalOption: {
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#000",
  },
  modalClose: {
    marginTop: 16,
  },
  modalCloseText: {
    fontSize: 16,
    color: "#007BFF",
  },
});

export default SelectorModal;