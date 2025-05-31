import type React from "react"
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native"
import { Modal, Portal } from "react-native-paper"
import Text from "@/components/ui/Text"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"
import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect } from "react"

interface SelectorModalProps {
  visible: boolean
  title: string
  options: string[]
  onSelect: (option: string) => void
  onClose: () => void
  translateOption?: (option: string) => string
  selectedOption?: string
}

const { height: screenHeight, width: screenWidth } = Dimensions.get("window")

const SelectorModal: React.FC<SelectorModalProps> = ({
  visible,
  title,
  options,
  onSelect,
  onClose,
  translateOption,
  selectedOption,
}) => {
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  // Animaciones
  const [slideAnim] = useState(new Animated.Value(screenHeight))
  const [opacityAnim] = useState(new Animated.Value(0))
  const [scaleAnim] = useState(new Animated.Value(0.9))

  useEffect(() => {
    if (visible) {
      // Animación de apertura
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      // Reset animaciones
      slideAnim.setValue(screenHeight)
      opacityAnim.setValue(0)
      scaleAnim.setValue(0.9)
    }
  }, [visible])

  const handleClose = () => {
    // Animación de cierre
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose()
    })
  }

  const handleSelect = (option: string) => {
    onSelect(option)
    handleClose()
  }

  const styles = StyleSheet.create({
    modalWrapper: {
      flex: 1,
      justifyContent: "flex-end",
      margin: 0,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    backdropTouchable: {
      flex: 1,
    },
    modalContainer: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      maxHeight: screenHeight * 0.7,
      minHeight: screenHeight * 0.3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: -8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 20,
    },
    modalHandle: {
      width: 40,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      alignSelf: "center",
      marginTop: 12,
      marginBottom: 20,
    },
    modalHeader: {
      paddingHorizontal: 24,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerContent: {
      flex: 1,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
    },
    modalSubtitle: {
      fontSize: 14,
      color: colors.secondaryText,
      textAlign: "center",
      marginTop: 4,
    },
    closeButton: {
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    optionsContainer: {
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 32,
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    optionItemSelected: {
      backgroundColor: colors.primary + "15",
      borderColor: colors.primary,
      borderWidth: 2,
    },
    optionIcon: {
      backgroundColor: colors.primary + "20",
      borderRadius: 12,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    optionIconSelected: {
      backgroundColor: colors.primary,
    },
    optionContent: {
      flex: 1,
    },
    optionText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    optionTextSelected: {
      color: colors.primary,
    },
    optionDescription: {
      fontSize: 14,
      color: colors.secondaryText,
      marginTop: 2,
    },
    checkIcon: {
      marginLeft: 12,
    },
    emptyContainer: {
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.secondaryText,
      marginTop: 16,
    },
  })

  const getOptionIcon = (option: string) => {
    // Mapeo de iconos según el tipo de opción
    if (option.toLowerCase().includes("español") || option.toLowerCase().includes("spanish")) {
      return "language-outline"
    }
    if (option.toLowerCase().includes("inglés") || option.toLowerCase().includes("english")) {
      return "language-outline"
    }
    if (option.toLowerCase().includes("claro") || option.toLowerCase().includes("light")) {
      return "sunny-outline"
    }
    if (option.toLowerCase().includes("oscuro") || option.toLowerCase().includes("dark")) {
      return "moon-outline"
    }
    return "checkmark-circle-outline"
  }

  const getOptionDescription = (option: string) => {
    // Descripciones según el tipo de opción
    if (option.toLowerCase().includes("español") || option.toLowerCase().includes("spanish")) {
      return "Cambiar idioma a español"
    }
    if (option.toLowerCase().includes("inglés") || option.toLowerCase().includes("english")) {
      return "Change language to English"
    }
    if (option.toLowerCase().includes("claro") || option.toLowerCase().includes("light")) {
      return "Tema con colores claros"
    }
    if (option.toLowerCase().includes("oscuro") || option.toLowerCase().includes("dark")) {
      return "Tema con colores oscuros"
    }
    return "Seleccionar esta opción"
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleClose} contentContainerStyle={styles.modalWrapper}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: opacityAnim,
            },
          ]}
        >
          <TouchableOpacity style={styles.backdropTouchable} activeOpacity={1} onPress={handleClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.modalHandle} />

          <View style={styles.modalHeader}>
            <View style={styles.headerContent}>
              <Text style={styles.modalTitle}>{title}</Text>
              <Text style={styles.modalSubtitle}>Selecciona una opción</Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={handleClose} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            {options.length > 0 ? (
              options.map((option, index) => {
                const displayOption = translateOption ? translateOption(option) : option
                const isSelected = selectedOption === option || selectedOption === displayOption
                const iconName = getOptionIcon(displayOption)
                const description = getOptionDescription(displayOption)

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.optionIcon, isSelected && styles.optionIconSelected]}>
                      <Ionicons name={iconName as any} size={20} color={isSelected ? "#ffffff" : colors.primary} />
                    </View>

                    <View style={styles.optionContent}>
                    <Text style={[styles.optionText, ...(isSelected ? [styles.optionTextSelected] : [])]}>{displayOption}</Text>
                      <Text style={styles.optionDescription}>{description}</Text>
                    </View>

                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={24} color={colors.primary} style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                )
              })
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="list-outline" size={64} color={colors.secondaryText} />
                <Text style={styles.emptyText}>No hay opciones disponibles</Text>
              </View>
            )}
          </View>
        </Animated.View>
      </Modal>
    </Portal>
  )
}

export default SelectorModal
