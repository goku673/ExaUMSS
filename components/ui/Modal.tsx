import React from "react";
import { Modal as RNModal, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import Text from "@/components/ui/Text";
import { StyleProp, ViewStyle } from "react-native";

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  title?: string;
  animationType?: "none" | "slide" | "fade";
  contentStyle?: StyleProp<ViewStyle>;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  children,
  title,
  animationType = "fade",
  contentStyle,
}) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.background || "rgba(0,0,0,0.6)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "85%",
      maxWidth: 400,
      borderRadius: 12,
      padding: 24,
      backgroundColor: colors.cardBackground,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 16,
      color: colors.text,
      textAlign: "center",
    },
    closeButton: {
      position: "absolute",
      top: 16,
      right: 16,
      zIndex: 1,
    },
  });

  return (
    <RNModal
      transparent
      visible={visible}
      animationType={animationType}
      onRequestClose={onDismiss}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onDismiss}
      >
        <View 
          style={[styles.modalContent, contentStyle]}
          onStartShouldSetResponder={() => true}
        >
          {title && <Text style={styles.title}>{title}</Text>}
          {children}
        </View>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Modal;