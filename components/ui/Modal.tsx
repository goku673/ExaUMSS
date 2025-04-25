import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Modal as PaperModal, Portal, Text, IconButton } from "react-native-paper";

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ visible, onDismiss, title, children }) => {
  

  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
                <View style={styles.header}>
                <IconButton
                    icon="close"
                    size={24}
                    onPress={onDismiss}
                    style={styles.closeIcon}
                />
                   
        </View>
        <ScrollView style={styles.scrollView}>{children}</ScrollView>
      </PaperModal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  closeIcon: {
    marginRight: 16, 
    borderRadius: 16,
    
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  
});

export default Modal;